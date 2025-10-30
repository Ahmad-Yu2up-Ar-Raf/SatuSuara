import { useIsMobile } from "@/hooks/use-mobile";
import { StickyScroll, StickyScrollMobile } from "../../fragments/custom-ui/animate-ui/sticky-scroll-reveal";


export default function Features() {
  const isMobile = useIsMobile()
  if(isMobile)
  return <StickyScrollMobile />;
  return <StickyScroll />;
}
