"use client"

import * as React from "react"
import {
  IconDashboard,
  IconChartBar,
  IconFolder,
  IconSettings,
  IconHelp,
  IconSearch,
  IconInnerShadowTop,
} from "@tabler/icons-react"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../../shadcn-ui/sidebar"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import Link from "next/link";
import { Logo } from "../../svg/logo";

const data = {
  user: {
    name: "Nama Kamu",
    email: "namakamu@example.com",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    { title: "Inovasi", link: "/jelajahi-inovasi", icon: IconFolder },
    { title: "Leaderboard", link: "/leaderboard", icon: IconChartBar },
   
  ],
  navSecondary: [
    { title: "Pengaturan", url: "/settings", icon: IconSettings },
    { title: "Bantuan", url: "/help", icon: IconHelp },
    { title: "Cari", url: "/search", icon: IconSearch },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <Link href="/dashboard">
                <Logo className="size-5!" />
                <span className="text-base font-semibold">SatuSuara</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
       
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
