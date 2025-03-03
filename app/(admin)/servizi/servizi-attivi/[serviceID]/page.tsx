"use client"

import { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/navigation"
import { supabaseClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from "next/image"

interface servizio{
  id:number
  titolo:string,
  immagine:string,
  durata:string,
  descrizione:string
}

function ModificaServizio({
    params,
}:{
    params:Promise<{serviceID:number}>
}) {

  const [oldTitle, setOldTitle] = useState("")

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState("")

  const [image, setImage] = useState<File | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [serviceID,setServiceID]= useState<number>(0);

  const dbClient=supabaseClient();

  useEffect(()=>{
    async function getServiceID(){
      const serviceID= (await params).serviceID;
      
      setServiceID(serviceID)
    }
    getServiceID();
  },[])

  useEffect(()=>{
    async function getElement() {
      const {data} = await dbClient.from("servizi").select().eq("id",serviceID)

      if(data){
        setOldTitle(data[0].titolo)
        setTitle(data[0].titolo)
        setDescription(data[0].descrizione)
        setDuration(data[0].durata)

        const {data:imageData,error} = await dbClient.storage
        .from('Immagini')
        .download(data[0].titolo)

        if(imageData){
          setImage(new File([imageData], "file"))      
        }
          
        setSelectedImage(data[0].immagine)
        
      }
    }

    getElement();
  },[serviceID])
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsLoading(true)
      setError(null)
  
      try {
        // Validazione
        if (!title || !description || !duration || !image) {
          throw new Error("Tutti i campi sono obbligatori")
        }

        //Carica l'immagine
        const { data: removeImageData, error: removeImageError } = await dbClient.storage
          .from("Immagini")
          .remove([oldTitle])

        const { data: imageData, error: imageError } = await dbClient.storage
          .from("Immagini")
          .upload(title, image)

  
        if (imageError) {
          throw new Error("Errore nel caricamento dell'immagine")
        }
  
        // Ottieni l'URL pubblico dell'immagine
        const {
          data: { publicUrl },
        } = dbClient.storage.from("Immagini").getPublicUrl(imageData.path)
  
        // Inserisci il servizio nel database
        const { error } = await dbClient.from("servizi").update({
          titolo:title,
          descrizione:description,
          durata: duration,
          immagine: publicUrl,
        })
        .eq("id", serviceID)
  
        if (error) {
          throw new Error("Errore nell'inserimento del servizio")
        }
  
        // Reindirizza alla pagina dei servizi o mostra un messaggio di successo
        router.push("/admin/servizi/servizi-attivi")
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
      </form>
    )
}

export default ModificaServizio