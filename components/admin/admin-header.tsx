"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"

interface AdminHeaderProps {
  title?: string
}

export function AdminHeader({ title = "Painel Administrativo" }: AdminHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground">Gerencie sua loja de vestuário fitness</p>
      </div>
      
      <Button 
        asChild 
        variant="outline" 
        size="sm"
      >
        <Link href="/" target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-4 w-4 mr-2" />
          Ver Loja
        </Link>
      </Button>
    </div>
  )
}