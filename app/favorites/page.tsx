"use client"

import { ArrowLeft, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import BottomNavigation from "@/components/bottom-navigation"

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Favoritos</h1>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Nenhum favorito ainda</h2>
          <p className="text-gray-600 mb-6">Adicione suas linhas favoritas para acesso rápido</p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-blue-500 to-green-500 text-white">Explorar Linhas</Button>
          </Link>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
