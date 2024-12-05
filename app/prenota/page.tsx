export default function BookingPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <h1 className="mb-6 text-center text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
          Prenota una Sessione
        </h1>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-4 sm:p-6 md:p-8">
            <p className="mb-4 text-center text-sm text-muted-foreground sm:text-base md:text-lg lg:text-xl">
              Seleziona il servizio e l&apos;orario che preferisci dal calendario sottostante.
            </p>
            <div className="w-full overflow-hidden rounded-md border">
              <iframe
                src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID&mode=WEEK"
                className="h-[400px] w-full sm:h-[500px] md:h-[600px] lg:h-[700px]"
                title="Calendario prenotazioni"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
  
  