"use client"

import { useState, useEffect } from "react"
import { ArrowRight, MapPin, Clock, Smartphone, Star, Users, Zap, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-green-600/10" />
        <div
          className={`relative px-4 py-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            {/* Logo animado */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Encontre sua linha de{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">ônibus</span>{" "}
              com um toque
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Consulte horários, veja paradas e nunca mais perca seu ônibus. Simples, rápido e sempre atualizado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/app">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 text-lg rounded-full hover:scale-105 transition-transform duration-200 shadow-lg"
                >
                  Acessar o App
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg rounded-full hover:scale-105 transition-transform duration-200 bg-transparent"
              >
                <Download className="mr-2 w-5 h-5" />
                Instalar PWA
              </Button>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-float opacity-60" />
        <div className="absolute top-40 right-20 w-6 h-6 bg-green-400 rounded-full animate-float-delayed opacity-60" />
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-yellow-400 rounded-full animate-float opacity-60" />
      </section>

      {/* Como Funciona */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Como funciona</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Três passos simples para nunca mais perder seu ônibus
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Busque sua linha",
                description: "Digite o número, nome ou destino da linha que você precisa",
                color: "from-blue-500 to-blue-600",
                delay: "delay-100",
              },
              {
                icon: Clock,
                title: "Veja os horários",
                description: "Consulte horários de dia útil, sábado e domingo em tempo real",
                color: "from-green-500 to-green-600",
                delay: "delay-200",
              },
              {
                icon: Smartphone,
                title: "Instale o app",
                description: "Adicione à tela inicial e tenha acesso offline",
                color: "from-purple-500 to-purple-600",
                delay: "delay-300",
              },
            ].map((step, index) => (
              <Card
                key={index}
                className={`hover:shadow-xl transition-all duration-500 hover:scale-105 ${
                  isVisible ? `animate-fade-in-up ${step.delay}` : "opacity-0"
                }`}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Por que escolher o BusWaze?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A melhor experiência para consultar transporte público
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "Super Rápido",
                description: "Interface otimizada para consultas instantâneas",
              },
              {
                icon: Smartphone,
                title: "Mobile First",
                description: "Desenvolvido pensando no seu celular",
              },
              {
                icon: Star,
                title: "Sempre Atualizado",
                description: "Informações direto das empresas de ônibus",
              },
              {
                icon: Users,
                title: "Fácil de Usar",
                description: "Interface intuitiva inspirada no Waze",
              },
            ].map((benefit, index) => (
              <Card
                key={index}
                className={`text-center hover:shadow-lg transition-all duration-300 hover:scale-105 ${
                  isVisible ? `animate-fade-in-up delay-${(index + 1) * 100}` : "opacity-0"
                }`}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-3xl p-12 text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para começar?</h2>
            <p className="text-xl mb-8 opacity-90">
              Junte-se a milhares de usuários que já descobriram a forma mais fácil de consultar horários de ônibus
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/app">
                <Button
                  size="lg"
                  variant="secondary"
                  className="px-8 py-4 text-lg rounded-full hover:scale-105 transition-transform duration-200 bg-white text-blue-600 hover:bg-gray-100"
                >
                  Começar Agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg">BusWaze</span>
              </div>
              <p className="text-gray-400 text-sm">
                A forma mais inteligente de consultar horários de ônibus da sua cidade.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">App</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/app" className="hover:text-white transition-colors">
                    Acessar App
                  </Link>
                </li>
                <li>
                  <Link href="/app/lines" className="hover:text-white transition-colors">
                    Todas as Linhas
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contato
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Termos de Uso
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 BusWaze. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
