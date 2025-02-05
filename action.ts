'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { supabaseServer } from '@/utils/supabase/server'
import { supabaseClient } from '@/utils/supabase/client'

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

  return {message:"ok"}

  // revalidatePath('/')
  // redirect("/")
  
}




