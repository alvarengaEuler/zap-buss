"use client"

import { useState } from "react"
import { ArrowLeft, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { busLines, getNextSchedule } from "@/lib/mock-data"
import BottomNavigation from "@/components/bottom-navigation"

export default function AllLinesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredLines, setFilteredLines] = useState(busLines)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredLines(busLines)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Todas as Linhas</h1>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar linha..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 h-10 rounded-xl border-2 border-gray-200 focus:border-blue-500"
              />
            </div>
            <Button variant="outline" size="icon" className="rounded-xl bg-transparent">
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="mb-4">
          <p className="text-sm text-gray-600">{filteredLines.length} linha(s) encontrada(s)</p>
        </div>

        <div className="grid gap-3">
          {filteredLines.map((line) => (
            <BusLineCard key={line.id} line={line} />
          ))}
        </div>

        {filteredLines.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 mb-2">Nenhuma linha encontrada</p>
            <p className="text-sm text-gray-500">Tente buscar por número, nome ou destino</p>
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
      <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer border">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-600 text-white px-2 py-1 rounded-lg text-sm font-semibold">{line.id}</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-xs font-medium">Ativa</span>
            </div>
            <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2">{line.name}</h3>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <span>Próximo: {nextSchedule}</span>
              <span>{line.stops.length} paradas</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
