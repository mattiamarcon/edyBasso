"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { EventInput } from "@fullcalendar/core"
import { format, parse } from "date-fns"

interface AppointmentDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (event: EventInput) => void
  onDelete: () => void
  event: EventInput
}

export function AppointmentDialog({ isOpen, onClose, onSave, onDelete, event }: AppointmentDialogProps) {
  const [title, setTitle] = useState((event.title as string) || "")
  const [startDate, setStartDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endDate, setEndDate] = useState("")
  const [endTime, setEndTime] = useState("")
  const [color, setColor] = useState((event.backgroundColor as string) || "#3788d8")

  // Inizializza i campi quando l'evento cambia
  useEffect(() => {
    if (event.start) {
      setStartDate(format(event.start as Date, "yyyy-MM-dd"))
      setStartTime(format(event.start as Date, "HH:mm"))
    }
    if (event.end) {
      setEndDate(format(event.end as Date, "yyyy-MM-dd"))
      setEndTime(format(event.end as Date, "HH:mm"))
    } else if (event.start) {
      // Se non c'è una data di fine, imposta la stessa data di inizio e aggiungi un'ora
      const endDate = new Date(event.start as Date)
      endDate.setHours(endDate.getHours() + 1)
      setEndDate(format(endDate, "yyyy-MM-dd"))
      setEndTime(format(endDate, "HH:mm"))
    }
    setTitle((event.title as string) || "")
    setColor((event.backgroundColor as string) || "#3788d8")
  }, [event])

  const handleSave = () => {
    // Crea oggetti Date dalle stringhe di data e ora
    const startDateTime = parse(`${startDate} ${startTime}`, "yyyy-MM-dd HH:mm", new Date())

    const endDateTime = parse(`${endDate} ${endTime}`, "yyyy-MM-dd HH:mm", new Date())

    // Verifica che la data di fine sia successiva alla data di inizio
    if (endDateTime <= startDateTime) {
      alert("La data di fine deve essere successiva alla data di inizio")
      return
    }

    const updatedEvent: EventInput = {
      ...event,
      title,
      start: startDateTime,
      end: endDateTime,
      backgroundColor: color,
    }

    onSave(updatedEvent)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{event.id ? "Modifica Appuntamento" : "Nuovo Appuntamento"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Titolo
            </Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startDate" className="text-right">
              Data inizio
            </Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startTime" className="text-right">
              Ora inizio
            </Label>
            <Input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endDate" className="text-right">
              Data fine
            </Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endTime" className="text-right">
              Ora fine
            </Label>
            <Input
              id="endTime"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="color" className="text-right">
              Colore
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <Input
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-12 h-10 p-1"
              />
              <span className="text-sm text-muted-foreground">{color}</span>
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <div>
            {event.id && (
              <Button variant="destructive" onClick={onDelete}>
                Elimina
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Annulla
            </Button>
            <Button onClick={handleSave}>Salva</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

