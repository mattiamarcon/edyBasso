"use client"

import { Button } from '@/components/ui/button'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

export default function ProvocativeCTA() {
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimation()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 1.5, ease: "easeOut" }
          })
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [controls])

  return (
    <section ref={sectionRef} className="bg-white text-black pb-20 px-4 sm:px-6 lg:px-8 relative ">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Pronto a iniziare il tuo percorso di benessere?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Metto a disposizione la mia esperienza e formazione per aiutarti a raggiungere i tuoi obiettivi di salute e
          benessere.
        </p>
        <Button size="lg">
          <Link href="/prenota">Prenota ora</Link>
        </Button>
        </motion.div>
      </div>
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.2 : 0.1 }}
        transition={{ duration: 0.1 }}
      >
      </motion.div>
    </section>
  )
}

