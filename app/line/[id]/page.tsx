"use client"

import { useState, useEffect, use } from "react"
import { ArrowLeft, Clock, MapPin, ExternalLink, Heart, Bus, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { busLines, getDayTypeLabel, getNextBusInfo } from "@/lib/mock-data"
import BottomNavigation from "@/components/bottom-navigation"
import ShareButton from "@/components/share-button"

interface PageParams {
  id: string
}

export default function LineDetailsPage({ params }: { params: Promise<PageParams> }) {
  const { id } = use(params)
  const [isFavorite, setIsFavorite] = useState(false)
  const [direction, setDirection] = useState<"Ida" | "Volta">("Ida")
  const [nextBusInfo, setNextBusInfo] = useState<any>(null)

  const line = busLines.find((l) => l.id === id)

  useEffect(() => {
    if (line) {
      const updateNextBus = () => {
        setNextBusInfo(getNextBusInfo(line, direction))
      }

      updateNextBus()
      const interval = setInterval(updateNextBus, 60000)

      return () => clearInterval(interval)
    }
  }, [line, direction])

  if (!line) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-20">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Linha não encontrada</h1>
          <Link href="/">
            <Button>Voltar ao início</Button>
          </Link>
        </div>
        <BottomNavigation />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsFavorite(!isFavorite)}>
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
              </Button>
              <ShareButton
                title={`Linha ${line.id} - ${line.name}`}
                text={`Confira os horários da linha ${line.id} - ${line.name} no ZapBuss!`}
                className="rounded-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <Badge className="bg-blue-600 text-white text-lg px-3 py-1">{line.id}</Badge>
            <Badge variant="outline" className="text-green-700 border-green-300">Ativa</Badge>
          </div>

          <h1 className="text-xl font-bold text-gray-900 mb-2">{line.name}</h1>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{line.stops.length} paradas</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Operando</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Next Bus Info */}
        {nextBusInfo && (
          <Card className="mb-6 bg-gradient-to-r from-blue-500 to-green-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Bus className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">Próximo Ônibus</h3>
                  <p className="text-white/90 text-sm">
                    {nextBusInfo.direction} - Saindo do ponto final em{" "}
                    <span className="font-bold">{nextBusInfo.minutesUntil} minutos</span>
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-white/80 text-xs">Horário: {nextBusInfo.scheduledTime}</p>
                    <Badge className={`text-xs ${nextBusInfo.css} border-0`}>{nextBusInfo.route}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Schedules */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Horários - {getDayTypeLabel()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="weekday" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="weekday">Dia Útil</TabsTrigger>
                <TabsTrigger value="saturday">Sábado</TabsTrigger>
                <TabsTrigger value="sunday">Domingo</TabsTrigger>
              </TabsList>

              {["weekday", "saturday", "sunday"].map((dayType) => (
                <TabsContent key={dayType} value={dayType} className="mt-4">
                  <Tabs value={direction} onValueChange={(val) => setDirection(val as "Ida" | "Volta")}>
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="Ida">Ida</TabsTrigger>
                      <TabsTrigger value="Volta">Volta</TabsTrigger>
                    </TabsList>

                    <TabsContent value="Ida">
                      <div className="grid grid-cols-2 gap-2">
                        {line.schedules[dayType].Ida.map((schedule, index) => (
                          <div
                            key={index}
                            className={`text-center py-2 px-3 rounded-lg font-medium text-sm ${schedule.css || "bg-gray-100"}`}
                          >
                            <div className="font-semibold">{schedule.time}</div>
                            <div className="text-xs mt-1 opacity-80">{schedule.route}</div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="Volta">
                      <div className="grid grid-cols-2 gap-2">
                        {line.schedules[dayType].Volta.map((schedule, index) => (
                          <div
                            key={index}
                            className={`text-center py-2 px-3 rounded-lg font-medium text-sm ${schedule.css || "bg-gray-100"}`}
                          >
                            <div className="font-semibold">{schedule.time}</div>
                            <div className="text-xs mt-1 opacity-80">{schedule.route}</div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Fare Prices */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Valor da Passagem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Ida</h4>
                <p className="text-sm text-blue-700 mb-1">
                  <strong>De:</strong> {line.farePrice.ida.from}
                </p>
                <p className="text-sm text-blue-700 mb-2">
                  <strong>Para:</strong> {line.farePrice.ida.to}
                </p>
                <p className="text-lg font-bold text-blue-800">{line.farePrice.ida.price}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Volta</h4>
                <p className="text-sm text-green-700 mb-1">
                  <strong>De:</strong> {line.farePrice.volta.from}
                </p>
                <p className="text-sm text-green-700 mb-2">
                  <strong>Para:</strong> {line.farePrice.volta.to}
                </p>
                <p className="text-lg font-bold text-green-800">{line.farePrice.volta.price}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aviso */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Aviso:</strong> Esta informação é baseada no site da Expresso Unir e pode sofrer alterações.
            Consulte sempre o site oficial para informações atualizadas.
          </p>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
