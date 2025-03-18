"use client";

import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = [
  {
    title: "Comment créer un compte?",
    content:
      "Sur la page d'accueil, cliquez sur 'S'inscrire', remplissez votre informations personnelles et continuez, puis un mail de vérification sera envoyé à votre e-mail, cliquez sur 'Valider' pour finir la création du compte.",
  },
  {
    title: "Comment réserver une réunion ?",
    content:
      "Après la connexion, allez au page RENDEZ-VOUS, ensuite vous pouvez choisir le campus, l'encadrant, la durée, la date et l'heure pour votre réunion.",
  },
  {
    title: "Comment changer mon mot de passe ?",
    content:
      "Cliquez sur '*MOT DE PASSE OUBLIÉ ?', entrez votre adresse e-mail d'inscription, puis un mail pour modifier le mot de passe sera envoyé à votre e-mail.",
  },
  {
    title: "Mes données sont-elles sécurisées ?",
    content:
      "Nous utilisons le chiffrement et l'authentification à deux facteurs pour garantir la sécurité de vos données.",
  },
];

export default function FAQSection() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4">
      <div className="mb-10 text-center md:mb-16">
        <div className="mb-4 inline-flex items-center justify-center rounded-full bg-muted p-2">
          <HelpCircle className="h-6 w-6 text-primary" />
        </div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">
          Foire Aux Questions
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Trouvez des réponses aux questions les plus fréquemment posées sur
          notre plateforme.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <Accordion type="single" collapsible className="w-full">
          {FAQ.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b px-4 last:border-b-0 md:px-6"
            >
              <AccordionTrigger className="py-5 text-base font-medium hover:no-underline md:text-lg">
                <div className="flex items-center gap-3 text-left">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {index + 1}
                  </div>
                  {item.title}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pl-11 pt-1 text-muted-foreground">
                <div className="prose prose-sm max-w-none">
                  <p>{item.content}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm text-muted-foreground">
          Vous ne trouvez pas ce que vous cherchez ?{" "}
          <a href="#" className="font-medium text-primary hover:underline">
            Contactez-nous
          </a>
        </p>
      </div>
    </div>
  );
}
