"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { supabaseClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function ServiceForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState("")
  const [image, setImage] = useState<File | null | undefined>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [succed,setSucced] = useState<string>("");
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  

  const dbClient=supabaseClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSucced("");

    try {
      // Validazione
      if (!title || !description || !duration || !image) {
        throw new Error("Tutti i campi sono obbligatori")
      }

      // Carica l'immagine
      const { data: imageData, error: imageError } = await dbClient.storage
        .from("Immagini")
        .upload(`${image.name}`, image)

      if (imageError) {
        throw new Error("Errore nel caricamento dell'immagine")
      }

      // Ottieni l'URL pubblico dell'immagine
      const {
        data: { publicUrl },
      } = dbClient.storage.from("Immagini").getPublicUrl(imageData.path)

      // Inserisci il servizio nel database
      const { error } = await dbClient.from("servizi").insert({
        titolo:title,
        descrizione:description,
        durata: duration,
        immagine: publicUrl,
      })

      if (error) {
        throw new Error("Errore nell'inserimento del servizio")
      }

      setSucced("Inserimento avvenuto con successo")
      setTitle("")
      setDescription("")
      setDuration("")
      setImage(null)

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
      setSelectedImage(null)

      // Reindirizza alla pagina dei servizi o mostra un messaggio di successo
      router.push("/servizi/aggiungi-servizio")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Si è verificato un errore")
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImage(file)
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
    } else {
      setImage(null)
      setSelectedImage(null)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Titolo</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="description">Descrizione</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="duration">Durata</Label>
        <Input id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="image">Seleziona immagine </Label>
        <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            required
            className="hidden"
        />
        <Button type="button" onClick={() => fileInputRef.current?.click()} variant="outline">
            Seleziona
        </Button>      
      </div>
      {selectedImage && (
        <div className="mt-4">
          <Image
            src={selectedImage}
            alt="Preview"
            width={200}
            height={200}
            className="rounded-lg object-cover"
          />
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Inserimento in corso..." : "Inserisci Servizio"}
      </Button>
      <p className="text-green-600">{succed}</p>
    </form>
  )
}