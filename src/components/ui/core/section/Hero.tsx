import { useIsMobile } from '@/hooks/use-mobile'
import React from 'react'
import { HeroDeviceLaptop, HeroMobile } from '../../fragments/custom-ui/block/hero'

function Hero() {
  const isMObile = useIsMobile()
  if(isMObile)
  return <HeroMobile/>
  return <HeroDeviceLaptop/>
}

export default Hero
