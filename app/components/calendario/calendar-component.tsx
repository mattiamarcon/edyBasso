"use client"

import { useCallback, useEffect, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import itLocale from "@fullcalendar/core/locales/it"
import type { EventInput, DateSelectArg, EventClickArg, EventChangeArg } from "@fullcalendar/core"
import { AppointmentDialog } from "./appointment-dialog"
import { DeleteConfirmDialog } from "./delete-confirm-dialog"
import { getBookings } from "@/action"

export default function CalendarComponent() {
  const [events, setEvents] = useState<EventInput[]>([
    {
      id: "1",
      title: "Appuntamento con Mario Rossi",
      start: new Date(new Date().setHours(10, 0, 0, 0)),
      end: new Date(new Date().setHours(11, 0, 0, 0)),
      backgroundColor: "#3788d8",
    },
    {
      id: "2",
      title: "Visita Luigi Bianchi",
      start: new Date(new Date().setHours(14, 0, 0, 0)),
      end: new Date(new Date().setHours(15, 30, 0, 0)),
      backgroundColor: "#38b000",
    },
  ])

  const fetchBookings = useCallback(async () => {
    try {
      const bookingsData = await getBookings()
      setEvents(
        bookingsData.map((booking: any) => ({
          id: booking.id,
          nome: booking.nome,
          cognome: booking.cognome,
          telefono: booking.telefono,
          email: booking.email,
          start: booking.oraInizio,
          end: booking.oraFine,
          giorno: booking.giorno,
        })),
      )
    } catch (error) {
      console.error("Errore caricamento prenotazioni:", error)
    }
  }, [])

useEffect(() => {
  fetchBookings()
}, [fetchBookings])

  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Gestisce il click su un evento
  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      end: clickInfo.event.end,
      backgroundColor: clickInfo.event.backgroundColor,
    })
    setIsDialogOpen(true)
  }

  // Gestisce la selezione di una data/ora
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const newEvent = {
      id: String(Date.now()),
      title: "Nuovo appuntamento",
      start: selectInfo.start,
      end: selectInfo.end,
      backgroundColor: "#3788d8",
    }
    setSelectedEvent(newEvent)
    setIsDialogOpen(true)
  }

  // Gestisce il drag and drop degli eventi
  const handleEventChange = (changeInfo: EventChangeArg) => {
    const updatedEvents = events.map((event) =>
      event.id === changeInfo.event.id
        ? {
            ...event,
            start: changeInfo.event.start,
            end: changeInfo.event.end,
          }
        : event,
    )
    setEvents(updatedEvents)
  }

  // Salva le modifiche all'appuntamento
  const handleSaveAppointment = (updatedEvent: EventInput) => {
    if (events.some((event) => event.id === updatedEvent.id)) {
      // Aggiorna un evento esistente
      setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)))
    } else {
      // Aggiunge un nuovo evento
      setEvents([...events, updatedEvent])
    }
    setIsDialogOpen(false)
    setSelectedEvent(null)
  }

  // Apre il dialog di conferma per l'eliminazione
  const handleDeleteRequest = () => {
    setIsDialogOpen(false)
    setIsDeleteDialogOpen(true)
  }

  // Elimina definitivamente l'appuntamento
  const handleConfirmDelete = () => {
    if (selectedEvent?.id) {
      setEvents(events.filter((event) => event.id !== selectedEvent.id))
    }
    setIsDeleteDialogOpen(false)
    setSelectedEvent(null)
  }

  // Chiude il dialog senza salvare
  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedEvent(null)
  }

  // Chiude il dialog di conferma eliminazione
  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false)
    setIsDialogOpen(true) // Riapre il dialog dell'appuntamento
  }

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events}
        locale={itLocale}
        eventClick={handleEventClick}
        select={handleDateSelect}
        eventChange={handleEventChange}
        height="auto"
        allDaySlot={false}
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
      />

      {selectedEvent && (
        <AppointmentDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onSave={handleSaveAppointment}
          onDelete={handleDeleteRequest}
          event={selectedEvent}
        />
      )}

      {selectedEvent && (
        <DeleteConfirmDialog
          isOpen={isDeleteDialogOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          eventTitle={selectedEvent.title as string}
        />
      )}
    </div>
  )
}

