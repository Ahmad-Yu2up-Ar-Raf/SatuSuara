"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/fragments/shadcn-ui/sidebar";
import data from "./data.json";
import { AppSidebar } from "@/components/ui/fragments/custom-ui/block/app-sidebar";
import { SiteHeader } from "@/components/ui/fragments/custom-ui/block/site-header";
import { SectionCards } from "@/components/ui/fragments/custom-ui/block/section-cards";
 // update chart
import { DataTable } from "@/components/ui/fragments/custom-ui/block/data-table";
import { ChartBarInteractive } from "@/components/ui/fragments/custom-ui/block/chart-bar-interactive";

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
            {/* Dashboard Cards */}
            <SectionCards />

            {/* Chart Statistik Inovasi */}
            <div className="px-4 lg:px-6">
              <ChartBarInteractive />
            </div>

            {/* Data Table */}
            <div className="px-4 lg:px-6">
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
