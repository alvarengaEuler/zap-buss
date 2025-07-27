"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Clock, MapPin, ExternalLink, Heart, Bus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { busLines, getDayTypeLabel, getNextBusInfo } from "@/lib/mock-data"
import BottomNavigation from "@/components/bottom-navigation"
import ShareButton from "@/components/share-button"

export default function LineDetailsPage({ params }: { params: { id: string } }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [nextBusInfo, setNextBusInfo] = useState<any>(null)
  const line = busLines.find((l) => l.id === params.id)

  useEffect(() => {
    if (line) {
      const updateNextBus = () => {
        setNextBusInfo(getNextBusInfo(line))
      }

      updateNextBus()
      const interval = setInterval(updateNextBus, 60000) // Atualiza a cada minuto

      return () => clearInterval(interval)
    }
  }, [line])

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
                text={`Confira os horários da linha ${line.id} - ${line.name} no BusWaze`}
                className="rounded-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <Badge className="bg-blue-600 text-white text-lg px-3 py-1">{line.id}</Badge>
            <Badge variant="outline" className="text-green-700 border-green-300">
              Ativa
            </Badge>
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
                  <p className="text-white/80 text-xs mt-1">Horário programado: {nextBusInfo.scheduledTime}</p>
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

              <TabsContent value="weekday" className="mt-4">
                <Tabs defaultValue="Ida" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="Ida">Ida</TabsTrigger>
                    <TabsTrigger value="Volta">Volta</TabsTrigger>
                  </TabsList>
                  <TabsContent value="Ida">
                    <div className="grid grid-cols-3 gap-2">
                      {line.schedules.weekday.Ida.map((time, index) => (
                        <div
                          key={index}
                          className="bg-blue-50 text-blue-800 text-center py-2 px-3 rounded-lg font-medium text-sm"
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="Volta">
                    <div className="grid grid-cols-3 gap-2">
                      {line.schedules.weekday.Volta.map((time, index) => (
                        <div
                          key={index}
                          className="bg-green-50 text-green-800 text-center py-2 px-3 rounded-lg font-medium text-sm"
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>

              <TabsContent value="saturday" className="mt-4">
                <Tabs defaultValue="Ida" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="Ida">Ida</TabsTrigger>
                    <TabsTrigger value="Volta">Volta</TabsTrigger>
                  </TabsList>
                  <TabsContent value="Ida">
                    <div className="grid grid-cols-3 gap-2">
                      {line.schedules.saturday.Ida.map((time, index) => (
                        <div
                          key={index}
                          className="bg-blue-50 text-blue-800 text-center py-2 px-3 rounded-lg font-medium text-sm"
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="Volta">
                    <div className="grid grid-cols-3 gap-2">
                      {line.schedules.saturday.Volta.map((time, index) => (
                        <div
                          key={index}
                          className="bg-green-50 text-green-800 text-center py-2 px-3 rounded-lg font-medium text-sm"
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>

              <TabsContent value="sunday" className="mt-4">
                <Tabs defaultValue="Ida" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="Ida">Ida</TabsTrigger>
                    <TabsTrigger value="Volta">Volta</TabsTrigger>
                  </TabsList>
                  <TabsContent value="Ida">
                    <div className="grid grid-cols-3 gap-2">
                      {line.schedules.sunday.Ida.map((time, index) => (
                        <div
                          key={index}
                          className="bg-blue-50 text-blue-800 text-center py-2 px-3 rounded-lg font-medium text-sm"
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="Volta">
                    <div className="grid grid-cols-3 gap-2">
                      {line.schedules.sunday.Volta.map((time, index) => (
                        <div
                          key={index}
                          className="bg-green-50 text-green-800 text-center py-2 px-3 rounded-lg font-medium text-sm"
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Stops */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-600" />
              Paradas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {line.stops.map((stop, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{stop}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* External Link */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 mb-1">Site Oficial</p>
                <p className="text-sm text-gray-600">Mais informações na Expresso Unir</p>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <ExternalLink className="w-4 h-4" />
                Acessar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
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
