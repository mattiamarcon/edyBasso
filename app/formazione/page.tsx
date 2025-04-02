"use client"

import { useEffect, useRef } from "react"
import TimelineItem from "@/app/components/timeline-item"

export default function TimelinePage() {
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0")
            entry.target.classList.remove("opacity-0", "translate-y-10")
          } else {
            entry.target.classList.remove("opacity-100", "translate-y-0")
            entry.target.classList.add("opacity-0", "translate-y-10")
          }
        })
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    )

    const timelineItems = document.querySelectorAll(".timeline-item")
    timelineItems.forEach((item) => {
      observer.observe(item)
    })

    return () => {
      timelineItems.forEach((item) => {
        observer.unobserve(item)
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-slate-800">Il mio percorso</h1>

        <div ref={timelineRef} className="relative">
          {/* Line connecting timeline items */}
          <div className="absolute left-4 sm:left-1/2 h-full w-0.5 bg-slate-300 transform -translate-x-1/2"></div>

          <TimelineItem
            date="2021 - Oggi"
            title="Laurea in Scienze e Tecniche delle Attività Motorie Preventive e Adattate"
            place="Università San Raffaele – Milano (MI)"
            description="Svolgimento del secondo anno accademico"
            position="right"
          />

          <TimelineItem
            date="2020"
            title="Attestato in 'Tecniche del massaggio di base'"
            place="Scuola del Massaggio – Pordenone (PN)"
            description="Conoscenza delle tecniche di massaggio olistico: rilassante, decontratturante, sportivo e drenante."
            position="left"
          />

          <TimelineItem
            date="2019"
            title="Attestato 'Istruttore di Fitness e Bodybuilding'"
            place="Non Solo Fitness - Torino (TO)"
            description="Corso con Attestato e Riconoscimento CONI."
            position="right"
          />

          <TimelineItem
            date="2019"
            title="Corso con Attestato 'Ginnastica per tutti'"
            place="Libertas - Pordenone (PN)"
            description="Corso con Attestato e Riconoscimento Libertas."
            position="left"
          />

          <TimelineItem
            date="2019 - Rinnovato nel 2021"
            title="Corso con Attestato 'BLSD' sulla sicurezza"
            place="IRC - Pordenone (PN)"
            description="Corso con Attestato e Riconoscimento IRC sulla sicurezza, per l'utilizzo di defibrillatore e procedura per la rianimazione."
            position="right"
          />

          <TimelineItem
            date="2018 - 2021"
            title="Laurea in Scienze Motorie"
            place="Università telematica Pegaso – Conegliano (TV)"
            description="Corso di laurea triennale in Scienze Motorie."
            position="left"
          />

        </div>
      </div>
    </div>
  )
}





