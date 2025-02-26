"use client"

// Simplified version of the shadcn/ui toast hook
import { useState, useEffect } from "react"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function toast(props: ToastProps) {
  const event = new CustomEvent("toast", { detail: props })
  document.dispatchEvent(event)
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  useEffect(() => {
    const handleToast = (event: Event) => {
      const customEvent = event as CustomEvent<ToastProps>
      setToasts((prev) => [...prev, customEvent.detail])
    }

    document.addEventListener("toast", handleToast)
    return () => {
      document.removeEventListener("toast", handleToast)
    }
  }, [])

  return { toasts, setToasts }
}

