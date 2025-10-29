"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,

  MobileNavMenu,
} from "@/components/ui/fragments/custom-ui/animate-ui/resizable-navbar";
import { useOnboardingStore } from "@/hooks/use-store-signup";


export default function NavbarDemo() {
  const navItems = [
    {
      name: "Fitur",
      link: "#features",
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
  const name = useOnboardingStore((state) => state.name);
  const email = useOnboardingStore((state) => state.email);
  const password = useOnboardingStore((state) => state.password);
  const password_confirmation = useOnboardingStore((state) => state.password_confirmation);

    const country = useOnboardingStore((state) => state.country); 
    const province = useOnboardingStore((state) => state.province); 
    const phone = useOnboardingStore((state) => state.phone);

   const postBody = {
  
      name,
      email,
      password,
      phone,
      country,
      province,
      password_confirmation,
    }

  
    
  return (
    <Navbar className=" z-40">
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-2">
          {postBody.name == null ? (
<>
<NavbarButton
  variant={"default"}
  className=" rounded-full"
  href="/masuk">
  Masuk
</NavbarButton>
<NavbarButton  variant={"secondary"}
  className=" rounded-full"
  href="/daftar">Daftar</NavbarButton>
</>
          ) : (
            <NavbarButton
  variant={"default"}
  className=" rounded-full"
  href="/dashboard">
  Dashboard
</NavbarButton>
          )}
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <NavItems items={navItems} />
        
        </MobileNavHeader>

          <MobileNavMenu name={postBody.name} items={navItems} />
        </MobileNav>
  
    </Navbar>
  );
}
