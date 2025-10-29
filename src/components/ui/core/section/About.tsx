import * as React from 'react';
import {
  FloatingIconsHero,
  type FloatingIconsHeroProps,
} from '@/components/ui/fragments/custom-ui/animate-ui/floating-icon'; // Adjust path as needed
import  {  Dana, Gojek ,  HaloDoc,  KitaBisa,  Ovo,  RuangGuru,  TokoPedia,  Traveloka } from '../../fragments/svg/icon-brand-logo';
import HeroScrollVideo from '../../fragments/custom-ui/animate-ui/scroll-animated-video';
import { useIsMobile } from '@/hooks/use-mobile';

// --- Original Stylized Company Logo SVG Components ---






// --- New Unique SVG Icons ---
const IconVercel = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor" className="text-foreground/90" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 22h20L12 2z"/>
    </svg>
);

const IconStripe = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="#635BFF"/><path d="M6 7H18V9H6V7Z" fill="white"/><path d="M6 11H18V13H6V11Z" fill="white"/><path d="M6 15H14V17H6V15Z" fill="white"/>
    </svg>
);

const IconDiscord = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.317 4.482a1.88 1.88 0 0 0-1.635-.482C17.398 3.42 16.02 3 12 3s-5.398.42-6.682 1.001a1.88 1.88 0 0 0-1.635.483c-1.875 1.2-2.325 3.61-1.568 5.711 1.62 4.47 5.063 7.8 9.885 7.8s8.265-3.33 9.885-7.8c.757-2.1-.307-4.51-1.568-5.711ZM8.45 13.4c-.825 0-1.5-.75-1.5-1.65s.675-1.65 1.5-1.65c.825 0 1.5.75 1.5 1.65s-.675 1.65-1.5 1.65Zm7.1 0c-.825 0-1.5-.75-1.5-1.65s.675-1.65 1.5-1.65c.825 0 1.5.75 1.5 1.65s-.675 1.65-1.5 1.65Z" fill="#5865F2"/>
    </svg>
);

const IconX = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor" className="text-foreground/90" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25zM17.03 19.75h1.866L7.156 4.25H5.16l11.874 15.5z"/>
    </svg>
);



// Define the icons with their unique positions for the demo.
const demoIcons: FloatingIconsHeroProps['icons'] = [
  // Total 16 unique icons
  { id: 1, icon: Gojek, className: 'top-[10%] left-[10%]' },
  { id: 2, icon: KitaBisa, className: 'top-[15%] right-[8%]' },
  { id: 3, icon: Traveloka, className: 'top-[80%] left-[10%]' },
  { id: 4, icon: Ovo, className: 'bottom-[10%] right-[10%]' },
  { id: 5, icon: HaloDoc, className: 'top-[5%] left-[30%]' },
//   { id: 6, icon: IconSlack, className: 'top-[5%] right-[30%]' },
  { id: 7, icon: TokoPedia, className: 'bottom-[8%] left-[25%]' },
  { id: 8, icon: RuangGuru, className: 'top-[7%] right-[20%]' },
//   { id: 9, icon: IconDiscord, className: 'top-[75%] right-[25%]' },
  { id: 10, icon: Dana, className: 'top-[90%] left-[70%]' },
  // { id: 11, icon: IconNotion, className: 'top-[50%] right-[5%]' },
  // { id: 12, icon: IconSpotify, className: 'top-[55%] left-[5%]' },
  // { id: 13, icon: IconDropbox, className: 'top-[5%] left-[55%]' },
  // { id: 14, icon: IconTwitch, className: 'bottom-[5%] right-[45%]' },
  // { id: 15, icon: IconLinear, className: 'top-[25%] right-[20%]' },
  // { id: 16, icon: IconYouTube, className: 'top-[60%] left-[30%]' },
];

export default function About() {
  const isMobile = useIsMobile()

  if(!isMobile)
  return (
    <>
      <section className=' min-h-[40lvh] md:min-h-lvh content-center w-full'>

        <FloatingIconsHero
          title="A World of Innovation"
          subtitle="Dunia Inovasi
    Jelajahi beragam kemungkinan dengan platform kami, yang menghubungkan Anda dengan perangkat dan teknologi yang membentuk masa depan."
          ctaText="Join the Revolution"
          ctaHref="#"
          icons={demoIcons}
        />
      </section>
       <HeroScrollVideo
        title="Scroll Animated Video"
        subtitle="Subtitle"
        meta="Q3 • 2025"
        media="https://www.pexels.com/id-id/download/video/6153453/"
      
        // Force dark theme with custom palette
       
      />
    </>
  );
}



