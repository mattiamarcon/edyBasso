import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import TypeWriter from "./components/TypeWriter"
import { ServiziIterattivi } from "./components/serviziInterattivi"
import CtaSection from "./components/ctaSection"

export default function Home() {

  return (
    <div className="space-y-16 md:space-y-24">

    <section className="relative bg-gray-100 py-16 px-4 md:py-24 md:px-6 lg:px-8">
      <div className="mx-auto w-fit">
        <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between">
          <div className="mb-8 md:mb-0 md:mr-8">
            <div className="relative h-80 w-80 lg:h-96 lg:w-96 overflow-hidden rounded-full">
              <Image src="/edyFoto.jpg" alt="Edy Basso" fill className="object-cover" priority />
            </div>
          </div>
          <div className="text-center md:text-left md:flex-1">
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">Edy Basso</h1>
            <p className="text-lg md:text-xl mb-6">
              <TypeWriter />
            </p>
            <Button size={"lg"}>
              <Link href="/prenota">Prenota una Sessione</Link>
            </Button>
          </div>
        </div>

        <Image src="/logo.png" width={400} height={400} alt="Edy Basso studio" className="mx-auto my-5" />

        {/* Added formatted text with emphasis below both photo and button */}
        <div className="max-w-3xl mx-auto space-y-4 text-xl font-medium text-center">
          <p>
            Professionista laureato e qualificato.
          </p>

          <p>
            Mi dedico al benessere dei miei clienti offrendo percorsi personalizzati, con tecniche specifiche e consulenze mirate.
          </p>

          <p>
            Il mio obiettivo è migliorare la postura, la mobilità e il benessere generale di ogni persona.
          </p>

          {/* New button for the training journey */}
          <div className="flex justify-center mt-8">
            <Button size={"lg"}>
              <Link href="/formazione">La mia formazione</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

      <section className="flex flex-col">
        <h2 className="text-center text-4xl sm:text-5xl md:text-6xl font-extrabold mb-20">
            SERVIZI
        </h2>
        <ServiziIterattivi />
      </section>
      <CtaSection />
    </div>

    
  )
}

