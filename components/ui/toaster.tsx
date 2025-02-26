"use client"

import { useToast } from "./use-toast"
import { useEffect, useState } from "react"
import { X } from "lucide-react"

export function Toaster() {
  const { toasts, setToasts } = useToast()

  return (
    <div className="fixed top-0 right-0 z-50 p-4 space-y-4 w-full max-w-xs">
      {toasts.map((toast, index) => (
        <Toast
          key={index}
          {...toast}
          onClose={() => {
            setToasts((prev) => prev.filter((_, i) => i !== index))
          }}
        />
      ))}
    </div>
  )
}

function Toast({
  title,
  description,
  variant = "default",
  onClose,
}: {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  onClose: () => void
}) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`
        ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}
        transform transition-all duration-300 ease-in-out
        rounded-lg border p-4 shadow-md my-16
        ${variant === "destructive" ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}
      `}
    >
      <div className="flex justify-between items-start">
        <div>
          {title && (
            <h3 className={`font-medium ${variant === "destructive" ? "text-red-800" : "text-gray-900"}`}>{title}</h3>
          )}
          {description && (
            <p className={`mt-1 text-sm ${variant === "destructive" ? "text-red-700" : "text-gray-500"}`}>
              {description}
            </p>
          )}
        </div>
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          className={`ml-4 inline-flex shrink-0 rounded-md p-1 ${
            variant === "destructive" ? "text-red-600 hover:bg-red-100" : "text-gray-400 hover:bg-gray-100"
          }`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

