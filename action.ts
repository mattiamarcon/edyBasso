'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { supabaseServer } from '@/utils/supabase/server'
import { supabaseClient } from '@/utils/supabase/client'

const dbServer = await supabaseServer();
const dbClient = supabaseClient();



export type FormState={
  messaggio:string,
  error?: string
}


export async function login( stato:FormState, formData: FormData) {

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await dbServer.auth.signInWithPassword(data)

  if (error) {
    return {message:"",error:"Credenziali errate"}
  }

  revalidatePath('/')
  redirect("/")
}




