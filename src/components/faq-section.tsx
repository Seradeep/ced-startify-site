import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  TypographyH1,
  TypographyH4,
  TypographyP,
} from "@/components/ui/typography";

import { faqs } from "@/data";

export default function FAQSection() {
  return (
    <section id="faqs" className="py-8 px-8 lg:py-20">
      <div className="container mx-auto">
        <div className="text-center">
          <TypographyH1 className="mb-2 text-[#263238]">
            Frequently asked questions
          </TypographyH1>
          <TypographyP className="mx-auto mb-12 lg:w-3/5 !text-gray-500">
            We&apos;re here to address your most common queries and provide you
            with the information you need to make the most of Startify 3.0
            experience.
          </TypographyP>
        </div>

        <div className="mx-auto lg:max-w-screen-lg lg:px-20">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger>
                  <TypographyH4 className="font-normal tracking-normal text-lg">
                    {faq.question}
                  </TypographyH4>
                </AccordionTrigger>
                <AccordionContent>
                  <TypographyP>{faq.answer}</TypographyP>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
