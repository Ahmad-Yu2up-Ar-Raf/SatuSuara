import React , { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'motion/react';
import {
  ChevronRight,
	FacebookIcon,
	FrameIcon,
	InstagramIcon,
	LinkedinIcon,
	YoutubeIcon,
} from 'lucide-react';
import { Button } from '../../fragments/shadcn-ui/button';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}
interface FooterLinkGroup {
	label: string;
	links: FooterLink[];
}


import * as Color from "color-bits";

import Link from "next/link";
import { Logo } from '../../fragments/svg/logo';


type StickyFooterProps = React.ComponentProps<'footer'>;
import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';


const footerColumns = [
  {
    title: 'Solutions',
    links: [
      'Business Automation',
      'Cloud Services',
      'Analytics',
      'Integrations',
      'Support',
    ],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'Case Studies', 'Blog', 'Webinars', 'Community'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Contact', 'Partners', 'Press'],
  },
];

const legalLinks = [
  'Terms of Service',
  'Privacy Policy',
  'Cookie Settings',
  'Accessibility',
];

const socialIcons = [
  { icon: <Instagram className="h-5 w-5" />, href: '#' },
  { icon: <Twitter className="h-5 w-5" />, href: '#' },
  { icon: <Linkedin className="h-5 w-5" />, href: '#' },
  { icon: <Youtube className="h-5 w-5" />, href: '#' },
];

export default function SiteFooter({ className, ...props }: StickyFooterProps) {

	return (
		<footer
			className={cn('relative bg-muted py-20  min-h-lvh content-center z-50 w-full', className)}
			style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
			{...props}
		>
			<div className="fixed z-50 bottom-0 h-full w-full">
				<div className=" sticky z-50 overflow-hidden  flex  content-end justify-end gap-2 h-full flex-col container px-5 sm:px-6 lg:px-14">
   

						
					   <div className=" grid border-b pb-8 md:pb-20  grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1">
            <div className=" mb-6  md:mb-6 flex items-center space-x-2">
        <Logo/>
            </div>
            <p className="text-foreground/60 mb-3 md:mb-6">
              Empowering businesses with reliable, scalable, and innovative
              solutions.
            </p>
            <div className="flex sr-only space-x-4">
              {socialIcons.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="glass-effect hover:bg-primary/10 flex size-5 md:size-10 items-center justify-center rounded-xl transition"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 md:text-lg font-semibold">{col.title}</h4>
              <ul className=" space-y-2 md:space-y-3">
                {col.links.map((text) => (
                  <li key={text}>
                    <Link
                      href="#"
                      className="text-foreground/60 text-xs hover:text-foreground transition"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
						 <div className=" w-full flex   items-center justify-center   ">
          <h1 className="text-center text-[20dvw] lg:text-[14em] font-bold bg-clip-text text-transparent  tracking-tighter bg-gradient-to-b  to-background from-yellow-950/50 select-none">
            SatuSuara
          </h1>
        </div>
					</div>
				</div>

		</footer>
	);
}

