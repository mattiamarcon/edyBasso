'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { supabaseServer } from '@/utils/supabase/server'
import { supabaseClient } from '@/utils/supabase/client'

import { Novu } from '@novu/api'; 
import { text } from 'stream/consumers'

const novu = new Novu({ 
  secretKey: process.env['NOVU_SECRET_KEY']
});


const dbServer = await supabaseServer();
const dbClient = supabaseClient();


export type FormState={
  message?:string
}

export async function login(state:FormState,formData:FormData) {
  const supabase = await supabaseServer();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }


  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return {message:"Credenziali errate"}
  }

  revalidatePath('/')
  redirect("/")
  
}

export async function getBookings() {
  try {
    const { data, error } = await dbClient.from("prenotazioni").select("*").order("oraInizio", { ascending: true })

    if (error) {
      console.error("Errore caricamento prenotazioni, ricarica:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Errore lettura prenotazioni:", error)
    return []
  }
}

// Create a new booking
export async function createBooking(bookingData: any) {

  try {
    const newBooking = {
      ...bookingData,
    }

    const { data, error } = await dbClient.from("prenotazioni").insert([newBooking]).select()

    if (error) {
      console.error("Errore creazioni appuntamento:", error)
      throw new Error("Errore creazioni appuntamento")
    }

    return data?.[0] || newBooking
  } catch (error) {
    console.error("Errore creazioni appuntamento:", error)
    throw new Error("Errore creazioni appuntamento")
  }
}

// Update booking status
export async function updateBookingStatus(bookingId: string, stato: string) {
  try {
    const { error } = await dbClient
      .from("prenotazioni")
      .update({
        stato,
      })
      .eq("id", bookingId)

    if (error) {
      console.error("Errore aggiornamento appuntamento:", error)
      throw new Error("Errore aggiornamento appuntamento")
    }

    return { success: true }
  } catch (error) {
    console.error("Errore aggiornamento appuntamento:", error)
    throw new Error("Errore aggiornamento appuntamento")
  }
}

export async function updateBookingTime(bookingId: string,giorno:Date, oraInizio: Date, oraFine: Date) {
  try {

    const { error } = await dbClient
      .from("prenotazioni")
      .update({
        giorno,
        oraInizio,
        oraFine,
      })
      .eq("id", bookingId)

    if (error) {
      console.error("Errore aggiornamento orari:", error)
      throw new Error("Errore aggiornamento orari")
    }

    return { success: true }
  } catch (error) {
    console.error("Errore aggiornamento orari:", error)
    throw new Error("Errore aggiornamento orari")
  }
}

export async function eliminaAppuntamento(bookingId: string) {
  try {
    const { error } = await dbClient
      .from("prenotazioni")
      .delete()
      .eq("id", bookingId)

    if (error) {
      console.error("Errore eliminazione:", error)
      throw new Error("Errore Eliminazione")
    }

    return { success: true }
  } catch (error:any) {
    console.error("Errore eliminazione:", error)
    throw new Error("Errore eliminazione:", error)
  }
}



export async function sendEmail(email:string){

  const iscritti=await novu.subscribers.search({
    email
  })

  if(iscritti.result.data.length!==0){
    novu.trigger({
      workflowId: 'edy-basso-client',
      to: {
        subscriberId: iscritti.result.data[0].subscriberId as string,
        email
      },
    });
  }else{
    novu.trigger({
      workflowId: 'edy-basso-client',
      to: {
        subscriberId: email,
        email,
      },
    });
  }

  novu.trigger({
    workflowId: 'edy-basso-server',
    to: {
      subscriberId: "1",
      email:"mattiamarcon05@gmail.com"
    },
  });
  
}









