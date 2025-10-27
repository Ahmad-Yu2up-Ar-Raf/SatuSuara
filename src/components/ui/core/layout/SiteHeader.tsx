"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/fragments/custom-ui/animate-ui/resizable-navbar";
import Link from "next/link";
import { useState } from "react";

export default function NavbarDemo() {
  const navItems = [
    {
      name: "Tentang Kami",
      link: "/tentang-kami",
    },

    {
      name: "Inovasi",
      link: "/jelajahi-inovasi",
    },
    {
      name: "Peringkat",
      link: "/leaderboard",
    },
  ];

  return (
    <Navbar className=" z-40">
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          <NavbarButton
            variant={"default"}
            className=" rounded-full"
            href="/login">
            Login
          </NavbarButton>
          {/* <NavbarButton variant="primary">Book a call</NavbarButton> */}
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />

          <MobileNavMenu items={navItems} />
        </MobileNavHeader>
      </MobileNav>
    </Navbar>
  );
}
