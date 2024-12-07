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
              <CardDescription>Tutti i modi per raggiungerci</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5" />
                <div>
                  <p className="font-medium">Telefono</p>
                  <a href="tel:+390123456789" className="text-muted-foreground hover:underline">
                    +39 012 345 6789
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5" />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:info@studiobenessere.it"
                    className="text-muted-foreground hover:underline"
                  >
                    info@studiobenessere.it
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5" />
                <div>
                  <p className="font-medium">Indirizzo</p>
                  <p className="text-muted-foreground">Via Roma 123, Milano</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Orari di Apertura</CardTitle>
              <CardDescription>Quando puoi trovarci</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Lunedì - Venerdì</span>
                  <span>9:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabato</span>
                  <span>9:00 - 17:00</span>
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
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d980.6541160331517!2d12.617482128327023!3d45.957102836520804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47796526bbe5427b%3A0xa3ed322e3c077e74!2sBellini%20Bar%20Porcia!5e0!3m2!1sit!2sit!4v1733433589540!5m2!1sit!2sit"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  )
}

