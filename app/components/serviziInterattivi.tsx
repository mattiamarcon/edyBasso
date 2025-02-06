"use client"

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

import { supabaseClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Image from "next/image";


type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export function ServiziIterattivi() {

  const dbClient=supabaseClient();

  const [testimonials,setTestimonials] = useState<Testimonial[]>([])

  useEffect(()=>{
    async function getServizi(){
      const {data} = await dbClient.from("servizi").select();
      
      if(data){
        const serviziFormattati = data.map((servizio) => ({
          name: servizio.titolo,
          src: servizio.immagine,
          designation: servizio.durata,
          quote: servizio.descrizione,
        }))

        setTestimonials(serviziFormattati)
        setTestimonials(serviziFormattati)
      }
    }
    getServizi();
  },[])

  return (
    <>
      {testimonials.length > 0 ? (
        <AnimatedTestimonials testimonials={testimonials} />
      ) : (
        <Image src={"loading.svg"} alt="Nessun servizio disponibile" width={150} height={150} className="mx-auto" />
      )}
    </>
  )
}

