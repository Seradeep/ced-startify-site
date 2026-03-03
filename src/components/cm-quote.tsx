import { motion } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ShineBorder from "@/components/shine-border";

export default function CMQuote() {
  return (
    <div className="relative container mx-auto px-4 sm:px-20 py-16 overflow-hidden">
      {/* Soft radial glow behind section */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(168,85,247,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-6 items-center">
        {/* Quote card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ShineBorder
            className="relative flex w-full flex-col items-start justify-center overflow-hidden rounded-2xl border md:shadow-xl p-10"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
              backdropFilter: "blur(20px)",
              borderColor: "rgba(255,255,255,0.12)",
            } as React.CSSProperties}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="w-full"
            >
              {/* Custom open-quote marks */}
              <div
                className="text-7xl font-serif leading-none mb-2 -mt-2"
                style={{
                  background: "linear-gradient(135deg, #a855f7, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                "
              </div>
              <p
                className="text-xl sm:text-2xl font-semibold leading-snug mb-4"
                style={{
                  background: "linear-gradient(135deg, #1e3a8a, #4c1d95)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                We have set ourselves an ambitious target of becoming a $1
                Trillion economy by 2030
              </p>
              <div className="text-right text-5xl font-serif leading-none mb-4"
                style={{
                  background: "linear-gradient(135deg, #a855f7, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                "
              </div>

              {/* Divider */}
              <div className="h-px w-full mb-4"
                style={{ background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)" }}
              />

              <div className="flex items-center mt-2">
                <Avatar className="h-14 w-14 mr-4 ring-2 ring-purple-400/40">
                  <AvatarImage
                    src="/images/cm_image.webp"
                    alt="Thiru. M.K. Stalin"
                  />
                  <AvatarFallback>MKS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-base font-bold text-gray-800">
                    Thiru. M.K. Stalin
                  </p>
                  <p className="text-sm text-gray-500">
                    Hon'ble Chief Minister of Tamil Nadu
                  </p>
                </div>
              </div>
            </motion.div>
          </ShineBorder>
        </motion.div>

        {/* Video card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <ShineBorder
            className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border md:shadow-xl"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            style={{
              background: "rgba(0,0,0,0.04)",
              backdropFilter: "blur(10px)",
            } as React.CSSProperties}
          >
            <video
              className="w-full h-full object-cover rounded-2xl"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/videos/hero_vid.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </ShineBorder>
        </motion.div>
      </div>
    </div>
  );
}
