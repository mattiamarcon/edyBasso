export default function BookingPage() {
    return (
      <div className="container py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-center text-4xl font-bold">Prenota una Sessione</h1>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <p className="mb-4 text-center text-muted-foreground">
                Seleziona il servizio e l'orario che preferisci dal calendario sottostante.
              </p>
              <iframe
                src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID&mode=WEEK"
                className="h-[600px] w-full rounded-md border"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  