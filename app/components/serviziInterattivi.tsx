"use client"

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function ServiziIterattivi() {
  const testimonials = [
    {
      quote:
        "Terapia del freddo per il recupero muscolare e il benessere generale.",
      name: "Crioterapia",
      src: "/crioterapia.jpeg",
      designation: "Durata: 20 minuti",
    },
    {
      quote:
        "Applicazione di nastri elastici sulla pelle per supportare i muscoli e le articolazioni mantenendo la libertà di movimento.",
      name: "Kinesio Taping",
      src: "/kTaping.jpg",
      designation: "Durata: 30 minuti",
    },
    {
      quote:
        "Trattamento specifico per alleviare tensioni e contratture muscolari, particolarmente efficace per chi soffre di dolori muscolari cronici.",
      name: "Massaggio Decontratturante",
      src: "/mDecontretturante.png",
      designation: "Durata: 50 minuti",
    },
    {
      quote:
        "Tecnica di massaggio che lavora sui tessuti connettivi per migliorare la mobilità e ridurre il dolore.",
      name: "Massaggio Miofasciale",
      src: "/mMiofasciale.jpeg",
      designation: "Durata: 60 minuti",
    },
    {
      quote:
        "Il massaggio sportivo è un trattamento specifico che aiuta gli atleti e gli sportivi a migliorare le prestazioni e recuperare dopo l'attività fisica.",
      name: "Massaggio Sportivo",
      src: "/mSportivo.png",
      designation: "Durata: 60 minuti",
    },
    {
        quote:
        "Sessioni di allenamento personalizzate one-to-one per raggiungere i tuoi obiettivi di fitness e salute.",
        name: "Personal Training",
        src: "/personalTrainer.jpg",
        designation: "Durata: 60 minuti",
      },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
