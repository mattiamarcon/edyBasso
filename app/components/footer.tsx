import { MapPin, Phone, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto max-w-7xl grid gap-8 py-10 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h3 className="mb-4 text-lg font-semibold">Contatti</h3>
          <div className="space-y-3">
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a href="tel:+393791664060" className="hover:underline">+39 379 1664060</a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:contatti@edybassostudio.com" className="hover:underline">
                contatti@edybassostudio.com
              </a>
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Via S. Pellico, 5, Fontanafredda PN
            </p>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Orari</h3>
          <div className="space-y-2">
            <p>Lunedì - Sabato: Su appuntamento</p>
            <p>Domenica: Chiuso</p>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto max-w-7xl py-6 px-4 text-center text-sm md:px-6 lg:px-8">
          <p>P.IVA 01968600930</p> 
          <p>© {new Date().getFullYear()} Edy Basso Studio. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  )
}

