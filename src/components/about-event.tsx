import AboutCard from "@/components/about-card";

import { events } from "@/data";
import { TypographyH1, TypographyH2, TypographyLead } from "./ui/typography";

export default function AboutEvent() {
  return (
    <section className="container mx-auto flex flex-col items-center px-4 py-10">
      <TypographyH1 className="pb-4">
        About <span className="text-purple-600">Startify 3.0</span>
      </TypographyH1>
      <TypographyH2 className="text-base underline underline-offset-4 border-none">
        Why Startify 3.0?
      </TypographyH2>
      <TypographyLead className="italic mt-1 lg:max-w-4xl mb-8 w-full text-center text-base font-normal text-gray-500">
        Welcome to the Startify 3.0, where the future unfolds! Whether
        you&apos;re a seasoned entrepreneur, a curious newcomer, or a business
        leader looking to harness the power of networking, this event is
        designed to inspire, learn, and connect.
      </TypographyLead>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 max-w-7xl md:mx-auto gap-5">
        {events.slice(0, 9).map((event, index) => (
          <AboutCard key={index} {...event} />
        ))}
        <div className="flex flex-col md:flex-row items-center justify-center gap-5 w-full md:col-span-3">
          {events.slice(9, 12).map((event, index) => (
            <AboutCard key={index} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
}
