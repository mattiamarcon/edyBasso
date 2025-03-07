"use client"

import { useTransition } from "react"
import { login } from "@/action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState } from "react-dom"
import { Loader2 } from "lucide-react"

export default function LoginForm() {
  const [state, formAction] = useFormState(login, { message: "" })
  const [isPending, startTransition] = useTransition()

  // Create a wrapper function that uses useTransition
  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      formAction(formData)
    })
  }

  return (
    <form className="space-y-6" action={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" placeholder="La tua email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" placeholder="La tua password" required />
      </div>
      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Accesso in corso...
          </>
        ) : (
          "Accedi"
        )}
      </Button>
      {state.message && <div className="text-red-500">{state.message}</div>}
    </form>
  )
}


