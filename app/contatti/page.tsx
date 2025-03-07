import { Mail, MapPin, Phone } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="container py-12">
      <h1 className="mb-8 text-center text-4xl font-bold">Contatti</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informazioni di Contatto</CardTitle>
              <CardDescription>Tutti i modi per raggiungermi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5" />
                <div>
                  <p className="font-medium">Telefono</p>
                  <a href="tel:+393791664060" className="text-muted-foreground hover:underline">
                    +39 379 1664060
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5" />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:contatti@edybassostudio.com"
                    className="text-muted-foreground hover:underline"
                  >
                    contatti@edybassostudio.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5" />
                <div>
                  <p className="font-medium">Indirizzo</p>
                  <a className="text-muted-foreground" href='https://maps.app.goo.gl/8DsmymjMLr2vee5t7'>Via S. Pellico, 5, Fontanafredda PN</a>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Orari di Apertura</CardTitle>
              <CardDescription>Quando puoi trovarmi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Lunedì - Sabato</span>
                  <span>Su appuntamento</span>
                </div>
                <div className="flex justify-between">
                  <span>Domenica</span>
                  <span>Chiuso</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="h-[600px] overflow-hidden rounded-lg border">
        <iframe src="https://www.google.com/maps/embed?pb=!4v1734079183759!6m8!1m7!1srnAQK-rEvR6BPBm4Y8YZVQ!2m2!1d45.97698820354039!2d12.57765739837811!3f91.55472498290331!4f-28.84591649968469!5f0.7820865974627469"  width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
        </iframe>
        </div>
      </div>
    </div>
  )
}


