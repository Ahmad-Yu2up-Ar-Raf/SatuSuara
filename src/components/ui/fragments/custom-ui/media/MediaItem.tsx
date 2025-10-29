'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils';
import { Spinner } from '../../shadcn-ui/spinner';
import Image from 'next/image';

type MediaItemProps = {
  webViewLink: string;
  mediaType?: 'image' | 'video';
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  fallbackUrl?: string;
  loaderTimeoutMs?: number;
};

const DEFAULT_FALLBACK =
  'https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1064';

const MediaItem = ({
  webViewLink,
  className,
  mediaType = 'image',
  onClick,
  style,
  fallbackUrl = DEFAULT_FALLBACK,
  loaderTimeoutMs = 7000, // default 7 detik
}: MediaItemProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  // Clear timeout helper
  const clearLoaderTimeout = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Setup loader timeout for both image & video
  useEffect(() => {
    // reset state when source changes
    setImageLoaded(false);
    setFailed(false);
    setIsBuffering(true);

    // start timeout
    clearLoaderTimeout();
    timeoutRef.current = window.setTimeout(() => {
      // Jika masih belum loaded, anggap gagal -> fallback
      setFailed(true);
      setIsBuffering(false);
    }, loaderTimeoutMs);

    return () => {
      clearLoaderTimeout();
    };
  }, [webViewLink, loaderTimeoutMs]);

  // Intersection Observer untuk video (agar tidak autoplay di luar view)
  useEffect(() => {
    if (mediaType !== 'video') return;

    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsInView(entry.isIntersecting);
      });
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
      observer.disconnect();
    };
  }, [mediaType]);

  // Handle video play/pause + errors
  useEffect(() => {
    if (mediaType !== 'video') return;

    let mounted = true;

    const handleVideoPlay = async () => {
      if (!videoRef.current || !isInView || !mounted) return;

      try {
        if (videoRef.current.readyState >= 3) {
          setIsBuffering(false);
          clearLoaderTimeout();
          await videoRef.current.play();
        } else {
          setIsBuffering(true);
          await new Promise<void>((resolve) => {
            if (!videoRef.current) return resolve();
            const onCanPlay = () => {
              if (videoRef.current) videoRef.current.oncanplay = null;
              resolve();
            };
            videoRef.current.oncanplay = onCanPlay;
          });
          if (mounted && videoRef.current) {
            setIsBuffering(false);
            clearLoaderTimeout();
            await videoRef.current.play();
          }
        }
      } catch (error) {
        console.warn('Video playback failed:', error);
        setFailed(true);
        setIsBuffering(false);
        clearLoaderTimeout();
      }
    };

    if (isInView) {
      handleVideoPlay();
    } else if (videoRef.current) {
      videoRef.current.pause();
    }

    const onVideoError = () => {
      setFailed(true);
      setIsBuffering(false);
      clearLoaderTimeout();
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('error', onVideoError);
    }

    return () => {
      mounted = false;
      if (videoRef.current) {
        videoRef.current.removeEventListener('error', onVideoError);
        videoRef.current.pause();
        try {
          videoRef.current.removeAttribute('src');
          videoRef.current.load();
        } catch (e) {
          // ignore
        }
      }
    };
  }, [isInView, mediaType]);

  const handleImageLoad = (_e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoaded(true);
    setIsBuffering(false);
    clearLoaderTimeout();
  };

  const handleImageError = (e?: any) => {
    console.warn('Image failed to load:', e?.nativeEvent ?? e);
    setFailed(true);
    setIsBuffering(false);
    clearLoaderTimeout();
  };

  // Jika gagal (image/video), tampilkan fallback image
  if (mediaType === 'video') {
    if (failed) {
      return (
        <div className={`${className} relative overflow-hidden`} style={style}>
          <Image
            src={fallbackUrl}
            alt="Gambar fallback"
            fill
             quality={100}
            className="object-cover"
            loading="lazy"
            onClick={onClick}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      );
    }

    return (
      <div className={`${className} w-full relative overflow-hidden`} style={style}>
        <video
          ref={videoRef}
          className={cn('h-full relative object-cover object-top inset-0 w-full')}
          onClick={onClick}
          playsInline
          muted
          loop
          preload="auto"
          style={{
            opacity: isBuffering ? 0.85 : 1,
            transition: 'opacity 0.2s',
            transform: 'translateZ(0)',
            willChange: 'transform',
          }}
        >
          <source src={webViewLink} type="video/mp4" />
        </video>

        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-accent-foreground/10">
            <Spinner className="w-6 h-6 text-accent rounded-xl animate-spin" />
          </div>
        )}
      </div>
    );
  }

  // image rendering
  return (
    <div className={`${className} flex justify-center h-full relative`} style={style}>
      {!failed ? (
        <>
          <Image
            src={webViewLink}
            alt={`Preview media`}
            fill
                 quality={100}
            className="object-cover"
            onClick={onClick}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-accent-foreground/10">
              <Spinner className="w-6 h-6 text-accent rounded-xl animate-spin" />
            </div>
          )}
        </>
      ) : (
        // fallback
        <Image
          src={fallbackUrl}
          alt="Gambar fallback"
          fill
               quality={100}
          className="object-cover"
          onClick={onClick}
          loading="lazy"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      )}
    </div>
  );
};

export default MediaItem;
