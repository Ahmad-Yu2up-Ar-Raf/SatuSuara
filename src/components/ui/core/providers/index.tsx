'use client';

import { Toaster } from '@/components/ui/fragments/shadcn-ui/sonner';
import { ProgressProvider } from '@bprogress/next/app';
import { AnimatePresence } from 'framer-motion';
import SiteFooter from '../layout/SiteFooter';

import ReactLenis from 'lenis/react'



import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';



import { ModalProvider } from './ContextProvider';
import SiteHeader from '../layout/SiteHeader';
import SmoothFollower from '../../fragments/custom-ui/cursor';
import SignInModal from '../auth/components/SignInModal';



const Providers = ({ children }: { children: React.ReactNode }) => {
 const isMobile = useIsMobile()
const disable = ["/",   '/products']
  const paths = usePathname()

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


                <AnimatePresence mode='wait'>


{/* <SignInModal/> */}
                {/* {  disable.includes(paths) && (

                       <SiteHeader 
                   />
                )} */}
                    <div 
                        key="main-content" 
                        className={cn("relative  min-h-dvh w-full overflow-x-hidden  content-center" ,

                            disable.includes(paths) && '  py-5 '
                        )}
                    >
                        <div className={cn("mx-auto flex flex-col gap-13   lg:gap-20   h-full w-full", 



                        ) }>
                            {children}
                        </div>
                    </div>
                    
                          
                </AnimatePresence>
    
                            {  disable.includes(paths) && (

                          <SiteFooter/>
                )}
   
        
                <Toaster/>
            </ProgressProvider>
            </ModalProvider>
        </ReactLenis>
  
    );
};

export default Providers;