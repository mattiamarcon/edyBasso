"use client"

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

import { supabaseClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

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
  },[dbClient])



  
  return (
    <>
      {testimonials.length > 0 ? (
        <AnimatedTestimonials testimonials={testimonials} />
      ) : (
        <div>Nessun servizio attivo al momento</div>
      )}
    </>
  )
}

