"use client"

import { motion, useAnimation } from 'framer-motion'
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
    <section ref={sectionRef} className="bg-white text-black py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
            Non rimanere col dubbio 
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl mb-8 text-gray-600">
            La tua trasformazione inizia con un tocco. Sei pronto a sfidare i tuoi limiti?
          </p>
          <motion.a
            className="bg-black text-white text-lg sm:text-xl font-bold py-4 px-8 rounded-full hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            href='/prenota'
          >
            Inizia Ora
          </motion.a>
        </motion.div>
      </div>
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.2 : 0.1 }}
        transition={{ duration: 0.1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-400 opacity-75"></div>
        <img
          src="/placeholder.svg?height=1080&width=1920"
          alt="Background"
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </motion.div>
    </section>
  )
}

