import { motion } from "framer-motion";

import { Separator } from "@/components/ui/separator";
import GradientButton from "@/components/gradient-button";
import { MapPin } from "lucide-react";



const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function HeroSection() {


  return (
    <section
      id="home"
      className="relative min-h-screen w-full text-[#7C3AED] rounded-b-[2rem] overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      {/* Animated grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Animated glow orbs */}
      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
          transform: "translate(-30%, -30%)",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
          transform: "translate(30%, 30%)",
        }}
      />

      {/* Subtle overlay */}
      <div className="absolute inset-0 rounded-b-[2rem]" />

      <div className="relative z-10 container mx-auto px-4 lg:px-16 py-12 sm:py-20 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-x-10">
          <motion.div
            className="lg:w-1/2 text-left max-w-3xl mt-4"
            initial="initial"
            animate="animate"
            variants={{
              animate: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.h3
              variants={fadeInUp}
              className="max-sm:mt-4 mt-2 text-xl sm:text-2xl font-bold text-[#7C3AED]"
            >
              Centre for Entrepreneurship Development, Anna University
            </motion.h3>
            <motion.p
              variants={fadeInUp}
              className="text-sm uppercase tracking-widest text-[#7C3AED]/70 mt-1"
            >
              Presents
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-start text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight my-4 gap-2"
            >
              <img
                src="/startify_logo.png"
                alt="Startify Logo"
                className="h-12 w-auto sm:h-20 md:h-32 drop-shadow-2xl"
              />
              <span
                className="text-5xl sm:text-5xl md:text-6xl drop-shadow-lg self-center translate-y-1 sm:translate-y-2 md:translate-y-4"
                style={{
                  background: "linear-gradient(90deg, #c4b5fd, #8b5cf6, #6d28d9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                4.0
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-sm font-bold uppercase tracking-widest text-[#7C3AED]/80"
            >
              National Student Startup Ecosystem Conclave
            </motion.p>
            <motion.div variants={fadeInUp} className="flex items-start mt-3">
              <GradientButton
                className="w-fit pointer-events-none"
                label={
                  <span className="flex items-center">
                    <MapPin className="mr-2" size={16} />
                    Anna University, Chennai
                  </span>
                }
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Separator className="my-6 bg-[#7C3AED]/20" />
            </motion.div>
            <motion.p
              variants={fadeInUp}
              className="italic text-left text-sm sm:text-lg text-[#7C3AED]/85"
            >
              "Startify 4.0: Empowering Stupreneurs, Inspiring Innovations."
            </motion.p>
            <motion.div variants={fadeInUp} className="flex gap-4 mt-6">
              <GradientButton
                href="#about"
                className="w-full sm:w-[30%]"
                label="Register Now"
              />
            </motion.div>

            {/* Logos row */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mt-8 gap-8 w-full">
              <motion.div
                variants={fadeInUp}
                className="flex flex-col items-center sm:items-start w-full sm:w-auto"
              >
                <p className="text-xs sm:text-sm text-[#7C3AED]/70 tracking-wider mb-2 text-center sm:text-left">An Initiative by</p>
                <div className="flex flex-row flex-wrap justify-center sm:justify-start items-center gap-4 sm:gap-6 p-3 sm:p-4 rounded-xl w-full"
                  style={{
                    background: "rgba(124,58,237,0.06)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(124,58,237,0.15)",
                  }}
                >
                  <img
                    src="/images/anna_univ_logo.webp"
                    alt="Anna University Logo"
                    className="size-12 sm:size-12 md:size-14"
                  />
                  <img
                    src="/images/ced_logo.webp"
                    alt="CED Logo"
                    className="size-12 sm:size-12 md:size-14"
                  />
                </div>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="flex flex-col items-center sm:items-start w-full sm:w-auto"
              >
                <p className="text-xs sm:text-sm text-[#7C3AED]/70 tracking-wider mb-2 text-center sm:text-left">In Association with</p>
                <div className="flex flex-row flex-wrap justify-center sm:justify-start items-center gap-4 sm:gap-6 p-3 sm:p-4 rounded-xl w-full"
                  style={{
                    background: "rgba(124,58,237,0.06)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(124,58,237,0.15)",
                  }}
                >
                  <img
                    src="/startup_tn.png"
                    alt="StartupTN Logo"
                    className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                  />
                  <img
                    src="/images/edii_logo.webp"
                    alt="Edii Logo"
                    className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                  />
                  <img
                    src="/hcl.png"
                    alt="HCL Logo"
                    className="h-6 sm:h-7 md:h-8 w-auto object-contain"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="w-full flex flex-col items-center lg:w-1/2 mt-8 lg:mt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <img
                src="/cm.png.png"
                alt="Hon'ble Chief Minister and Deputy Chief Minister of Tamil Nadu"
                className="max-w-full h-auto"
                style={{ width: 440, mixBlendMode: "multiply" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
