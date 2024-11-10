import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { CalendarClock, MapPin } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import GradientButton from "./gradient-button";

interface DayScheduleProps {
  id: string;
  events: {
    date: string;
    time: string;
    name: string;
    desc: string;
    location: string;
  }[];
}

export default function DaySchedule({ id, events }: DayScheduleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 45%"],
  });

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ref]);

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      id={id}
      className="w-full flex flex-col items-center bg-white dark:bg-neutral-950 md:px-10"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto pb-16">
        {events.map((event, index) => (
          <div key={index} className="flex justify-start pt-10 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center">
                <div className="size-3 rounded-full bg-neutral-200 border border-neutral-300 p-1" />
              </div>
              <h3 className="hidden md:flex flex-col md:pl-20 md:text-xl">
                <CalendarClock
                  className="size-5 text-orange-500"
                  aria-hidden="true"
                />
                <div className="flex flex-col">
                  <span className="text-black font-medium">{event.date}</span>
                  <span className="text-base font-normal text-muted-foreground">
                    {event.time}
                  </span>
                </div>
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <Card className="w-full transition-all duration-300 hover:shadow-lg">
                <CardContent className="grid gap-4 p-6">
                  <h2 className="text-2xl font-medium leading-tight lg:text-3xl">
                    {event.name}
                  </h2>
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:gap-4">
                    <div className="md:hidden flex items-center">
                      <CalendarClock
                        className="mr-1 size-4 text-orange-500"
                        aria-hidden="true"
                      />
                      <span>{`${event.date}, ${event.time}`}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin
                        className="mr-1 size-4 text-orange-500"
                        aria-hidden="true"
                      />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="hidden sm:block text-muted-foreground">
                    {event.desc}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 p-6 pt-0 sm:flex-row sm:justify-end">
                  {/* <Button variant="outline" className="w-full sm:w-auto">
                    Learn More
                  </Button> */}
                  <GradientButton label="Register Now" />
                </CardFooter>
              </Card>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 to-[#4a208a] shadow-[0px_0px_12px_#8c45ff] from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
