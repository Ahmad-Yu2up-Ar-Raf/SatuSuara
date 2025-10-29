"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../shadcn-ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../shadcn-ui/card";

export const description = "Chart jumlah vote per inovasi (versi batang)";

const chartData = [
  { inovasi: "Desa Hijau Cerdas", vote: 950 },
  { inovasi: "Sistem Irigasi Otomatis", vote: 1230 },
  { inovasi: "Bank Sampah Digital", vote: 870 },
  { inovasi: "Desa Wisata Kreatif", vote: 1440 },
  { inovasi: "Energi Surya Mandiri", vote: 720 },
  { inovasi: "Aplikasi UMKM Desa", vote: 1560 },
  { inovasi: "Pemetaan Lahan Digital", vote: 680 },
  { inovasi: "Budidaya Lele Inovatif", vote: 1310 },
  { inovasi: "Desa Pintar Edukasi", vote: 910 },
  { inovasi: "Lumbung Pangan Modern", vote: 1200 },
];

const chartConfig = {
  vote: {
    label: "Jumlah Vote",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function ChartBarInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("all");

  React.useEffect(() => {
    if (isMobile) setTimeRange("all");
  }, [isMobile]);

  return (
    <Card className="@container/card overflow-hidden relative">
      <CardHeader>
        <CardTitle>Statistik Inovasi Desa</CardTitle>
        <CardDescription>
          10 Inovasi Teratas Berdasarkan Jumlah Vote
        </CardDescription>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {/* Tambahin wrapper biar bisa discroll di HP */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[700px] sm:min-w-full">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[300px] w-full"
            >
              <BarChart data={chartData} barSize={40}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-vote)"
                      stopOpacity={0.9}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-vote)"
                      stopOpacity={0.2}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  opacity={0.3}
                />
                <XAxis dataKey="inovasi" tickLine={false} axisLine={false} tickMargin={10} interval={0} height={70} tick={(props) => { const { x, y, payload } = props; const words = payload.value.split(" "); return ( <text x={x} y={y + 10} textAnchor="middle" fontSize={12}> {words.map((w: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, i: React.Key | null | undefined) => ( <tspan key={i} x={x} dy={i === 0 ? 0 : 14}> {w} </tspan> ))} </text> ); }} />

                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip
                  cursor={{ fill: "rgba(0,0,0,0.05)" }}
                  content={
                    <ChartTooltipContent labelFormatter={(value) => value} />
                  }
                />

                <Bar
                  dataKey="vote"
                  fill="url(#barGradient)"
                  radius={[6, 6, 0, 0]}
                  animationDuration={1000}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
