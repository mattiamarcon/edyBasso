"use client"

import { AlertCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { createBooking } from "@/action"


type BookingFormData = {
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
}

export default function BookingButton({fetchBookings} : {fetchBookings:()=>Promise<void>}) {

    const [open,setOpen] = useState(false);

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        telefono: "",
        cognome: "",
      })

    const [errors, setErrors] = useState<{ nome?: string; cognome?: string;email?: string; telefono?: string }>({})

    const [selectedDay, setSelectedDay] = useState<string>("")
    const [selectedStart, setSelectedStart] = useState<string>("")
    const [selectedEnd, setSelectedEnd] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent) => {

        console.log("click")
        e.preventDefault()
    
        const { valid, errors } = validateForm(formData.nome, formData.cognome, formData.email, formData.telefono)
    
        if (!valid) {
          setErrors(errors)
          return
        }
    
        // If validation passes
        setErrors({})
    
    
        if (!selectedStart) {
          toast({
            title: "Errore",
            description: "Seleziona un orario e una data",
            variant: "destructive",
          })
          return
        }
    
        try {
            console.log(selectedDay+"T"+selectedStart)
            const dateStart= new Date(selectedDay+"T"+selectedStart)
            const dateEnd= new Date(selectedDay+"T"+selectedEnd)

            dateStart.setHours(dateStart.getHours()+1)
            dateEnd.setHours(dateEnd.getHours()+1)
    
          //Create the booking
          await createBooking({
            ...formData,
            oraInizio: dateStart,
            oraFine: dateEnd,
            giorno: dateStart,
            stato: "confermata",
          })  
          // Immediately refresh the bookings list to update available slots
           await fetchBookings(); 
    
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

          setSelectedDay("")
          setSelectedStart("")
          setSelectedEnd("")
    
    
        } catch (error) {
          toast({
            title: "Errore",
            description: "C'è stato un errore durante la fase di prenotazione. \n Verifica di aver inserito correttamente i dati di prenotazione.",
            variant: "destructive",
          })
        } finally {
        }
      }

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

       const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
           const { name, value } = e.target
           setFormData((prev) => ({ ...prev, [name]: value }))
         }
    

    return (
        <>
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Button onClick={()=>setOpen(!open)} className="fixed bottom-6 right-6 h-14 w-14 rounded-full p-0 shadow-lg z-50">
                <Plus className="h-6 w-6" />
                <span className="sr-only">Aggiungi prenotazione</span>
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
            <DialogTitle>Inserisci informazioni</DialogTitle>
            </DialogHeader>
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

                    <div className="grid grid-cols-2 gap-4 items-center">
                        <Label htmlFor="day" className="text-left">
                            Ora inizio
                        </Label>
                        <Input
                            id="day"
                            type="date"
                            value={selectedDay}
                            onChange={(e) => setSelectedDay(e.target.value)}
                            className="col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 items-center">
                        <Label htmlFor="startTime" className="text-left">
                            Ora inizio
                        </Label>
                        <Input
                            id="startTime"
                            type="time"
                            value={selectedStart}
                            onChange={(e) => setSelectedStart(e.target.value)}
                            className="col-span-3"
                        />
                    </div>

                        <div className="grid grid-cols-2 items-center gap-4">
                        <Label htmlFor="endTime" className="text-left">
                            Ora fine
                        </Label>
                        <Input
                            id="endTime"
                            type="time"
                            value={selectedEnd}
                            onChange={(e) => setSelectedEnd(e.target.value)}
                            className="col-span-3"
                        />
                    </div>   
                    <DialogFooter className="flex justify-between sm:justify-between">
                        <Button variant="outline" onClick={() => setOpen(false)} className="mt-3">
                            Chiudi
                        </Button>
                        <Button type="submit" onClick={() => setOpen(false)}>Inserisci</Button>
                        </DialogFooter>
                </form>
        </DialogContent>
        </Dialog>
        
        </>
    )
}

