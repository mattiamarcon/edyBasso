import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabaseClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ServiceForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [succed,setSucced] = useState<string>("");
  const router = useRouter()

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
        .upload(`${title}`, image)

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
      setDescription("")
      setImage(null)

      // Reindirizza alla pagina dei servizi o mostra un messaggio di successo
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Si è verificato un errore")
    } finally {
      setIsLoading(false)
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
        <Label htmlFor="duration">Durata (minuti)</Label>
        <Input id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="image">Immagine</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Inserimento in corso..." : "Inserisci Servizio"}
      </Button>
      <p className="text-green-600">{succed}</p>
    </form>
  )
}

