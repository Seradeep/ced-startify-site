import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { schedule } from "@/data";
import { cn } from "@/lib/utils";
import DaySchedule from "./day-schedule";

export default function Schedule() {
  return (
    <section id="schedule" className="container mx-auto pb-8 px-8 lg:pb-20 flex flex-col items-center justify-center">
      <h4 className="scroll-m-20 text-4xl font-extrabold text-[#263238] tracking-tight lg:text-5xl pb-2">
        Schedule
      </h4>
      <Tabs
        defaultValue="day1"
        className="w-full mb-8 flex flex-col items-center justify-center"
      >
        <TabsList className="h-12 w-72 md:w-96 gap-x-4 bg-transparent">
          {schedule.map((day, index) => (
            <TabsTrigger
              key={index}
              value={day.id}
              className={cn(
                "dark",
                buttonVariants({
                  variant: "default",
                  size: "lg",
                })
              )}
            >
              {day.id === "day1" ? "Day 1" : "Day 2"}
            </TabsTrigger>
          ))}
        </TabsList>
        {schedule.map((day, index) => (
          <TabsContent
            key={index}
            className="max-sm:w-full sm:mx-auto sm:container"
            value={day.id}
          >
            <DaySchedule {...day} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
