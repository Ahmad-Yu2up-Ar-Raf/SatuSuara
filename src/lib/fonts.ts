import {
    Geist,
    Geist_Mono,
    Instrument_Sans,
    Inter,
    Outfit,
    Mulish,
    Nunito,
    Source_Serif_4,
   Delius_Swash_Caps,
    Noto_Sans_Mono,
    Bangers,
    NTR,
    Caprasimo,
    Poppins,
    Merienda,
    Libre_Baskerville,
    Lora,
    IBM_Plex_Mono
  } from 'next/font/google';

  import { cn } from '@/lib/utils';
  
  const fontSans = Libre_Baskerville({
    subsets: ['latin'],
    variable: '--font-sans',
    weight: ['400', '700']
  });
  const fontSerif = Lora({
    subsets: ['latin'],
    variable: '--font-serif',
   
  });
  const fontOutfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit'
  });
  const fontDelius = Delius_Swash_Caps({
    subsets: ['latin'],
    variable: '--font-delius',
    weight: '400'
  });
  
  const fontBanger = Bangers({
    subsets: ['latin'],
    variable: '--font-banger',
    weight: ['400', ]
  });
  
  const fontMono = IBM_Plex_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    weight: '400'
  });
  
  const fontNunito = Nunito({
    subsets: ['latin'],
    variable: '--font-nunito'
  });
  
  const fontInstrument = Instrument_Sans({
    subsets: ['latin'],
    variable: '--font-instrument'
  });
  
  const fontNotoMono = Noto_Sans_Mono({
    subsets: ['latin'],
    variable: '--font-noto-mono'
  });
  
  const fontMullish = Mulish({
    subsets: ['latin'],
    variable: '--font-mullish'
  });
  
  const fontInter = Inter({
    subsets: ['latin'],
    variable: '--font-inter'
  });
  


  export const fontVariables = cn(
    fontSans.variable,
    fontBanger.variable,
    fontMono.variable,
    fontInstrument.variable,
    fontNotoMono.variable,
    fontMullish.variable,
    fontInter.variable,
    fontNunito.variable,
    fontDelius.variable,
    fontOutfit.variable,
  fontSerif.variable
  );