import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { stats } from "@/data";
import { cn } from "@/lib/utils";

interface StatCardProps {
  count: string;
  title: string;
  index: number;
}

function StatCard({ count, title, index }: StatCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="relative p-6 rounded-2xl overflow-hidden cursor-default"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(243,232,255,0.6) 100%)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(168,85,247,0.2)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.25s ease, border-color 0.25s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 0 28px rgba(168,85,247,0.35), 0 8px 24px rgba(0,0,0,0.08)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.5)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 4px 20px rgba(0,0,0,0.06)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.2)";
      }}
    >
      {/* Subtle glow top-right */}
      <div
        className="absolute top-0 right-0 w-20 h-20 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />

      <p
        className={cn(
          "text-3xl font-extrabold mb-1",
          index === 3 ? "text-xl" : "text-3xl"
        )}
        style={{
          background: "linear-gradient(135deg, #7c3aed, #a855f7, #c026d3)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {count}
      </p>
      <p className="text-[#263238] font-medium text-sm">{title}</p>
    </motion.div>
  );
}

export default function OurStats() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <section
      id="highlights"
      className="relative grid gap-10 px-4 sm:px-24 pt-28 pb-16 md:grid-cols-2 md:gap-20 overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(243,232,255,0.3) 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* Left: heading side */}
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0, x: -30 }}
        animate={headingInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p
          className="mb-3 font-semibold tracking-wider uppercase text-sm"
          style={{
            background: "linear-gradient(90deg, #7c3aed, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Our Stats
        </p>
        <p className="text-5xl font-bold leading-tight lg:w-3/4 text-gray-900">
          Startify 4.0{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #7c3aed, #c026d3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Highlights
          </span>
        </p>
        <p className="mt-4 w-full text-gray-500 lg:w-9/12 leading-relaxed">
          This two-day extravaganza brings together the brightest minds, leading
          innovators, and top investors to fund your innovation.
        </p>
      </motion.div>

      {/* Right: stats grid */}
      <div className="w-full">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              count={stat.count}
              title={stat.title}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
