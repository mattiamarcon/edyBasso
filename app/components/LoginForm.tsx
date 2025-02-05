"use client"

import { FormState, login } from '@/action'
 import { Button } from "@/components/ui/button"
 import { Input } from "@/components/ui/input"
 import { Label } from "@/components/ui/label"
import { useFormState } from 'react-dom'

export default function LoginForm() {

  const [state,formState] = useFormState(login,{message:""})

  return (
    <form className="space-y-6" action={formState}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name='email' placeholder="La tua email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name='password' type="password" placeholder="La tua password" required />
      </div>
      <Button className="w-full" type='submit'>
        Accedi
      </Button>
      <div className='text-red-500'>{state.message}</div>
    </form>
  )
}
