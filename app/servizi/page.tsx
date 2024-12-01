import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesPage() {
  const services = [
    {
      id: "massaggio-sportivo",
      title: "Massaggio Sportivo",
      description: "Il massaggio sportivo è un trattamento specifico che aiuta gli atleti e gli sportivi a migliorare le prestazioni e recuperare dopo l'attività fisica.",
      benefits: [
        "Migliora la circolazione sanguigna",
        "Riduce il rischio di infortuni",
        "Accelera il recupero muscolare",
        "Aumenta la flessibilità",
      ],
      image: "/vercel.svg",
      duration: "60 minuti",
    },
    {
      id: "massaggio-decontratturante",
      title: "Massaggio Decontratturante",
      description: "Trattamento specifico per alleviare tensioni e contratture muscolari, particolarmente efficace per chi soffre di dolori muscolari cronici.",
      benefits: [
        "Riduce le contratture muscolari",
        "Allevia il dolore",
        "Migliora la mobilità",
        "Rilassa la muscolatura",
      ],
      image: "/next.svg",
      duration: "50 minuti",
    },
    {
      id: "massaggio-miofasciale",
      title: "Massaggio Miofasciale",
      description: "Tecnica di massaggio che lavora sui tessuti connettivi per migliorare la mobilità e ridurre il dolore.",
      benefits: [
        "Migliora la mobilità articolare",
        "Riduce le aderenze",
        "Allevia il dolore cronico",
        "Migliora la postura",
      ],
      image: "/globe.svg",
      duration: "60 minuti",
    },
    {
      id: "kinesio-taping",
      title: "Kinesio Taping",
      description: "Applicazione di nastri elastici sulla pelle per supportare i muscoli e le articolazioni mantenendo la libertà di movimento.",
      benefits: [
        "Supporta muscoli e articolazioni",
        "Riduce il dolore",
        "Migliora la circolazione",
        "Accelera il recupero",
      ],
      image: "/foto.png",
      duration: "30 minuti",
    },
    {
      id: "personal-training",
      title: "Personal Training",
      description: "Sessioni di allenamento personalizzate one-to-one per raggiungere i tuoi obiettivi di fitness e salute.",
      benefits: [
        "Programmi personalizzati",
        "Tecnica corretta",
        "Motivazione costante",
        "Risultati misurabili",
      ],
      image: "/placeholder.svg?height=400&width=600",
      duration: "60 minuti",
    },
    {
      id: "crioterapia",
      title: "Crioterapia",
      description: "Terapia del freddo per il recupero muscolare e il benessere generale.",
      benefits: [
        "Riduce l'infiammazione",
        "Accelera il recupero",
        "Migliora la circolazione",
        "Riduce il dolore",
      ],
      image: "/placeholder.svg?height=400&width=600",
      duration: "20 minuti",
    },
  ]

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-center text-4xl font-bold">I Nostri Servizi</h1>
      <div className="space-y-12">
        {services.map((service) => (
          <Card key={service.id} id={service.id} className="overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h3 className="mb-2 font-semibold">Benefici:</h3>
                    <ul className="list-inside list-disc space-y-1">
                      {service.benefits.map((benefit) => (
                        <li key={benefit}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">Durata: {service.duration}</p>
                  </div>
                  <Button asChild>
                    <Link href="/prenota">Prenota</Link>
                  </Button>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

