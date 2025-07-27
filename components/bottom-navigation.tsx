"use client"

import {  Search, Heart, ListCheck, BusFront } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function BottomNavigation() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/",
      icon: BusFront,
      label: "Início",
      active: pathname === "/",
    },
    {
      href: "/lines",
      icon: Search,
      label: "Buscar",
      active: pathname === "/lines",
    },
     {
      href: "/info",
      icon: ListCheck,
      label: "Listas",
      active: pathname === "/info",
    },
    {
      href: "/favorites",
      icon: Heart,
      label: "Favoritos",
      active: pathname === "/favorites",
    },
   
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors min-w-[60px]",
                item.active ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-blue-600 hover:bg-blue-50",
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
