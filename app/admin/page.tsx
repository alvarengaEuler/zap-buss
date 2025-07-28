"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Users, Bus, Clock, TrendingUp, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { busLines } from "@/lib/mock-data"
import { usefulInfoData, categories, getCategoryName, getCategoryIcon, type UsefulInfo } from "@/lib/useful-info-data"

// Rotas disponíveis com suas cores
const availableRoutes = [
  { id: "via-centro", name: "Via Centro", css: "bg-blue-100 text-blue-800" },
  { id: "via-conjunto-laginha", name: "Via Conjunto Laginha", css: "bg-amber-100 text-amber-800" },
  { id: "via-shopping", name: "Via Shopping", css: "bg-green-100 text-green-800" },
  { id: "via-hospital", name: "Via Hospital", css: "bg-purple-100 text-purple-800" },
  { id: "via-rodoviaria", name: "Via Rodoviária", css: "bg-red-100 text-red-800" },
  { id: "via-universidade", name: "Via Universidade", css: "bg-indigo-100 text-indigo-800" },
  { id: "via-rodovia", name: "Via Rodovia", css: "bg-orange-100 text-orange-800" },
  { id: "via-industrial", name: "Via Industrial", css: "bg-gray-100 text-gray-800" },
  { id: "via-mercado", name: "Via Mercado", css: "bg-teal-100 text-teal-800" },
  { id: "via-escola", name: "Via Escola", css: "bg-pink-100 text-pink-800" },
  { id: "via-avenida", name: "Via Avenida", css: "bg-cyan-100 text-cyan-800" },
  { id: "via-clinica", name: "Via Clínica", css: "bg-emerald-100 text-emerald-800" },
  { id: "via-igreja", name: "Via Igreja", css: "bg-violet-100 text-violet-800" },
  { id: "via-prefeitura", name: "Via Prefeitura", css: "bg-slate-100 text-slate-800" },
]

