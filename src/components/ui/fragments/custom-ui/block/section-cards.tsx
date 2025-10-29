"use client";

import { IconTrendingUp } from "@tabler/icons-react"
import { Badge } from "@/components/ui/fragments/shadcn-ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/fragments/shadcn-ui/card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Inovasi</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            128
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +8%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Bertambah minggu ini  <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Dari seluruh kategori desa
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Vote</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            5,342
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Partisipasi meningkat <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Dalam 30 hari terakhir
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Inovasi Terpopuler</CardDescription>
          <CardTitle className="text-1xl font-semibold tabular-nums @[250px]/card:text-2xl">
            Digitalisasi UMKM Desa
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +25%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Masih trending  <IconTrendingUp className="size-4" />1,560 Vote
          </div>
          <div className="text-muted-foreground">Paling banyak didukung warga</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Inovasi yang Sudah Terwujud</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          42
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +7%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Bertambah minggu ini <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Dari seluruh inovasi yang masuk sistem
</div>
        </CardFooter>
      </Card>
    </div>
  );
}
