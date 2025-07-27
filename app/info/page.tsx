"use client"

import { useState } from "react"
import { ArrowLeft, Clock, MessageCircle, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import BottomNavigation from "@/components/bottom-navigation"
import { usefulInfoData, categories, getCategoryName, getCategoryIcon, type UsefulInfo } from "@/lib/useful-info-data"

export default function UsefulInfoPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Separar estabelecimentos patrocinados e normais
  const allFilteredInfo = usefulInfoData.filter(
    (info) => selectedCategory === "all" || info.category === selectedCategory,
  )
  const sponsoredInfo = allFilteredInfo.filter((info) => info.sponsored)
  const regularInfo = allFilteredInfo.filter((info) => !info.sponsored)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pb-20">
      {/* Header - manter igual */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Informações Úteis</h1>
              <p className="text-sm text-gray-600">Estabelecimentos da região</p>
            </div>
          </div>

          {/* Category Tabs - manter igual */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 whitespace-nowrap ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            {allFilteredInfo.length} estabelecimento(s) encontrado(s)
            {selectedCategory !== "all" && ` em ${getCategoryName(selectedCategory)}`}
          </p>
        </div>

        <div className="space-y-6">
          {/* Estabelecimentos Patrocinados */}
          {sponsoredInfo.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">★</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Patrocinados</h2>
              </div>
              <div className="grid gap-4">
                {sponsoredInfo.map((info) => (
                  <SponsoredInfoCard key={info.id} info={info} />
                ))}
              </div>
            </div>
          )}

          {/* Estabelecimentos Regulares */}
          {regularInfo.length > 0 && (
            <div>
              {sponsoredInfo.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">•</span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Outros Estabelecimentos</h2>
                </div>
              )}
              <div className="grid gap-4">
                {regularInfo.map((info) => (
                  <UsefulInfoCard key={info.id} info={info} />
                ))}
              </div>
            </div>
          )}
        </div>

        {allFilteredInfo.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📌</span>
            </div>
            <p className="text-gray-600 mb-2">Nenhum estabelecimento encontrado</p>
            <p className="text-sm text-gray-500">Tente selecionar outra categoria</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
}

// Novo componente para estabelecimentos patrocinados
function SponsoredInfoCard({ info }: { info: UsefulInfo }) {
  const handleWhatsAppClick = () => {
    window.open(info.whatsapp, "_blank")
  }

  const handleInstagramClick = () => {
    window.open(info.instagram, "_blank")
  }

  return (
    <Card className="hover:shadow-xl transition-all duration-200 hover:scale-[1.02] border-2 border-gradient-to-r from-yellow-400 to-orange-500 relative overflow-hidden">
      {/* Badge Patrocinado */}
      <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
        ★ PATROCINADO
      </div>

      {/* Brilho sutil de fundo */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-50/50 to-orange-50/50 pointer-events-none" />

      <CardContent className="p-4 relative">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-gray-900 text-lg">{info.name}</h3>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {getCategoryIcon(info.category)} {getCategoryName(info.category)}
              </Badge>
            </div>

            {/* Products */}
            <div className="mb-3">
              <ul className="space-y-1">
                {info.products.map((product, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></span>
                    {product}
                  </li>
                ))}
              </ul>
            </div>

            {/* Hours */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Clock className="w-4 h-4" />
              <span>{info.hours}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleWhatsAppClick}
                className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleInstagramClick}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600 shadow-lg"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Manter o componente UsefulInfoCard original para estabelecimentos regulares
function UsefulInfoCard({ info }: { info: UsefulInfo }) {
  const handleWhatsAppClick = () => {
    window.open(info.whatsapp, "_blank")
  }

  const handleInstagramClick = () => {
    window.open(info.instagram, "_blank")
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-gray-900 text-lg">{info.name}</h3>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {getCategoryIcon(info.category)} {getCategoryName(info.category)}
              </Badge>
            </div>

            {/* Products */}
            <div className="mb-3">
              <ul className="space-y-1">
                {info.products.map((product, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    {product}
                  </li>
                ))}
              </ul>
            </div>

            {/* Hours */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Clock className="w-4 h-4" />
              <span>{info.hours}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleWhatsAppClick}
                className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleInstagramClick}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
