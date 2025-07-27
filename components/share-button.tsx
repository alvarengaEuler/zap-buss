"use client"

import { useState } from "react"
import { Share2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

interface ShareButtonProps {
  title: string
  text: string
  url?: string
  className?: string
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "lg" | "icon"
}

export default function ShareButton({
  title,
  text,
  url,
  className,
  variant = "ghost",
  size = "icon",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const shareData = {
      title,
      text,
      url: url || window.location.href,
    }

    try {
      // Verificar se Web Share API está disponível
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData)
        return
      }
    } catch (error) {
      console.log("Erro ao compartilhar:", error)
    }

    // Fallback: copiar para clipboard
    try {
      const textToShare = `${title}\n${text}\n${shareData.url}`
      await navigator.clipboard.writeText(textToShare)

      setCopied(true)
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para sua área de transferência.",
      })

      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Erro ao copiar:", error)
      toast({
        title: "Erro",
        description: "Não foi possível compartilhar ou copiar o link.",
        variant: "destructive",
      })
    }
  }

  return (
    <Button variant={variant} size={size} onClick={handleShare} className={className}>
      {copied ? <Check className="w-5 h-5 text-green-600" /> : <Share2 className="w-5 h-5" />}
      {size !== "icon" && <span className="ml-2">{copied ? "Copiado!" : "Compartilhar"}</span>}
    </Button>
  )
}
