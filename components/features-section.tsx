import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Ticket, CreditCard, Zap } from "lucide-react"

const features = [
  {
    icon: MapPin,
    title: "Localisez les stations disponibles",
    description: "Trouvez en temps réel les stations-service avec du carburant disponible près de vous.",
  },
  {
    icon: Ticket,
    title: "Réservez votre ticket en ligne",
    description: "Réservez votre place dans la file d&apos;attente directement depuis l&apos;application.",
  },
  {
    icon: CreditCard,
    title: "Payez facilement avec Orange Money",
    description: "Paiement sécurisé et instantané via Orange Money, sans contact.",
  },
  {
    icon: Zap,
    title: "Évitez les files et gagnez du temps",
    description: "Plus besoin d'attendre des heures. Arrivez et servez-vous directement.",
  },
]

export function FeaturesSection() {
  return (
    <section id="fonctionnalites" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Pourquoi choisir <span className="text-primary">JigiFuel</span> ?
          </h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Une solution complète pour simplifier votre expérience d&apos;achat de carburant à Bamako.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-pretty">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
