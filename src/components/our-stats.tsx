import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { stats } from "@/data";
import { cn } from "@/lib/utils";

export default function OurStats() {
  return (
    // <section id="highlights" className="grid gap-10 px-4 sm:px-24 pt-28 pb-44 md:grid-cols-2 md:gap-20">
    <section id="highlights" className="grid gap-10 px-4 sm:px-24 pt-28 pb-16 md:grid-cols-2 md:gap-20">
      <div>
        <h4 className="text-purple-900 mb-4 font-medium">Our Stats</h4>
        <p className="text-5xl font-bold leading-tight lg:w-3/4">
          Startify 3.0 Highlights
        </p>
        <h3 className="mt-3 w-full text-gray-500 lg:w-9/12">
          This two-day extravaganza brings together the brightest minds, leading
          innovators, and top investors to fund your innovation.
        </h3>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <Card className="bg-transparent w-full" key={index}>
              <CardHeader>
                <CardTitle
                  className={cn(
                    "text-purple-900 text-3xl font-semibold",
                    index === 3 && "text-xl"
                  )}
                >
                  {stat.count}
                </CardTitle>
                <CardDescription className="text-[#263238] mt-1 font-medium">
                  {stat.title}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
