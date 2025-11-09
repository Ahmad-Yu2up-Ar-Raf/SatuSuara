"use client";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/fragments/shadcn-ui/drawer";
import { MenuIcon, XIcon } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Link from "next/link";

import React, { useRef, useState } from "react";
import { Logo } from "../../svg/logo";
import { Button, buttonVariants } from "../../shadcn-ui/button";
import MediaItem from "../media/MediaItem";
import { VariantProps } from "class-variance-authority";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";


interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  items: {
    name: string;
    link: string;
  }[];
  name?: string
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const paths = usePathname()
  const [visible, setVisible] = useState<boolean>(false);
   const { scrollYProgress } = useScroll();
  const [visiblee, setVisiblee] = useState(true);
  const [delay, setDelay] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;
    setDelay(false);

    if (scrollYProgress.get() < 0.05 && paths === '/portofolio') {
      setVisiblee(false);
    } else {
      if (direction < 0) {
        setVisiblee(true);
      } else {
        setVisiblee(false);
      }
    }
      
    }
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });
  const pathName = usePathname()


  const isMobile = useIsMobile()
  if (!isMobile)
  return (
    <motion.nav
      ref={ref}
       initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visiblee ? 0 : -100,
          opacity: visiblee ? 1 : 0,
        }}
        transition={{
          duration: delay ?  0.6 : 0.2,
          delay: delay ? 4 : 0,
        }}
      className={cn("  fixed inset-x-0 top-[20] md:top-[30] z-40 w-full",
         className ,)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.nav>
  );

  return(
     <motion.nav
      ref={ref}
       initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y:  0 ,
          opacity: 1 ,
        }}
        transition={{
          duration:  0.6 ,
          delay: 4 
        }}
      className={cn("  fixed inset-x-0 top-[20]  z-40 w-full",
className ,)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.nav>
  )
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: "blur(10px)" ,
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative z-[60]    bg-header border mx-auto hidden w-full max-w-2xl flex-row items-center justify-between self-start rounded-full  px-4 py-2 lg:flex ",
      
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const paths = usePathname()
  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center text-xs font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => {
          const isActive = item.link == paths
      return(
        <Link
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className={cn("relative px-4 py-2 cursor-target text-neutral-600 dark:text-neutral-300",
            isActive && ""
          )}
          key={`link-${idx}`}
          href={item.link}
        >
          {(hovered === idx  || isActive)&& (
            <motion.div
              layoutId="hovered"
              className="absolute border inset-0 h-full w-full rounded-full bg-background"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </Link>
      )})}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: "blur(10px)" ,
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
      
    
      
    
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-[60]  flex   bg-header border mx-auto lg:hidden w-full  flex-row items-center justify-between self-start rounded-full max-w-[calc(100vw-2rem)]  px-4 py-2 ",

        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
items,
name
}: MobileNavMenuProps) => {
  return (
          <Drawer>
              <div className="flex gap-3 items-center">
                {/* <Suspense>
                  <ModeToggle />
                </Suspense> */}
                <DrawerTrigger asChild>
              <Button variant={"outline"}>
                <MenuIcon/>
              </Button>
                </DrawerTrigger>
              </div>
              <DrawerContent
               
                className="pb-5  px-4"
              >
                   <DrawerHeader className="   sm:px-7 space-y-1 bg-background     p-4 border-b   pb-3 justify-center items-center mb-6 ">
           <DrawerTitle>
                  Menu
                  </DrawerTitle>

        
              <DrawerDescription className=" sr-only hidden text-sm">
                             Fill in the details below to create a new task
                       </DrawerDescription>
          
        </DrawerHeader>
                <div className="flex flex-col overflow-y-auto">
                  {items.map((menu, idx) =>
                      <Link
                        key={idx}
                        href={menu.link}
                        className="py-3 px-1 font-medium text-base border-b border-border/40 flex items-center"
                      >
                        {menu.name}
                      </Link>
                   
                  )}
                </div>
                <DrawerFooter className="border-t  px-0 pt-3 mt-6">
              

             <div className="mt-2 flex flex-col gap-2">
                    
            {name == null ? (
<>

                <Link
                      href="/masuk"
                      className={buttonVariants({ variant: "default"})}
                    >
                    Masuk
                    </Link>
             
                    <Link
                      href="/daftar"
                      className={buttonVariants({ variant: "outline"})}
                    >
                      Daftar
                    </Link>
</>
            ) : (
              <Link
              href="/dashboard"
              className={buttonVariants({ variant: "default"})}
            >
              Dashboard
            </Link>
            )}
                  </div>
     
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <XIcon className="text-black dark:text-white" onClick={onClick} />
  ) : (
    <MenuIcon className="text-black dark:text-white" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="relative  z-20 mr-4 flex items-center space-x-3 px-2 py-1 md:text-sm text-xs font-normal text-black"
    >
  
              <Logo className=" size-6  md:size-7"  />

      <span className="font-semibold    text-accent-foreground">SatuSuara</span>
    </Link>
  );
};

export const NavbarButton = ({
  href,
 children,
  className,
  variant = "default",
  ...props
}: {
  href?: string;
  
  children: React.ReactNode;
  className?: string;
}&  VariantProps<typeof buttonVariants> ) => {
 

  return (
    <Link
      href={href || "/"}
      className={cn(buttonVariants({variant: variant}) , "cursor-target  cursor-target text-xs z-50", className)}
      // {...props}
    >
      {children}
    </Link>
  );
};
