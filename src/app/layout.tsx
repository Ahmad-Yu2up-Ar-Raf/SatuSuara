import type { Metadata } from "next";

import "@/styles/globals.css";

import { fontVariables } from "@/lib/fonts";
import Providers from "@/components/ui/core/providers";
import { siteConfig } from "@/config";

export const metadata: Metadata = siteConfig;



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
       <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://cdn.userway.org/widget.js" data-account="t85cN7BOL2"/>
        </head>
      <body
        className={`${fontVariables} antialiased `}
      >
        <Providers>
        {children}

        </Providers>
      </body>
    </html>
  );
}
