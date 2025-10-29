"use client"

import { IconCirclePlusFilled, IconInnerShadowTop, IconMail, type Icon } from "@tabler/icons-react"
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../../shadcn-ui/sidebar"
import { Button } from "../../shadcn-ui/button"
import Link from "next/link"




export function NavMain({
  items,
}: {
  items: {
    title: string
    link: string
    icon?:  React.ComponentType<{ className?: string }>
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            > 
            <IconInnerShadowTop className="size-5!" />
              <span>Dashboard</span>
             
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          {/* asChild penting biar Link jadi elemen utama */}
          <SidebarMenuButton asChild>
            <Link href={item.link}>
            {item.icon && <item.icon className="mr-2 h-4 w-4" />}
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