export default function AdminDashboard() {
  const [lines, setLines] = useState(busLines)
  const [usefulInfo, setUsefulInfo] = useState(usefulInfoData)
  const [editingLine, setEditingLine] = useState<any>(null)
  const [editingInfo, setEditingInfo] = useState<UsefulInfo | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddInfoDialogOpen, setIsAddInfoDialogOpen] = useState(false)
  const [isEditInfoDialogOpen, setIsEditInfoDialogOpen] = useState(false)

  // Estatísticas
  const totalLines = lines.length
  const activeLines = lines.filter((line) => line.active).length
  const popularLines = lines.filter((line) => line.popular).length
  const totalStops = lines.reduce((acc, line) => acc + line.stops.length, 0)
  const totalUsefulInfo = usefulInfo.length
  const sponsoredInfo = usefulInfo.filter((info) => info.sponsored).length

  const handleAddLine = (formData: FormData) => {
    // Função para processar horários com rotas
    const parseSchedulesWithRoutes = (scheduleString: string, routeString: string) => {
      const times = scheduleString.split(",").map((s) => s.trim())
      const routes = routeString.split(",").map((s) => s.trim())

      return times.map((time, index) => {
        const routeName = routes[index] || routes[0] || "Via Centro"
        const route = availableRoutes.find((r) => r.name === routeName) || availableRoutes[0]
        return {
          time,
          route: route.name,
          css: route.css,
        }
      })
    }

    const newLine = {
      id: formData.get("id") as string,
      name: formData.get("name") as string,
      direction: ["Ida", "Volta"],
      schedules: {
        weekday: {
          Ida: parseSchedulesWithRoutes(
            formData.get("weekdayIda") as string,
            formData.get("weekdayIdaRoutes") as string,
          ),
          Volta: parseSchedulesWithRoutes(
            formData.get("weekdayVolta") as string,
            formData.get("weekdayVoltaRoutes") as string,
          ),
        },
        saturday: {
          Ida: parseSchedulesWithRoutes(
            formData.get("saturdayIda") as string,
            formData.get("saturdayIdaRoutes") as string,
          ),
          Volta: parseSchedulesWithRoutes(
            formData.get("saturdayVolta") as string,
            formData.get("saturdayVoltaRoutes") as string,
          ),
        },
        sunday: {
          Ida: parseSchedulesWithRoutes(formData.get("sundayIda") as string, formData.get("sundayIdaRoutes") as string),
          Volta: parseSchedulesWithRoutes(
            formData.get("sundayVolta") as string,
            formData.get("sundayVoltaRoutes") as string,
          ),
        },
      },
      stops: (formData.get("stops") as string).split(",").map((s) => s.trim()),
      active: true,
      popular: false,
      farePrice: {
        ida: {
          from: formData.get("fareIdaFrom") as string,
          to: formData.get("fareIdaTo") as string,
          price: formData.get("fareIdaPrice") as string,
        },
        volta: {
          from: formData.get("fareVoltaFrom") as string,
          to: formData.get("fareVoltaTo") as string,
          price: formData.get("fareVoltaPrice") as string,
        },
      },
    }

    setLines([...lines, newLine])
    setIsAddDialogOpen(false)
  }

  const handleEditLine = (formData: FormData) => {
    // Função para processar horários com rotas
    const parseSchedulesWithRoutes = (scheduleString: string, routeString: string) => {
      const times = scheduleString.split(",").map((s) => s.trim())
      const routes = routeString.split(",").map((s) => s.trim())

      return times.map((time, index) => {
        const routeName = routes[index] || routes[0] || "Via Centro"
        const route = availableRoutes.find((r) => r.name === routeName) || availableRoutes[0]
        return {
          time,
          route: route.name,
          css: route.css,
        }
      })
    }

    const updatedLine = {
      ...editingLine,
      name: formData.get("name") as string,
      schedules: {
        weekday: {
          Ida: parseSchedulesWithRoutes(
            formData.get("weekdayIda") as string,
            formData.get("weekdayIdaRoutes") as string,
          ),
          Volta: parseSchedulesWithRoutes(
            formData.get("weekdayVolta") as string,
            formData.get("weekdayVoltaRoutes") as string,
          ),
        },
        saturday: {
          Ida: parseSchedulesWithRoutes(
            formData.get("saturdayIda") as string,
            formData.get("saturdayIdaRoutes") as string,
          ),
          Volta: parseSchedulesWithRoutes(
            formData.get("saturdayVolta") as string,
            formData.get("saturdayVoltaRoutes") as string,
          ),
        },
        sunday: {
          Ida: parseSchedulesWithRoutes(formData.get("sundayIda") as string, formData.get("sundayIdaRoutes") as string),
          Volta: parseSchedulesWithRoutes(
            formData.get("sundayVolta") as string,
            formData.get("sundayVoltaRoutes") as string,
          ),
        },
      },
      stops: (formData.get("stops") as string).split(",").map((s) => s.trim()),
      farePrice: {
        ida: {
          from: formData.get("fareIdaFrom") as string,
          to: formData.get("fareIdaTo") as string,
          price: formData.get("fareIdaPrice") as string,
        },
        volta: {
          from: formData.get("fareVoltaFrom") as string,
          to: formData.get("fareVoltaTo") as string,
          price: formData.get("fareVoltaPrice") as string,
        },
      },
    }

    setLines(lines.map((line) => (line.id === editingLine.id ? updatedLine : line)))
    setIsEditDialogOpen(false)
    setEditingLine(null)
  }

  const handleDeleteLine = (lineId: string) => {
    setLines(lines.filter((line) => line.id !== lineId))
  }

  const toggleLineStatus = (lineId: string) => {
    setLines(lines.map((line) => (line.id === lineId ? { ...line, active: !line.active } : line)))
  }

  const togglePopular = (lineId: string) => {
    setLines(lines.map((line) => (line.id === lineId ? { ...line, popular: !line.popular } : line)))
  }

  // Useful Info Functions
  const handleAddUsefulInfo = (formData: FormData) => {
    const newInfo: UsefulInfo = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      whatsapp: formData.get("whatsapp") as string,
      instagram: formData.get("instagram") as string,
      hours: formData.get("hours") as string,
      products: [
        formData.get("product1") as string,
        formData.get("product2") as string,
        formData.get("product3") as string,
      ],
      sponsored: false, // Novo estabelecimento não é patrocinado por padrão
    }

    setUsefulInfo([...usefulInfo, newInfo])
    setIsAddInfoDialogOpen(false)
  }

  const handleEditUsefulInfo = (formData: FormData) => {
    if (!editingInfo) return

    const updatedInfo: UsefulInfo = {
      ...editingInfo,
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      whatsapp: formData.get("whatsapp") as string,
      instagram: formData.get("instagram") as string,
      hours: formData.get("hours") as string,
      products: [
        formData.get("product1") as string,
        formData.get("product2") as string,
        formData.get("product3") as string,
      ],
    }

    setUsefulInfo(usefulInfo.map((info) => (info.id === editingInfo.id ? updatedInfo : info)))
    setIsEditInfoDialogOpen(false)
    setEditingInfo(null)
  }

  const handleDeleteUsefulInfo = (infoId: string) => {
    setUsefulInfo(usefulInfo.filter((info) => info.id !== infoId))
  }

  const toggleSponsored = (infoId: string) => {
    setUsefulInfo(usefulInfo.map((info) => (info.id === infoId ? { ...info, sponsored: !info.sponsored } : info)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
              <p className="text-gray-600 mt-1">Gerencie linhas e informações do ZapBuss</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <a href="/">Ver App</a>
              </Button>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Bus className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{totalLines}</p>
                    <p className="text-sm text-gray-600">Total de Linhas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{activeLines}</p>
                    <p className="text-sm text-gray-600">Linhas Ativas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{popularLines}</p>
                    <p className="text-sm text-gray-600">Linhas Populares</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{totalStops}</p>
                    <p className="text-sm text-gray-600">Total de Paradas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Info className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{totalUsefulInfo}</p>
                    <p className="text-sm text-gray-600">Estabelecimentos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 font-bold">★</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{sponsoredInfo}</p>
                    <p className="text-sm text-gray-600">Patrocinados</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <Tabs defaultValue="lines" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="lines">Linhas</TabsTrigger>
            <TabsTrigger value="schedules">Horários</TabsTrigger>
            <TabsTrigger value="useful-info">Info Úteis</TabsTrigger>
          </TabsList>

          <TabsContent value="lines" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Linhas de Ônibus</CardTitle>
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Nova Linha
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Adicionar Nova Linha</DialogTitle>
                        <DialogDescription>Preencha os dados da nova linha de ônibus</DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          handleAddLine(new FormData(e.currentTarget))
                        }}
                      >
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="id">Número da Linha</Label>
                              <Input id="id" name="id" placeholder="Ex: 250" required />
                            </div>
                            <div>
                              <Label htmlFor="name">Nome da Linha</Label>
                              <Input id="name" name="name" placeholder="Ex: Centro - Zona Norte" required />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="stops">Paradas (separadas por vírgula)</Label>
                            <Textarea
                              id="stops"
                              name="stops"
                              placeholder="Terminal Central, Rua Principal, Shopping Center..."
                              required
                            />
                          </div>

                          {/* Valores de Passagem */}
                          <div className="space-y-4">
                            <h4 className="font-semibold text-green-600">Valores de Passagem</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
                                <h5 className="font-medium text-blue-800">Ida</h5>
                                <div>
                                  <Label htmlFor="fareIdaFrom">De</Label>
                                  <Input id="fareIdaFrom" name="fareIdaFrom" placeholder="Terminal Central" required />
                                </div>
                                <div>
                                  <Label htmlFor="fareIdaTo">Para</Label>
                                  <Input id="fareIdaTo" name="fareIdaTo" placeholder="Zona Norte" required />
                                </div>
                                <div>
                                  <Label htmlFor="fareIdaPrice">Preço</Label>
                                  <Input id="fareIdaPrice" name="fareIdaPrice" placeholder="R$ 4,50" required />
                                </div>
                              </div>
                              <div className="space-y-3 p-4 bg-green-50 rounded-lg">
                                <h5 className="font-medium text-green-800">Volta</h5>
                                <div>
                                  <Label htmlFor="fareVoltaFrom">De</Label>
                                  <Input id="fareVoltaFrom" name="fareVoltaFrom" placeholder="Zona Norte" required />
                                </div>
                                <div>
                                  <Label htmlFor="fareVoltaTo">Para</Label>
                                  <Input id="fareVoltaTo" name="fareVoltaTo" placeholder="Terminal Central" required />
                                </div>
                                <div>
                                  <Label htmlFor="fareVoltaPrice">Preço</Label>
                                  <Input id="fareVoltaPrice" name="fareVoltaPrice" placeholder="R$ 4,50" required />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Rotas Disponíveis */}
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold mb-3">Rotas Disponíveis</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              {availableRoutes.map((route) => (
                                <div key={route.id} className={`px-2 py-1 rounded text-center ${route.css}`}>
                                  {route.name}
                                </div>
                              ))}
                            </div>
                            <p className="text-xs text-gray-600 mt-2">Use estes nomes exatos nas rotas abaixo</p>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-semibold">Horários - Dia Útil</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="weekdayIda">Ida - Horários (separados por vírgula)</Label>
                                <Textarea
                                  id="weekdayIda"
                                  name="weekdayIda"
                                  placeholder="06:00, 07:00, 08:00..."
                                  required
                                />
                                <Label htmlFor="weekdayIdaRoutes">Ida - Rotas (separadas por vírgula)</Label>
                                <Textarea
                                  id="weekdayIdaRoutes"
                                  name="weekdayIdaRoutes"
                                  placeholder="Via Centro, Via Shopping, Via Centro..."
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="weekdayVolta">Volta - Horários (separados por vírgula)</Label>
                                <Textarea
                                  id="weekdayVolta"
                                  name="weekdayVolta"
                                  placeholder="06:30, 07:30, 08:30..."
                                  required
                                />
                                <Label htmlFor="weekdayVoltaRoutes">Volta - Rotas (separadas por vírgula)</Label>
                                <Textarea
                                  id="weekdayVoltaRoutes"
                                  name="weekdayVoltaRoutes"
                                  placeholder="Via Hospital, Via Centro, Via Hospital..."
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-semibold">Horários - Sábado</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="saturdayIda">Ida - Horários (separados por vírgula)</Label>
                                <Textarea
                                  id="saturdayIda"
                                  name="saturdayIda"
                                  placeholder="07:00, 09:00, 11:00..."
                                  required
                                />
                                <Label htmlFor="saturdayIdaRoutes">Ida - Rotas (separadas por vírgula)</Label>
                                <Textarea
                                  id="saturdayIdaRoutes"
                                  name="saturdayIdaRoutes"
                                  placeholder="Via Centro, Via Shopping, Via Centro..."
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="saturdayVolta">Volta - Horários (separados por vírgula)</Label>
                                <Textarea
                                  id="saturdayVolta"
                                  name="saturdayVolta"
                                  placeholder="07:30, 09:30, 11:30..."
                                  required
                                />
                                <Label htmlFor="saturdayVoltaRoutes">Volta - Rotas (separadas por vírgula)</Label>
                                <Textarea
                                  id="saturdayVoltaRoutes"
                                  name="saturdayVoltaRoutes"
                                  placeholder="Via Hospital, Via Centro, Via Hospital..."
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-semibold">Horários - Domingo</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="sundayIda">Ida - Horários (separados por vírgula)</Label>
                                <Textarea
                                  id="sundayIda"
                                  name="sundayIda"
                                  placeholder="08:00, 10:00, 12:00..."
                                  required
                                />
                                <Label htmlFor="sundayIdaRoutes">Ida - Rotas (separadas por vírgula)</Label>
                                <Textarea
                                  id="sundayIdaRoutes"
                                  name="sundayIdaRoutes"
                                  placeholder="Via Centro, Via Shopping, Via Centro..."
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="sundayVolta">Volta - Horários (separados por vírgula)</Label>
                                <Textarea
                                  id="sundayVolta"
                                  name="sundayVolta"
                                  placeholder="08:30, 10:30, 12:30..."
                                  required
                                />
                                <Label htmlFor="sundayVoltaRoutes">Volta - Rotas (separadas por vírgula)</Label>
                                <Textarea
                                  id="sundayVoltaRoutes"
                                  name="sundayVoltaRoutes"
                                  placeholder="Via Hospital, Via Centro, Via Hospital..."
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            Cancelar
                          </Button>
                          <Button type="submit">Adicionar Linha</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Linha</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Paradas</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Popular</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lines.map((line) => (
                        <TableRow key={line.id}>
                          <TableCell>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              {line.id}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{line.name}</TableCell>
                          <TableCell>{line.stops.length} paradas</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => toggleLineStatus(line.id)}>
                              <Badge
                                variant={line.active ? "default" : "secondary"}
                                className={line.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                              >
                                {line.active ? "Ativa" : "Inativa"}
                              </Badge>
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => togglePopular(line.id)}>
                              <Badge
                                variant={line.popular ? "default" : "outline"}
                                className={line.popular ? "bg-yellow-100 text-yellow-800" : ""}
                              >
                                {line.popular ? "Popular" : "Normal"}
                              </Badge>
                            </Button>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Dialog
                                open={isEditDialogOpen && editingLine?.id === line.id}
                                onOpenChange={(open) => {
                                  setIsEditDialogOpen(open)
                                  if (!open) setEditingLine(null)
                                }}
                              >
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" onClick={() => setEditingLine(line)}>
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>Editar Linha {line.id}</DialogTitle>
                                    <DialogDescription>Modifique os dados da linha de ônibus</DialogDescription>
                                  </DialogHeader>
                                  {editingLine && (
                                    <form
                                      onSubmit={(e) => {
                                        e.preventDefault()
                                        handleEditLine(new FormData(e.currentTarget))
                                      }}
                                    >
                                      <div className="grid gap-4 py-4">
                                        <div>
                                          <Label htmlFor="edit-name">Nome da Linha</Label>
                                          <Input id="edit-name" name="name" defaultValue={editingLine.name} required />
                                        </div>

                                        <div>
                                          <Label htmlFor="edit-stops">Paradas (separadas por vírgula)</Label>
                                          <Textarea
                                            id="edit-stops"
                                            name="stops"
                                            defaultValue={editingLine.stops.join(", ")}
                                            required
                                          />
                                        </div>

                                        {/* Valores de Passagem */}
                                        <div className="space-y-4">
                                          <h4 className="font-semibold text-green-600">Valores de Passagem</h4>
                                          <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
                                              <h5 className="font-medium text-blue-800">Ida</h5>
                                              <div>
                                                <Label htmlFor="edit-fareIdaFrom">De</Label>
                                                <Input
                                                  id="edit-fareIdaFrom"
                                                  name="fareIdaFrom"
                                                  defaultValue={editingLine.farePrice?.ida?.from || ""}
                                                  required
                                                />
                                              </div>
                                              <div>
                                                <Label htmlFor="edit-fareIdaTo">Para</Label>
                                                <Input
                                                  id="edit-fareIdaTo"
                                                  name="fareIdaTo"
                                                  defaultValue={editingLine.farePrice?.ida?.to || ""}
                                                  required
                                                />
                                              </div>
                                              <div>
                                                <Label htmlFor="edit-fareIdaPrice">Preço</Label>
                                                <Input
                                                  id="edit-fareIdaPrice"
                                                  name="fareIdaPrice"
                                                  defaultValue={editingLine.farePrice?.ida?.price || ""}
                                                  required
                                                />
                                              </div>
                                            </div>
                                            <div className="space-y-3 p-4 bg-green-50 rounded-lg">
                                              <h5 className="font-medium text-green-800">Volta</h5>
                                              <div>
                                                <Label htmlFor="edit-fareVoltaFrom">De</Label>
                                                <Input
                                                  id="edit-fareVoltaFrom"
                                                  name="fareVoltaFrom"
                                                  defaultValue={editingLine.farePrice?.volta?.from || ""}
                                                  required
                                                />
                                              </div>
                                              <div>
                                                <Label htmlFor="edit-fareVoltaTo">Para</Label>
                                                <Input
                                                  id="edit-fareVoltaTo"
                                                  name="fareVoltaTo"
                                                  defaultValue={editingLine.farePrice?.volta?.to || ""}
                                                  required
                                                />
                                              </div>
                                              <div>
                                                <Label htmlFor="edit-fareVoltaPrice">Preço</Label>
                                                <Input
                                                  id="edit-fareVoltaPrice"
                                                  name="fareVoltaPrice"
                                                  defaultValue={editingLine.farePrice?.volta?.price || ""}
                                                  required
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Rotas Disponíveis */}
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                          <h4 className="font-semibold mb-3">Rotas Disponíveis</h4>
                                          <div className="grid grid-cols-2 gap-2 text-sm">
                                            {availableRoutes.map((route) => (
                                              <div
                                                key={route.id}
                                                className={`px-2 py-1 rounded text-center ${route.css}`}
                                              >
                                                {route.name}
                                              </div>
                                            ))}
                                          </div>
                                          <p className="text-xs text-gray-600 mt-2">
                                            Use estes nomes exatos nas rotas abaixo
                                          </p>
                                        </div>

                                        <div className="space-y-4">
                                          <h4 className="font-semibold">Horários - Dia Útil</h4>
                                          <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                              <Label htmlFor="edit-weekdayIda">Ida - Horários</Label>
                                              <Textarea
                                                id="edit-weekdayIda"
                                                name="weekdayIda"
                                                defaultValue={editingLine.schedules.weekday.Ida.map((s) => s.time).join(
                                                  ", ",
                                                )}
                                                required
                                              />
                                              <Label htmlFor="edit-weekdayIdaRoutes">Ida - Rotas</Label>
                                              <Textarea
                                                id="edit-weekdayIdaRoutes"
                                                name="weekdayIdaRoutes"
                                                defaultValue={editingLine.schedules.weekday.Ida.map(
                                                  (s) => s.route,
                                                ).join(", ")}
                                                required
                                              />
                                            </div>
                                            <div className="space-y-2">
                                              <Label htmlFor="edit-weekdayVolta">Volta - Horários</Label>
                                              <Textarea
                                                id="edit-weekdayVolta"
                                                name="weekdayVolta"
                                                defaultValue={editingLine.schedules.weekday.Volta.map(
                                                  (s) => s.time,
                                                ).join(", ")}
                                                required
                                              />
                                              <Label htmlFor="edit-weekdayVoltaRoutes">Volta - Rotas</Label>
                                              <Textarea
                                                id="edit-weekdayVoltaRoutes"
                                                name="weekdayVoltaRoutes"
                                                defaultValue={editingLine.schedules.weekday.Volta.map(
                                                  (s) => s.route,
                                                ).join(", ")}
                                                required
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="space-y-4">
                                          <h4 className="font-semibold">Horários - Sábado</h4>
                                          <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                              <Label htmlFor="edit-saturdayIda">Ida - Horários</Label>
                                              <Textarea
                                                id="edit-saturdayIda"
                                                name="saturdayIda"
                                                defaultValue={editingLine.schedules.saturday.Ida.map(
                                                  (s) => s.time,
                                                ).join(", ")}
                                                required
                                              />
                                              <Label htmlFor="edit-saturdayIdaRoutes">Ida - Rotas</Label>
                                              <Textarea
                                                id="edit-saturdayIdaRoutes"
                                                name="saturdayIdaRoutes"
                                                defaultValue={editingLine.schedules.saturday.Ida.map(
                                                  (s) => s.route,
                                                ).join(", ")}
                                                required
                                              />
                                            </div>
                                            <div className="space-y-2">
                                              <Label htmlFor="edit-saturdayVolta">Volta - Horários</Label>
                                              <Textarea
                                                id="edit-saturdayVolta"
                                                name="saturdayVolta"
                                                defaultValue={editingLine.schedules.saturday.Volta.map(
                                                  (s) => s.time,
                                                ).join(", ")}
                                                required
                                              />
                                              <Label htmlFor="edit-saturdayVoltaRoutes">Volta - Rotas</Label>
                                              <Textarea
                                                id="edit-saturdayVoltaRoutes"
                                                name="saturdayVoltaRoutes"
                                                defaultValue={editingLine.schedules.saturday.Volta.map(
                                                  (s) => s.route,
                                                ).join(", ")}
                                                required
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="space-y-4">
                                          <h4 className="font-semibold">Horários - Domingo</h4>
                                          <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                              <Label htmlFor="edit-sundayIda">Ida - Horários</Label>
                                              <Textarea
                                                id="edit-sundayIda"
                                                name="sundayIda"
                                                defaultValue={editingLine.schedules.sunday.Ida.map((s) => s.time).join(
                                                  ", ",
                                                )}
                                                required
                                              />
                                              <Label htmlFor="edit-sundayIdaRoutes">Ida - Rotas</Label>
                                              <Textarea
                                                id="edit-sundayIdaRoutes"
                                                name="sundayIdaRoutes"
                                                defaultValue={editingLine.schedules.sunday.Ida.map((s) => s.route).join(
                                                  ", ",
                                                )}
                                                required
                                              />
                                            </div>
                                            <div className="space-y-2">
                                              <Label htmlFor="edit-sundayVolta">Volta - Horários</Label>
                                              <Textarea
                                                id="edit-sundayVolta"
                                                name="sundayVolta"
                                                defaultValue={editingLine.schedules.sunday.Volta.map(
                                                  (s) => s.time,
                                                ).join(", ")}
                                                required
                                              />
                                              <Label htmlFor="edit-sundayVoltaRoutes">Volta - Rotas</Label>
                                              <Textarea
                                                id="edit-sundayVoltaRoutes"
                                                name="sundayVoltaRoutes"
                                                defaultValue={editingLine.schedules.sunday.Volta.map(
                                                  (s) => s.route,
                                                ).join(", ")}
                                                required
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <DialogFooter>
                                        <Button
                                          type="button"
                                          variant="outline"
                                          onClick={() => {
                                            setIsEditDialogOpen(false)
                                            setEditingLine(null)
                                          }}
                                        >
                                          Cancelar
                                        </Button>
                                        <Button type="submit">Salvar Alterações</Button>
                                      </DialogFooter>
                                    </form>
                                  )}
                                </DialogContent>
                              </Dialog>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja excluir a linha {line.id} - {line.name}? Esta ação não pode
                                      ser desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteLine(line.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Excluir
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Horários</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {lines.map((line) => (
                    <Card key={line.id} className="border-l-4 border-l-blue-500">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              Linha {line.id} - {line.name}
                            </CardTitle>
                            <p className="text-sm text-gray-600 mt-1">
                              {line.stops.length} paradas • {line.active ? "Ativa" : "Inativa"}
                            </p>
                          </div>
                          <Badge variant={line.active ? "default" : "secondary"}>
                            {line.active ? "Operando" : "Inativa"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3 text-blue-600">Dia Útil</h4>
                            <div className="space-y-2">
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Ida:</p>
                                <div className="grid grid-cols-2 gap-1">
                                  {line.schedules.weekday.Ida.map((schedule, index) => (
                                    <div key={index} className={`text-xs p-1 rounded text-center ${schedule.css}`}>
                                      <div className="font-semibold">{schedule.time}</div>
                                      <div className="opacity-80">{schedule.route}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Volta:</p>
                                <div className="grid grid-cols-2 gap-1">
                                  {line.schedules.weekday.Volta.map((schedule, index) => (
                                    <div key={index} className={`text-xs p-1 rounded text-center ${schedule.css}`}>
                                      <div className="font-semibold">{schedule.time}</div>
                                      <div className="opacity-80">{schedule.route}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3 text-green-600">Sábado</h4>
                            <div className="space-y-2">
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Ida:</p>
                                <div className="grid grid-cols-2 gap-1">
                                  {line.schedules.saturday.Ida.map((schedule, index) => (
                                    <div key={index} className={`text-xs p-1 rounded text-center ${schedule.css}`}>
                                      <div className="font-semibold">{schedule.time}</div>
                                      <div className="opacity-80">{schedule.route}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Volta:</p>
                                <div className="grid grid-cols-2 gap-1">
                                  {line.schedules.saturday.Volta.map((schedule, index) => (
                                    <div key={index} className={`text-xs p-1 rounded text-center ${schedule.css}`}>
                                      <div className="font-semibold">{schedule.time}</div>
                                      <div className="opacity-80">{schedule.route}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3 text-purple-600">Domingo</h4>
                            <div className="space-y-2">
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Ida:</p>
                                <div className="grid grid-cols-2 gap-1">
                                  {line.schedules.sunday.Ida.map((schedule, index) => (
                                    <div key={index} className={`text-xs p-1 rounded text-center ${schedule.css}`}>
                                      <div className="font-semibold">{schedule.time}</div>
                                      <div className="opacity-80">{schedule.route}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Volta:</p>
                                <div className="grid grid-cols-2 gap-1">
                                  {line.schedules.sunday.Volta.map((schedule, index) => (
                                    <div key={index} className={`text-xs p-1 rounded text-center ${schedule.css}`}>
                                      <div className="font-semibold">{schedule.time}</div>
                                      <div className="opacity-80">{schedule.route}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="useful-info" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Informações Úteis</CardTitle>
                  <Dialog open={isAddInfoDialogOpen} onOpenChange={setIsAddInfoDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Estabelecimento
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Adicionar Estabelecimento</DialogTitle>
                        <DialogDescription>Preencha os dados do novo estabelecimento</DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          handleAddUsefulInfo(new FormData(e.currentTarget))
                        }}
                      >
                        <div className="grid gap-4 py-4">
                          <div>
                            <Label htmlFor="info-name">Nome do Estabelecimento</Label>
                            <Input id="info-name" name="name" placeholder="Ex: Pão Quente Padaria" required />
                          </div>

                          <div>
                            <Label htmlFor="info-category">Categoria</Label>
                            <Select name="category" required>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione uma categoria" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories
                                  .filter((cat) => cat.id !== "all")
                                  .map((category) => (
                                    <SelectItem key={category.id} value={category.id}>
                                      {category.icon} {category.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="info-whatsapp">WhatsApp</Label>
                              <Input
                                id="info-whatsapp"
                                name="whatsapp"
                                placeholder="https://wa.me/5531999999999"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="info-instagram">Instagram</Label>
                              <Input
                                id="info-instagram"
                                name="instagram"
                                placeholder="https://instagram.com/usuario"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="info-hours">Horário de Funcionamento</Label>
                            <Input id="info-hours" name="hours" placeholder="Seg a Sab - 08h às 18h" required />
                          </div>

                          <div className="space-y-3">
                            <Label>Produtos Principais</Label>
                            <div className="grid gap-2">
                              <Input name="product1" placeholder="Produto 1" required />
                              <Input name="product2" placeholder="Produto 2" required />
                              <Input name="product3" placeholder="Produto 3" required />
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setIsAddInfoDialogOpen(false)}>
                            Cancelar
                          </Button>
                          <Button type="submit">Adicionar Estabelecimento</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Horário</TableHead>
                        <TableHead>Produtos</TableHead>
                        <TableHead>Patrocinado</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usefulInfo.map((info) => (
                        <TableRow key={info.id}>
                          <TableCell className="font-medium">{info.name}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                              {getCategoryIcon(info.category)} {getCategoryName(info.category)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">{info.hours}</TableCell>
                          <TableCell className="text-sm">{info.products.join(", ")}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => toggleSponsored(info.id)}>
                              <Badge
                                variant={info.sponsored ? "default" : "outline"}
                                className={
                                  info.sponsored ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white" : ""
                                }
                              >
                                {info.sponsored ? "★ Patrocinado" : "Regular"}
                              </Badge>
                            </Button>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Dialog
                                open={isEditInfoDialogOpen && editingInfo?.id === info.id}
                                onOpenChange={(open) => {
                                  setIsEditInfoDialogOpen(open)
                                  if (!open) setEditingInfo(null)
                                }}
                              >
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" onClick={() => setEditingInfo(info)}>
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>Editar {info.name}</DialogTitle>
                                    <DialogDescription>Modifique os dados do estabelecimento</DialogDescription>
                                  </DialogHeader>
                                  {editingInfo && (
                                    <form
                                      onSubmit={(e) => {
                                        e.preventDefault()
                                        handleEditUsefulInfo(new FormData(e.currentTarget))
                                      }}
                                    >
                                      <div className="grid gap-4 py-4">
                                        <div>
                                          <Label htmlFor="edit-info-name">Nome do Estabelecimento</Label>
                                          <Input
                                            id="edit-info-name"
                                            name="name"
                                            defaultValue={editingInfo.name}
                                            required
                                          />
                                        </div>

                                        <div>
                                          <Label htmlFor="edit-info-category">Categoria</Label>
                                          <Select name="category" defaultValue={editingInfo.category} required>
                                            <SelectTrigger>
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {categories
                                                .filter((cat) => cat.id !== "all")
                                                .map((category) => (
                                                  <SelectItem key={category.id} value={category.id}>
                                                    {category.icon} {category.name}
                                                  </SelectItem>
                                                ))}
                                            </SelectContent>
                                          </Select>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <Label htmlFor="edit-info-whatsapp">WhatsApp</Label>
                                            <Input
                                              id="edit-info-whatsapp"
                                              name="whatsapp"
                                              defaultValue={editingInfo.whatsapp}
                                              required
                                            />
                                          </div>
                                          <div>
                                            <Label htmlFor="edit-info-instagram">Instagram</Label>
                                            <Input
                                              id="edit-info-instagram"
                                              name="instagram"
                                              defaultValue={editingInfo.instagram}
                                              required
                                            />
                                          </div>
                                        </div>

                                        <div>
                                          <Label htmlFor="edit-info-hours">Horário de Funcionamento</Label>
                                          <Input
                                            id="edit-info-hours"
                                            name="hours"
                                            defaultValue={editingInfo.hours}
                                            required
                                          />
                                        </div>

                                        <div className="space-y-3">
                                          <Label>Produtos Principais</Label>
                                          <div className="grid gap-2">
                                            <Input name="product1" defaultValue={editingInfo.products[0]} required />
                                            <Input name="product2" defaultValue={editingInfo.products[1]} required />
                                            <Input name="product3" defaultValue={editingInfo.products[2]} required />
                                          </div>
                                        </div>
                                      </div>
                                      <DialogFooter>
                                        <Button
                                          type="button"
                                          variant="outline"
                                          onClick={() => {
                                            setIsEditInfoDialogOpen(false)
                                            setEditingInfo(null)
                                          }}
                                        >
                                          Cancelar
                                        </Button>
                                        <Button type="submit">Salvar Alterações</Button>
                                      </DialogFooter>
                                    </form>
                                  )}
                                </DialogContent>
                              </Dialog>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja excluir {info.name}? Esta ação não pode ser desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteUsefulInfo(info.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Excluir
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
