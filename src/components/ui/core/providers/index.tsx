'use client';

import { Toaster } from '@/components/ui/fragments/shadcn-ui/sonner';
import { ProgressProvider } from '@bprogress/next/app';
import { AnimatePresence } from 'framer-motion';
import SiteFooter from '../layout/SiteFooter';
import ReactLenis from 'lenis/react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

import { ModalProvider } from './ContextProvider';
import SiteHeader from '../layout/SiteHeader';
import SmoothFollower from '../../fragments/custom-ui/cursor';

import Preload from '../../fragments/custom-ui/animate-ui/Preload';
import { useEffect, useState } from 'react';

import { useIsMobile } from '@/hooks/use-mobile';

/**
 * ========================================
 * KONSTANTA KONFIGURASI
 * ========================================
 */

// Key untuk menyimpan status preload di sessionStorage
// sessionStorage = per-tab, data hilang saat tab ditutup
const PRELOAD_SESSION_KEY = 'website_preload_shown';

// Daftar route yang tidak menampilkan header/footer normal
const EXCLUDED_ROUTES_FOOTER = [
  "/",
  "jelajahi-inovasi",
  "/jelajahi-inovasi/[slug]"
];
const EXCLUDED_ROUTES = [
  "/",

];

/**
 * ========================================
 * PROVIDERS COMPONENT
 * ========================================
 * 
 * Component ini mengatur:
 * 1. Preload animation (hanya sekali per tab session)
 * 2. Layout management (Header, Footer)
 * 3. Global providers (Lenis, Progress, Modal, Toast)
 * 
 * Flow Logic Preload:
 * 1. Cek sessionStorage saat component mount
 * 2. Jika belum ada flag -> Tampilkan preload
 * 3. Jika sudah ada flag -> Skip preload, langsung tampilkan konten
 * 4. Setelah preload selesai -> Set flag & tampilkan konten
 */

