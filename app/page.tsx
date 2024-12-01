import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Users, Dumbbell, Waves, LigatureIcon as Bandage, Snowflake } from 'lucide-react'
import TypeWriter from "./components/TypeWriter"
import { ServiziCarosello } from "./components/serviziCarosello"


export default function Home() {
  const services = [
    {
      title: "Massaggio Sportivo",
      description: "Trattamento specifico per atleti e sportivi",
      icon: Activity,
    },
    {
      title: "Massaggio Decontratturante",
      description: "Allevia tensioni e contratture muscolari",
      icon: Users,
    },
    {
      title: "Massaggio Miofasciale",
      description: "Trattamento dei tessuti connettivi",
      icon: Waves,
    },
    {
      title: "Kinesio Taping",
      description: "Supporto e stabilità muscolare",
      icon: Bandage,
    },
    {
      title: "Personal Training",
      description: "Allenamenti personalizzati one-to-one",
      icon: Dumbbell,
    },
    {
      title: "Crioterapia",
      description: "Terapia del freddo per recupero e benessere",
      icon: Snowflake,
    },
  ]

  return (
    <div className="space-y-16 md:space-y-24">
      <section className="relative bg-gray-100 py-16 px-4 md:py-24 md:px-6 lg:px-8">
        <div className="mx-auto w-fit">
          <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <div className="relative h-80 w-80 lg:h-96 lg:w-96 overflow-hidden rounded-full">
                <Image
                  src="/edyFoto.jpg"
                  alt="Edy Basso"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="text-center md:text-left md:flex-1">
              <h1 className="mb-4 text-4xl font-bold md:text-6xl">
                Edy Basso
              </h1>
              <p className="text-lg md:text-xl mb-6">
                <TypeWriter />
              </p>
              <Button size={"lg"}>
                <Link href="/prenota">Prenota una Sessione</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ServiziCarosello />


      <section className="bg-muted py-16 px-4 md:py-24 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Chi Sono</h2>
              <p className="text-lg">
                Professionista qualificato con anni di esperienza nel campo della chinesiologia,
                massoterapia e personal training. Mi dedico al benessere dei miei clienti attraverso
                un approccio personalizzato e olistico.
              </p>
              <Button asChild size="lg">
                <Link href="/contatti">Contattami</Link>
              </Button>
            </div>
            <div className="relative h-96 md:h-72 overflow-hidden rounded-lg ">
              <Image
                src="/edyFoto.jpg"
                alt="Professionista al lavoro"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

