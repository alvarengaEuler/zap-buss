import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ServiceWorkerRegistration from "@/components/service-worker-registration"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ZapBuss - Consulta de Linhas de Ônibus",
  description: "Encontre horários e linhas de ônibus da sua cidade de forma rápida e fácil",
  manifest: "/manifest.json",
  themeColor: "#3b82f6",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ZapBuss",
  },
      icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      url: "/zapbuss-192.png",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      sizes: "192x192",
      url: "/zapbuss-192.png",
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ZapBuss" />
        <link rel="apple-touch-icon" href="/zapbuss-192.png" />
      </head>
      <body className={inter.className}>
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}
