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
    const newLine = {
      id: formData.get("id") as string,
      name: formData.get("name") as string,
      direction: ["Ida", "Volta"],
      schedules: {
        weekday: {
          Ida: (formData.get("weekdayIda") as string).split(",").map((s) => s.trim()),
          Volta: (formData.get("weekdayVolta") as string).split(",").map((s) => s.trim()),
        },
        saturday: {
          Ida: (formData.get("saturdayIda") as string).split(",").map((s) => s.trim()),
          Volta: (formData.get("saturdayVolta") as string).split(",").map((s) => s.trim()),
        },
        sunday: {
          Ida: (formData.get("sundayIda") as string).split(",").map((s) => s.trim()),
          Volta: (formData.get("sundayVolta") as string).split(",").map((s) => s.trim()),
        },
      },
      stops: (formData.get("stops") as string).split(",").map((s) => s.trim()),
      active: true,
      popular: false,
    }

    setLines([...lines, newLine])
    setIsAddDialogOpen(false)
  }

  const handleEditLine = (formData: FormData) => {
    const updatedLine = {
      ...editingLine,
      name: formData.get("name") as string,
      schedules: {
        weekday: {
          Ida: (formData.get("weekdayIda") as string).split(",").map((s) => s.trim()),
          Volta: (formData.get("weekdayVolta") as string).split(",").map((s) => s.trim()),
        },
        saturday: {
          Ida: (formData.get("saturdayIda") as string).split(",").map((s) => s.trim()),
          Volta: (formData.get("saturdayVolta") as string).split(",").map((s) => s.trim()),
        },
        sunday: {
          Ida: (formData.get("sundayIda") as string).split(",").map((s) => s.trim()),
          Volta: (formData.get("sundayVolta") as string).split(",").map((s) => s.trim()),
        },
      },
      stops: (formData.get("stops") as string).split(",").map((s) => s.trim()),
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
              <p className="text-gray-600 mt-1">Gerencie linhas e informações do BusWaze</p>
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

                          <div className="space-y-4">
                            <h4 className="font-semibold">Horários - Dia Útil</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="weekdayIda">Ida (separados por vírgula)</Label>
                                <Textarea
                                  id="weekdayIda"
                                  name="weekdayIda"
                                  placeholder="06:00, 07:00, 08:00..."
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="weekdayVolta">Volta (separados por vírgula)</Label>
                                <Textarea
                                  id="weekdayVolta"
                                  name="weekdayVolta"
                                  placeholder="06:30, 07:30, 08:30..."
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-semibold">Horários - Sábado</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="saturdayIda">Ida (separados por vírgula)</Label>
                                <Textarea
                                  id="saturdayIda"
                                  name="saturdayIda"
                                  placeholder="07:00, 09:00, 11:00..."
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="saturdayVolta">Volta (separados por vírgula)</Label>
                                <Textarea
                                  id="saturdayVolta"
                                  name="saturdayVolta"
                                  placeholder="07:30, 09:30, 11:30..."
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-semibold">Horários - Domingo</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="sundayIda">Ida (separados por vírgula)</Label>
                                <Textarea
                                  id="sundayIda"
                                  name="sundayIda"
                                  placeholder="08:00, 10:00, 12:00..."
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="sundayVolta">Volta (separados por vírgula)</Label>
                                <Textarea
                                  id="sundayVolta"
                                  name="sundayVolta"
                                  placeholder="08:30, 10:30, 12:30..."
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

                                        <div className="space-y-4">
                                          <h4 className="font-semibold">Horários - Dia Útil</h4>
                                          <div className="grid grid-cols-2 gap-4">
                                            <div>
                                              <Label htmlFor="edit-weekdayIda">Ida</Label>
                                              <Textarea
                                                id="edit-weekdayIda"
                                                name="weekdayIda"
                                                defaultValue={editingLine.schedules.weekday.Ida.join(", ")}
                                                required
                                              />
                                            </div>
                                            <div>
                                              <Label htmlFor="edit-weekdayVolta">Volta</Label>
                                              <Textarea
                                                id="edit-weekdayVolta"
                                                name="weekdayVolta"
                                                defaultValue={editingLine.schedules.weekday.Volta.join(", ")}
                                                required
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="space-y-4">
                                          <h4 className="font-semibold">Horários - Sábado</h4>
                                          <div className="grid grid-cols-2 gap-4">
                                            <div>
                                              <Label htmlFor="edit-saturdayIda">Ida</Label>
                                              <Textarea
                                                id="edit-saturdayIda"
                                                name="saturdayIda"
                                                defaultValue={editingLine.schedules.saturday.Ida.join(", ")}
                                                required
                                              />
                                            </div>
                                            <div>
                                              <Label htmlFor="edit-saturdayVolta">Volta</Label>
                                              <Textarea
                                                id="edit-saturdayVolta"
                                                name="saturdayVolta"
                                                defaultValue={editingLine.schedules.saturday.Volta.join(", ")}
                                                required
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="space-y-4">
                                          <h4 className="font-semibold">Horários - Domingo</h4>
                                          <div className="grid grid-cols-2 gap-4">
                                            <div>
                                              <Label htmlFor="edit-sundayIda">Ida</Label>
                                              <Textarea
                                                id="edit-sundayIda"
                                                name="sundayIda"
                                                defaultValue={editingLine.schedules.sunday.Ida.join(", ")}
                                                required
                                              />
                                            </div>
                                            <div>
                                              <Label htmlFor="edit-sundayVolta">Volta</Label>
                                              <Textarea
                                                id="edit-sundayVolta"
                                                name="sundayVolta"
                                                defaultValue={editingLine.schedules.sunday.Volta.join(", ")}
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
                                <p className="text-sm font-medium text-gray-700">Ida:</p>
                                <p className="text-sm text-gray-600">{line.schedules.weekday.Ida.join(", ")}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-700">Volta:</p>
                                <p className="text-sm text-gray-600">{line.schedules.weekday.Volta.join(", ")}</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3 text-green-600">Sábado</h4>
                            <div className="space-y-2">
                              <div>
                                <p className="text-sm font-medium text-gray-700">Ida:</p>
                                <p className="text-sm text-gray-600">{line.schedules.saturday.Ida.join(", ")}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-700">Volta:</p>
                                <p className="text-sm text-gray-600">{line.schedules.saturday.Volta.join(", ")}</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3 text-purple-600">Domingo</h4>
                            <div className="space-y-2">
                              <div>
                                <p className="text-sm font-medium text-gray-700">Ida:</p>
                                <p className="text-sm text-gray-600">{line.schedules.sunday.Ida.join(", ")}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-700">Volta:</p>
                                <p className="text-sm text-gray-600">{line.schedules.sunday.Volta.join(", ")}</p>
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
