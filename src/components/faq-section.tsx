import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How do I create a profile on Memory Helper?",
    answer:
      "It's very simple! Create an account, click 'Add Profile', upload photos of your loved one, and enter their details. The face recognition will start working immediately.",
  },
  {
    question: "Is Memory Helper free to use?",
    answer:
      "Memory Helper is free for basic use. The Pro plan at $9/month allows for unlimited profiles and advanced recognition history.",
  },
  {
    question: "Is my data private and secure?",
    answer:
      "Yes, all your photos and profiles are securely encrypted. Only you and invited family members can access your memory vault.",
  },
  {
    question: "How accurate is the face recognition?",
    answer:
      "Our AI model has a 99% accuracy rate, even with older photos or changes in appearance. It constantly learns and improves as you use it.",
  },
  {
    question: "Can I share profiles with family?",
    answer:
      "Yes! You can invite family members to view and contribute to profiles, sharing memories and photos together.",
  },
  {
    question: "How do I update a profile?",
    answer:
      "You can edit details, add new photos, or remove a profile at any time through the dashboard settings.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-32 px-6 pb-80">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-normal mb-6 text-balance font-serif">Frequently asked questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about Memory Helper. Have a question not listed? Contact our support.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3 py-0 my-0">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-foreground/30"
            >
              <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
