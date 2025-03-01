"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createBooking } from "@/action"
import { toast } from "@/components/ui/use-toast"

interface CreateBookingDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function CreateBookingDialog({ isOpen, onClose, onSuccess }: CreateBookingDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    data: new Date().toISOString().split("T")[0],
    oraInizio: "09:00",
    oraFine: "10:00",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateTimes = () => {
    const [startHours, startMinutes] = formData.oraInizio.split(":").map(Number)
    const [endHours, endMinutes] = formData.oraFine.split(":").map(Number)
    const startInMinutes = startHours * 60 + startMinutes
    const endInMinutes = endHours * 60 + endMinutes

    return endInMinutes > startInMinutes
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateTimes()) {
      toast({
        title: "Orario non valido",
        description: "L'orario di fine deve essere successivo all'orario di inizio",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const date = new Date(formData.data)
      const startDate = new Date(date)
      const [startHours, startMinutes] = formData.oraInizio.split(":")
      startDate.setHours(Number.parseInt(startHours), Number.parseInt(startMinutes))

      const endDate = new Date(date)
      const [endHours, endMinutes] = formData.oraFine.split(":")
      endDate.setHours(Number.parseInt(endHours), Number.parseInt(endMinutes))

      await createBooking({
        ...formData,
        oraInizio: startDate.toISOString(),
        oraFine: endDate.toISOString(),
      })

      toast({
        title: "Appuntamento creato",
        description: "L'appuntamento è stato creato con successo",
      })

      onSuccess()
      onClose()
    } catch (error) {
      toast({
        title: "Errore",
        description: "Errore durante la creazione dell'appuntamento",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nuovo appuntamento</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="cognome">Cognome</Label>
                <Input id="cognome" name="cognome" value={formData.cognome} onChange={handleChange} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="telefono">Telefono</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="data">Data</Label>
              <Input id="data" name="data" type="date" value={formData.data} onChange={handleChange} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="oraInizio">Ora inizio</Label>
                <Input
                  id="oraInizio"
                  name="oraInizio"
                  type="time"
                  value={formData.oraInizio}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="oraFine">Ora fine</Label>
                <Input
                  id="oraFine"
                  name="oraFine"
                  type="time"
                  value={formData.oraFine}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annulla
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creazione..." : "Crea appuntamento"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

