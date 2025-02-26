"use client"

import { useState, useEffect, useCallback } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from "@fullcalendar/list"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { getBookings, updateBookingStatus } from "@/action"
import { ArrowLeft, Calendar, List } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchBookings = useCallback(async () => {
      try {
        const bookingsData = await getBookings()
        setBookings(
          bookingsData.map((booking: any) => ({
            id: booking.id,
            nome: booking.nome,
            cognome: booking.cognome,
            telefono: booking.telefono,
            email: booking.email,
            start: booking.oraInizio,
            end: booking.oraFine,
            giorno: booking.giorno,
            backgroundColor: getEventColor(booking.status),
            borderColor: getEventColor(booking.status),
            extendedProps: {
              status: booking.status,
            },
          })),
        )
      } catch (error) {
        console.error("Errore caricamento prenotazioni:", error)
      }
    }, [])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  const handleEventClick = (clickInfo: any) => {

    const bookingId = clickInfo.event.id

    console.log(bookings,bookingId)

    const booking = bookings.find(prenotazione => prenotazione.id == bookingId)

    

    if (booking) {
      setSelectedBooking(booking)
      setIsDialogOpen(true)
    }
  }

  const handleStatusUpdate = async (status: string) => {
    if (!selectedBooking) return

    setIsLoading(true)
    try {
      await updateBookingStatus(selectedBooking.id, status)
      toast({
        title: "Status Updated",
        description: `Booking has been ${status}`,
      })
      setIsDialogOpen(false)
      fetchBookings()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>
      case "pending":
      default:
        return <Badge className="bg-yellow-500">Pending</Badge>
    }
  }

  const getEventColor = (status: string) => {
    switch (status) {
      case "approved":
        return "#22c55e"
      case "rejected":
        return "#ef4444"
      case "pending":
      default:
        return "#eab308"
    }
  }

  return (
    <div className=" py-8">

      <h1 className="text-3xl font-bold mb-8">Gestione prenotazionni</h1>

      <Tabs defaultValue="calendar">
        <TabsList className="mb-4">
          <TabsTrigger value="calendar">
            <Calendar className="mr-2 h-4 w-4" />
            Calendario
          </TabsTrigger>
          <TabsTrigger value="list">
            <List className="mr-2 h-4 w-4" />
            Lista eventi
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Calendario appuntamenti</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[700px]">
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="timeGridWeek"
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                  }}
                  buttonText={{
                    today:"Oggi",
                    month:"Mese",
                    week:"Settimana",
                    day:"Giorno"
                  }}
                  locale={"it"}
                  events={bookings}
                  eventClick={handleEventClick}
                  height="100%"
                  allDaySlot={false}
                  slotMinTime="08:00:00"
                  slotMaxTime="18:00:00"
                  slotDuration="00:30:00"
                  slotLabelInterval="01:00"
                  businessHours={[
                    {
                      daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
                      startTime: "09:00",
                      endTime: "18:00",
                    },
                    {
                      daysOfWeek: [6], // Saturday
                      startTime: "08:00",
                      endTime: "14:00",
                    },
                  ]}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Booking List</CardTitle>
              <CardDescription>View all bookings in list format</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[700px]">
                <FullCalendar
                  droppable={true}
                  plugins={[listPlugin]}
                  initialView="listWeek"
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "listDay,listWeek,listMonth",
                  }}
                  buttonText={{
                    today:"Oggi",
                    month:"Mese",
                    week:"Settimana",
                    day:"Giorno"
                  }}
                  locale={"it"}
                  events={bookings}
                  eventClick={handleEventClick}
                  height="100%"
                  businessHours={[
                    {
                      daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
                      startTime: "09:00",
                      endTime: "18:00",
                    },
                    {
                      daysOfWeek: [6], // Saturday
                      startTime: "08:00",
                      endTime: "14:00",
                    },
                  ]}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedBooking && (
            <>
              <DialogHeader>
                <DialogTitle>Bacheca prenotazioni</DialogTitle>
                <DialogDescription>
                  {new Date(selectedBooking.startTime).toLocaleDateString()} at{" "}
                  {new Date(selectedBooking.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Stato:</span>
                  {getStatusBadge(selectedBooking.status)}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-1">Nome</h4>
                    <p>{selectedBooking.nome}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">Cognome</h4>
                    <p>{selectedBooking.cognome}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p>{selectedBooking.email}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-1">Telefono</h4>
                  <p>{selectedBooking.telefono}</p>
                </div>

              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                {selectedBooking.status === "pending" && (
                  <>
                    <Button
                      variant="outline"
                      className="bg-red-500 text-white hover:bg-red-600"
                      onClick={() => handleStatusUpdate("rejected")}
                      disabled={isLoading}
                    >
                      Reject
                    </Button>
                    <Button
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => handleStatusUpdate("approved")}
                      disabled={isLoading}
                    >
                      Approve
                    </Button>
                  </>
                )}
                {selectedBooking.status !== "pending" && (
                  <Button variant="outline" onClick={() => handleStatusUpdate("pending")} disabled={isLoading}>
                    Reset to Pending
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  )
}

