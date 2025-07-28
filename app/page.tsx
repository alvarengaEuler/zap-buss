"use client"

import { useState } from "react"
import { Search, MapPin, Clock, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { busLines, getNextSchedule } from "@/lib/mock-data"
import BottomNavigation from "@/components/bottom-navigation"
import InstallPrompt from "@/components/install-prompt"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredLines, setFilteredLines] = useState(busLines.slice(0, 5))

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredLines(busLines.slice(0, 5))
      return
    }

    const filtered = busLines.filter(
      (line) =>
        line.name.toLowerCase().includes(query.toLowerCase()) ||
        line.id.includes(query) ||
        line.stops.some((stop) => stop.toLowerCase().includes(query.toLowerCase())),
    )
    setFilteredLines(filtered)
  }

  const popularLines = busLines.slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ZapBuss</h1>
                <p className="text-sm text-gray-600">Encontre sua linha</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/landing">
                <Button variant="ghost" size="sm" className="text-blue-600">
                  Sobre
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button variant="ghost" size="sm" className="text-gray-600">
                  Admin
                </Button>
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar linha, número ou destino..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 h-12 text-base rounded-xl border-2 border-gray-200 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <InstallPrompt />

      <div className="px-4 py-6 space-y-6">
        {/* Popular Lines */}
        {searchQuery === "" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Linhas Populares
              </h2>
              <Link href="/lines">
                <Button variant="ghost" size="sm" className="text-blue-600">
                  Ver todas
                </Button>
              </Link>
            </div>
            <div className="grid gap-3">
              {popularLines.map((line) => (
                <BusLineCard key={line.id} line={line} />
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchQuery !== "" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {filteredLines.length > 0
                ? `${filteredLines.length} resultado(s) encontrado(s)`
                : "Nenhum resultado encontrado"}
            </h2>
            {filteredLines.length > 0 ? (
              <div className="grid gap-3">
                {filteredLines.map((line) => (
                  <BusLineCard key={line.id} line={line} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-2">Nenhuma linha encontrada</p>
                <p className="text-sm text-gray-500">Tente buscar por número, nome ou destino</p>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        {searchQuery === "" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Acesso Rápido</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/lines">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="font-medium text-gray-900">Todas as Linhas</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/favorites">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Star className="w-6 h-6 text-yellow-600" />
                    </div>
                    <p className="font-medium text-gray-900">Favoritos</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
}

function BusLineCard({ line }: { line: any }) {
  const nextSchedule = getNextSchedule(line)

  return (
    <Link href={`/line/${line.id}`}>
      <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 font-semibold">
                  {line.id}
                </Badge>
                <Badge variant="outline" className="text-green-700 border-green-300">
                  Ativa
                </Badge>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm leading-tight">{line.name}</h3>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Próximo: {nextSchedule}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{line.stops.length} paradas</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
