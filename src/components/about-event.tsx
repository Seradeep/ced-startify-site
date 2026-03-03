import { motion } from "framer-motion";

import AboutCard from "@/components/about-card";
import { events } from "@/data";

const listedEvents = events.filter((e) => e.eventzgoUrl);

export default function AboutEvent() {
  return (
    <section
      id="about"
      className="relative py-16 px-4 overflow-hidden"
    >
      {/* Subtle aurora background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(245,243,255,0) 0%, rgba(233,213,255,0.25) 40%, rgba(245,243,255,0) 100%)",
        }}
      />
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full -z-10 pointer-events-none"
        animate={{ scale: [1, 1.05, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(168,85,247,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto flex flex-col items-center">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-2"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold pb-2 leading-tight">
            About{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #7c3aed, #a855f7, #c026d3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Startify 4.0
            </span>
          </h1>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base font-semibold underline underline-offset-4 text-purple-700 border-none mb-2"
        >
          Why Startify 4.0?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="italic mt-1 lg:max-w-4xl mb-10 w-full text-center text-base font-normal text-gray-500"
        >
          Welcome to the Startify 4.0, where the future unfolds! Whether
          you&apos;re a seasoned entrepreneur, a curious newcomer, or a business
          leader looking to harness the power of networking, this event is
          designed to inspire, learn, and connect.
        </motion.p>

        {/* Cards grid — only events with Eventzgo links */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl md:mx-auto gap-5 w-full">
          {listedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              className="h-full"
            >
              <AboutCard {...event} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