const Providers = ({ children }: { children: React.ReactNode }) => {

  const pathname = usePathname();
  const isMobile = useIsMobile()
  // ========================================
  // STATE MANAGEMENT
  // ========================================
  
  /**
   * showPreload: Apakah preload animation sedang aktif
   * - true = Preload sedang ditampilkan
   * - false = Preload tidak ditampilkan
   */
  const [showPreload, setShowPreload] = useState(false);
  
  /**
   * contentReady: Apakah konten page sudah boleh di-render
   * - true = Konten boleh ditampilkan
   * - false = Konten ditahan (preload masih jalan)
   */
  const [contentReady, setContentReady] = useState(false);
  
  /**
   * isInitializing: Loading state saat pengecekan awal
   * - true = Masih mengecek sessionStorage
   * - false = Sudah selesai cek, siap render
   */
  const [isInitializing, setIsInitializing] = useState(true);

  // ========================================
  // EFFECT: CEK STATUS PRELOAD
  // ========================================
  
  useEffect(() => {
    /**
     * CRITICAL: Effect ini hanya jalan sekali saat mount
     * 
     * Logika:
     * 1. Cek apakah preload sudah pernah ditampilkan di tab ini
     * 2. Jika mobile -> Skip preload
     * 3. Jika desktop + belum pernah tampil -> Tampilkan preload
     * 4. Jika sudah pernah tampil -> Langsung tampilkan konten
     */
    
    // Cek sessionStorage (hanya available di browser/client-side)
    const hasShownPreload = sessionStorage.getItem(PRELOAD_SESSION_KEY);
    
    // Kondisi untuk menampilkan preload:
    // - Belum pernah ditampilkan di tab ini (hasShownPreload === null)
    // - Bukan mobile device
    const shouldShowPreload = !hasShownPreload ;
    
    if (shouldShowPreload) {
      // SCENARIO 1: Tab baru / belum pernah lihat preload
      console.log('🎬 Tampilkan preload animation');
      setShowPreload(true);      // Aktifkan preload
      setContentReady(false);     // Tahan konten
    } else {
      // SCENARIO 2: Sudah pernah lihat preload / mobile
      console.log('⚡ Skip preload, langsung tampilkan konten');
      setShowPreload(false);      // Skip preload
      setContentReady(true);      // Langsung tampilkan konten
    }
    
    // Selesai inisialisasi
    setIsInitializing(false);
  }, []); // Dependency: hanya re-run jika isMobile berubah

  // ========================================
  // HANDLER: PRELOAD SELESAI
  // ========================================
  
  /**
   * Dipanggil saat preload animation selesai
   * 
   * Actions:
   * 1. Set flag di sessionStorage (tandai sudah pernah tampil)
   * 2. Sembunyikan preload
   * 3. Tampilkan konten page
   */
  const handlePreloadComplete = () => {
    console.log('✅ Preload selesai, tampilkan konten');
    
    // Set flag di sessionStorage
    // Flag ini akan bertahan selama tab tidak ditutup
    // Bahkan setelah refresh, flag ini masih ada
    sessionStorage.setItem(PRELOAD_SESSION_KEY, 'true');
    
    // Update state
    setShowPreload(false);      // Sembunyikan preload
    setContentReady(true);      // Izinkan konten tampil
  };

  // ========================================
  // RENDER: LOADING STATE
  // ========================================
  
  /**
   * Tampilkan blank screen selama inisialisasi
   * Mencegah flash of content sebelum decision preload dibuat
   */
  if (isInitializing) {
    return (
      <div className="fixed inset-0 bg-background " />
    );
  }

  // ========================================
  // RENDER: MAIN CONTENT
  // ========================================
  
  return (
    <ReactLenis root>
      <ModalProvider>
        <ProgressProvider 
          height="2px"
          color="var(--primary)"
          options={{ 
            showSpinner: false,
            minimum: 0.3,
            easing: 'ease',
            speed: 200,
          }}
          shallowRouting
        >
          {(!isMobile && contentReady) && (

          <SmoothFollower/>
          )}
          {/* ==================== PRELOAD LAYER ==================== */}
          {/* 
            Preload ditampilkan sebagai layer terpisah
            Hanya muncul jika showPreload === true
          */}
          {showPreload && (
            <Preload 
              key="preload-animation"
              onComplete={handlePreloadComplete}
            />
          )}

          {/* ==================== MAIN CONTENT LAYER ==================== */}
          {/* 
            Konten hanya di-render jika contentReady === true
            Ini mencegah animasi page entrance overlap dengan preload
          */}
          {contentReady && (
            <main className=' relative'>
              {/* Header - tidak ditampilkan di route tertentu */}
              {EXCLUDED_ROUTES.includes(pathname) && (
                <AnimatePresence mode="wait">
                  <SiteHeader key="site-header" />
                </AnimatePresence>
              )}
              
              {/* Main Content Area */}
              <AnimatePresence mode="wait">
                <div
                  key={`main-content-${pathname}`}
                  className={cn(
                    "mx-auto z-10 content-center  items-center justify-center relative w-full min-h-dvh h-full",
                    EXCLUDED_ROUTES.includes(pathname) && "flex flex-col gap-30  pb-20 "
                  )}
                >
                  {children}
                  {/* {!EXCLUDED_ROUTES.includes(pathname) && ( 
                    <MarqueeAlongSvgPathDemo/>
                  )} */}
                </div>
              </AnimatePresence>

              {/* Footer - hanya ditampilkan di route tertentu */}
              {EXCLUDED_ROUTES_FOOTER.includes(pathname) && (
                <>
            
                 <AnimatePresence mode="wait">
                  
                   <SiteFooter key={"footer"} />
                 </AnimatePresence>
                </>
              )}
            </main>
          )}

          {/* ==================== GLOBAL COMPONENTS ==================== */}
          {/* Component ini selalu aktif terlepas dari preload */}
          <Toaster />
        </ProgressProvider>
      </ModalProvider>
    </ReactLenis>
  );
};

export default Providers;