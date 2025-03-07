import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function FormazionePage() {
  return (
    <main className="container mx-auto py-12 px-4 md:px-6">
      
      <h1 className="mb-8 text-center text-4xl font-bold">Formazione</h1>

      {/* Timeline */}
      <div className="relative border-l border-black pl-6 ml-6 md:ml-12 space-y-20 mt-16">
        {/* Timeline Item 1 */}
        <div className="relative">
          {/* Timeline dot */}
          <div className="absolute w-4 h-4 bg-primary rounded-full -left-[34px]"></div>

          {/* Year badge */}
          <div className="inline-block rounded-full bg-muted px-3 py-1 text-xl font-bold mb-4">2015</div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
              <Image
                src="/broski.jpg"
                alt="Laurea in Scienze Motorie"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4">Laurea in Scienze Motorie</h2>
              <p className="text-muted-foreground">
                Ho conseguito la laurea in Scienze Motorie presso l'Università di [Nome Università], acquisendo solide
                basi teoriche e pratiche sulla biomeccanica, fisiologia dell'esercizio e metodologie di allenamento
                personalizzato.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 2 */}
        <div className="relative">
          {/* Timeline dot */}
          <div className="absolute w-4 h-4 bg-primary rounded-full -left-[34px]"></div>

          {/* Year badge */}
          <div className="inline-block rounded-full bg-muted px-3 py-1 text-xl font-bold mb-4">2017</div>

          <div className="grid md:grid-cols-2 gap-8 md:flex-row-reverse">
            <div className="order-1 md:order-2">
              <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
                <Image
                  src="/palestra.jpg"
                  alt="Certificazione in Massoterapia"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-2 md:order-1 flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4">Certificazione in Massoterapia</h2>
              <p className="text-muted-foreground">
                Ho completato un corso professionale di massoterapia, specializzandomi in diverse tecniche di massaggio
                terapeutico, decontratturante e sportivo. Questa formazione mi ha permesso di integrare le competenze
                motorie con quelle manuali.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 3 */}
        <div className="relative">
          {/* Timeline dot */}
          <div className="absolute w-4 h-4 bg-primary rounded-full -left-[34px]"></div>

          {/* Year badge */}
          <div className="inline-block rounded-full bg-muted px-3 py-1 text-xl font-bold mb-4">2019</div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
              <Image
                src="/laurea.jpg"
                alt="Specializzazione in Chinesiologia"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4">Specializzazione in Chinesiologia</h2>
              <p className="text-muted-foreground">
                Ho approfondito lo studio della chinesiologia, concentrandomi sull'analisi del movimento e sulla
                rieducazione posturale. Questa specializzazione mi ha fornito strumenti avanzati per valutare e
                correggere problemi posturali e funzionali.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 4 */}
        <div className="relative">
          {/* Timeline dot */}
          <div className="absolute w-4 h-4 bg-primary rounded-full -left-[34px]"></div>

          {/* Year badge */}
          <div className="inline-block rounded-full bg-muted px-3 py-1 text-xl font-bold mb-4">2021</div>

          <div className="grid md:grid-cols-2 gap-8 md:flex-row-reverse">
            <div className="order-1 md:order-2">
              <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
                <Image
                  src="/corva.png"
                  alt="Certificazione Personal Trainer"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-2 md:order-1 flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4">Certificazione Personal Trainer</h2>
              <p className="text-muted-foreground">
                Ho ottenuto la certificazione come Personal Trainer da [Nome Ente], perfezionando le mie competenze
                nella programmazione di allenamenti personalizzati e nella gestione di clienti con diverse esigenze e
                obiettivi.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 5 */}
        <div className="relative">
          {/* Timeline dot */}
          <div className="absolute w-4 h-4 bg-primary rounded-full -left-[34px]"></div>

          {/* Year badge */}
          <div className="inline-block rounded-full bg-muted px-3 py-1 text-xl font-bold mb-4">2023</div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
              <Image
                src="/personalTrainer.jpg"
                alt="Formazione continua"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4">Formazione continua</h2>
              <p className="text-muted-foreground">
                Continuo ad aggiornarmi partecipando a workshop, seminari e corsi di specializzazione per rimanere al
                passo con le più recenti scoperte scientifiche e metodologie nel campo del benessere fisico e della
                riabilitazione.
              </p>
            </div>
          </div>
        </div>
      </div>

     

      {/* Call to action */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Pronto a iniziare il tuo percorso di benessere?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Metto a disposizione la mia esperienza e formazione per aiutarti a raggiungere i tuoi obiettivi di salute e
          benessere.
        </p>
        <Button size="lg">
          <Link href="/prenota">Prenota ora</Link>
        </Button>
      </div>
    </main>
  )
}

