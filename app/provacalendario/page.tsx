"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {  createBooking, getBookings } from "@/action"
import {  Clock, CalendarClock, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

import { sendEmail } from "@/action"

// Replace the BUSINESS_HOURS constant with this day-specific configuration
const BUSINESS_HOURS = {
  0: { start: null, end: null }, // Sunday - closed
  1: { start: 9, end: 18 }, // Monday 9AM-6PM
  2: { start: 9, end: 18 }, // Tuesday 9AM-6PM
  3: { start: 9, end: 18 }, // Wednesday 9AM-6PM
  4: { start: 9, end: 18 }, // Thursday 9AM-6PM
  5: { start: 9, end: 18 }, // Friday 9AM-6PM
  6: { start: 8, end: 12 }, // Saturday 8AM-2PM
}

// Configuration for time slots
const SLOT_DURATION = 60 // in minutes
const SLOT_INTERVAL = 30 // in minutes

export default function BookingsPage() {
  const router= useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [bookings, setBookings] = useState<any[]>([])
  const [availableSlots, setAvailableSlots] = useState<{ time: string; dateTime: Date }[]>([])
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefono: "",
    cognome: "",
  })
  const [errors, setErrors] = useState<{ nome?: string; cognome?: string;email?: string; telefono?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Function to fetch bookings
  const fetchBookings = useCallback(async () => {
    try {
      const bookingsData = await getBookings()
      setBookings(
        bookingsData.map((booking: any) => ({
          id: booking.id,
          email: booking.email,
          start: booking.oraInizio,
          end: booking.oraFine,
        })),
      )
    } catch (error) {
      console.error("Errore caricamento prenotazioni:", error)
    }
  }, [])

  useEffect(() => {
    // Fetch existing bookings when component mounts
    fetchBookings()
  }, [fetchBookings])

  // Update the useEffect that generates time slots to use day-specific hours
  useEffect(() => {
    if (!selectedDate) {
      setAvailableSlots([])
      return
    }

    const dayOfWeek = selectedDate.getDay()
    const dayHours = BUSINESS_HOURS[dayOfWeek as keyof typeof BUSINESS_HOURS]

    // If the day is closed (Sunday), no slots available
    if (!dayHours.start || !dayHours.end) {
      setAvailableSlots([])
      return
    }

    const slots: { time: string; dateTime: Date }[] = []
    const date = new Date(selectedDate)
    date.setHours(dayHours.start, 0, 0, 0)

    // Generate slots from business hours start to end for the specific day
    while (date.getHours() < dayHours.end) {
      const slotDateTime = new Date(date)

      // Format the time for display
      const hours = slotDateTime.getHours()
      const minutes = slotDateTime.getMinutes()
      const formattedHours = hours.toString().padStart(2,"0")
      const formattedMinutes = minutes.toString().padStart(2, "0")
      const timeString = `${formattedHours}:${formattedMinutes}`

      // Check if this slot is already booked
      const isBooked = bookings.some((booking) => {
        const bookingStart = new Date(booking.start)
        const bookingEnd = new Date(booking.end)
        const slotEnd = new Date(slotDateTime)
        slotEnd.setMinutes(slotEnd.getMinutes() + SLOT_DURATION)

        return (
          (slotDateTime >= bookingStart && slotDateTime < bookingEnd) ||
          (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
          (slotDateTime <= bookingStart && slotEnd >= bookingEnd)
        )
      })

      if (!isBooked) {
        slots.push({
          time: timeString,
          dateTime: slotDateTime,
        })
      }

      // Move to next slot based on interval
      date.setMinutes(date.getMinutes() + SLOT_INTERVAL)
    }

    setAvailableSlots(slots)
  }, [selectedDate, bookings])

  const handleDateSelect = (selectInfo: any) => {
    // Only capture the date, not the time
    const selectedDate = new Date(selectInfo.start)
    selectedDate.setHours(0, 0, 0, 0)
    setSelectedDate(selectedDate)
    setSelectedSlot(null)
  }

  const handleSlotSelect = (slot: { time: string; dateTime: Date }) => {
    setSelectedSlot(slot.time)
    // Update the selected date with the correct time
    const fullDateTime = new Date(slot.dateTime)
    setSelectedDate(fullDateTime)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { valid, errors } = validateForm(formData.nome, formData.cognome, formData.email, formData.telefono)

    if (!valid) {
      setErrors(errors)
      return
    }

    // If validation passes
    setErrors({})


    if (!selectedDate) {
      toast({
        title: "Errore",
        description: "Seleziona un orario e una data",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {

      // Calculate end time (based on slot duration)
      selectedDate.setMinutes(selectedDate.getMinutes() + SLOT_DURATION)
      const endTime = new Date(selectedDate)
      endTime.setMinutes(endTime.getMinutes() + SLOT_DURATION)

      // Create the booking
      await createBooking({
        ...formData,
        oraInizio: selectedDate,
        oraFine: endTime,
        giorno: selectedDate,
        stato: "in attesa",
      })



      // Immediately refresh the bookings list to update available slots
      await fetchBookings();

 
       await sendEmail(formData.email);


      toast({
        title: "Prenotazione inviata",
        description: "La tua prenotazione è avvenuta con successo!",
      })

      

      // Reset form
      setFormData({
        nome: "",
        email: "",
        telefono: "",
        cognome: "",
      })
      setSelectedDate(null)
      setSelectedSlot(null)

      router.push("/provacalendario")

    } catch (error) {
      toast({
        title: "Errore",
        description: "C'è stato un errore durante la fase di prenotazione. \n Verifica di aver inserito correttamente i dati di prenotazione.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  //verifica input
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  const isValidPhone = (phone: string): boolean => {
    // This regex allows various phone formats
    // It accepts formats like: +39 123 456 7890, 123-456-7890, (123) 456-7890, etc.
    const phoneRegex = /^(\+\d{1,3}\s?)?($$\d{1,4}$$\s?)?[\d\s-]{7,15}$/
    return phoneRegex.test(phone)
  }

 const validateForm = (
     nome: string,
     cognome:string,
     email: string,
     telefono: string,
   ): { valid: boolean; errors: { nome?: string; cognome?: string;email?: string; telefono?: string } } => {
     const errors: { nome?: string; cognome?: string;email?: string; telefono?: string } = {}
     let valid = true
   
     // Check if fields are empty
     if (!nome.trim()) {
       errors.nome = "Il nome è obbligatorio"
       valid = false
     }
 
     if (!cognome.trim()) {
       errors.cognome = "Il cognome è obbligatorio"
       valid = false
     }
   
     if (!email.trim()) {
       errors.email = "L'email è obbligatoria"
       valid = false
     } else if (!isValidEmail(email)) {
       errors.email = "Inserisci un indirizzo email valido"
       valid = false
     }
   
     if (!telefono.trim()) {
       errors.telefono = "Il numero di telefono è obbligatorio"
       valid = false
     } else if(telefono.length!==10){
      errors.telefono = "Inserisci un numero di telefono valido"
       valid = false
     }else if (!isValidPhone(telefono)) {
       errors.telefono = "Inserisci un numero di telefono valido"
       valid = false
     }
   
     return { valid, errors }
   }

  return (
    <div className=" py-8 mx-auto">

      <h1 className="text-3xl font-bold mb-8">Prenotazione</h1>

      {/* Selected time display above calendar */}
      {selectedDate && selectedSlot && (
        <div className="mb-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center">
                <CalendarClock className="h-6 w-6 mr-3 text-primary" />
                <div>
                  <h3 className="text-lg font-medium">Seleziona appuntamento</h3>
                  <p className="text-muted-foreground">
                    {selectedDate.toLocaleDateString()} alle {selectedSlot}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Seleziona data e ora</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[600px] ">
              <FullCalendar
                buttonText={{
                  today:"Oggi",
                  month:"Mese",
                  week:"Settimana",
                  day:"Giorno"
                }}
                locale={"it"}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "prev,next",
                  center: "title",
                  right: "today",
                }}
                longPressDelay={50}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                expandRows={false}
                select={handleDateSelect}
                height="100%"
                selectAllow={(selectInfo) => {
                  // Only allow selecting future dates and not Sundays
                  const date = new Date(selectInfo.start)
                  return date >= new Date() && date.getDay() !== 0
                }}
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

            {selectedDate && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">
                  Orari disponibili nel giorno {selectedDate.toLocaleDateString()}
                </h3>
                {selectedDate && selectedDate.getDay() === 0 && (
                  <div className="mt-6">
                    <p className="text-red-500 font-medium">La domenica non sono disponibili prenotazioni.</p>
                  </div>
                )}

                {selectedDate && selectedDate.getDay() !== 0 && availableSlots.length === 0 && (
                  <div className="mt-6">
                    <p className="text-muted-foreground">Non ci sono slot disponibili per questa data.</p>
                  </div>
                )}
                {availableSlots.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {availableSlots.map((slot, index) => (
                      <Button
                        key={index}
                        variant={selectedSlot === slot.time ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => handleSlotSelect(slot)}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Only show booking details form after a time slot is selected */}
        {selectedDate && selectedSlot && (
          <Card>
            <CardHeader>
              <CardTitle>Riepilogo prenotazione</CardTitle>
              <CardDescription>Completa i campi per confermare la prenotazione</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">nome</Label>
                  <Input
                    id="nome"
                    name="nome"
                    placeholder="Edy"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    className={errors.nome ? "border-red-500" : ""}
                  />
                  {errors.nome && (
                    <p className="text-sm text-red-500 flex items-center mt-1">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.nome}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Cognome</Label>
                  <Input
                    id="cognome"
                    name="cognome"
                    placeholder="Basso"
                    value={formData.cognome}
                    onChange={handleInputChange}
                    required
                    className={errors.cognome ? "border-red-500" : ""}
                  />
                  {errors.cognome && (
                    <p className="text-sm text-red-500 flex items-center mt-1">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.cognome}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="studioedybasso@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 flex items-center mt-1">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Numero di telefono</Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    placeholder="123 456 7890"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                    className={errors.telefono ? "border-red-500" : ""}
                    />
                    {errors.telefono && (
                      <p className="text-sm text-red-500 flex items-center mt-1">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.telefono}
                      </p>
                    )}
                </div>

                
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Caricamento..." : "Invia prenotazione"}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
      <Toaster />
    </div>
  )
}


