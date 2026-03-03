import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
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
      className="relative min-h-screen w-full text-white rounded-b-[2rem] overflow-hidden"
      style={{ background: "linear-gradient(135deg, #5b0080 0%, #a81d8e 50%, #c0135a 100%)" }}
    >
      {/* Animated grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Animated glow orbs */}
      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle, rgba(200,40,200,0.4) 0%, transparent 70%)",
          transform: "translate(-30%, -30%)",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          background: "radial-gradient(circle, rgba(100,0,180,0.5) 0%, transparent 70%)",
          transform: "translate(30%, 30%)",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 rounded-b-[2rem]" />

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
              className="max-sm:mt-4 mt-2 text-xl sm:text-2xl font-bold text-white/90"
            >
              Centre for Entrepreneurship Development, Anna University
            </motion.h3>
            <motion.p
              variants={fadeInUp}
              className="text-sm uppercase tracking-widest text-purple-200 mt-1"
            >
              Presents
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="flex items-center justify-start text-6xl sm:text-6xl md:text-7xl font-bold tracking-tight my-4 space-x-2"
            >
              <img
                src="/images/hero_logo.webp"
                alt="Startify Logo"
                className="h-16 w-auto sm:h-20 md:h-32 drop-shadow-2xl"
              />
              <span
                className="text-6xl sm:text-5xl md:text-6xl md:mt-2 drop-shadow-lg"
                style={{
                  background: "linear-gradient(90deg, #fde68a, #fbbf24, #f59e0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                4.0
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-sm font-bold uppercase tracking-widest text-white/80"
            >
              International Student Startup Ecosystem Conclave
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
              <Separator className="my-6 bg-white/20" />
            </motion.div>
            <motion.p
              variants={fadeInUp}
              className="italic text-left text-md sm:text-lg text-white/85"
            >
              "Startify 4.0: Empowering Stupreneurs, Inspiring Innovations."
            </motion.p>
            <motion.div variants={fadeInUp} className="flex gap-4 mt-6">
              <GradientButton
                href="#about"
                className="w-[30%]"
                label="Register Now"
              />
            </motion.div>

            {/* Logos row */}
            <div className="flex flex-col lg:flex-row items-center justify-between mt-6 gap-6">
              <motion.div
                variants={fadeInUp}
                className="flex flex-col items-center"
              >
                <p className="text-sm text-white/70 tracking-wider mb-2">An Initiative by</p>
                <div className="flex flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 p-3 sm:p-4 rounded-xl max-w-full"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <img
                    src="/images/anna_univ_logo.webp"
                    alt="Anna University Logo"
                    className="size-10 sm:size-12 md:size-14"
                  />
                  <img
                    src="/images/ced_logo.webp"
                    alt="CED Logo"
                    className="size-10 sm:size-12 md:size-14"
                  />
                </div>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="flex flex-col items-center"
              >
                <p className="text-sm text-white/70 tracking-wider mb-2">In Association with</p>
                <div className="flex flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 p-3 sm:p-4 rounded-xl max-w-full"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <img
                    src="/images/startuptn_logo.webp"
                    alt="StartupTN Logo"
                    className="w-28 sm:w-36 md:w-44 h-auto object-contain"
                  />
                  <img
                    src="/images/edii_logo.webp"
                    alt="Edii Logo"
                    className="w-12 sm:w-16 md:w-20 h-auto object-contain"
                  />
                  <img
                    src="/hcl.png"
                    alt="HCL Logo"
                    className="h-5 sm:h-7 md:h-8 w-auto object-contain"
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
              <Card className="bg-transparent border-none shadow-none overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src="/images/cm_image.webp"
                    alt="Thiru. M.K. Stalin, Hon'ble Chief Minister of Tamil Nadu"
                    className="max-w-full h-auto rounded-2xl"
                    style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}
                    width={400}
                    height={600}
                  />
                </CardContent>
              </Card>
              <Card className="bg-transparent border-none shadow-none overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src="/images/dcm_image.webp"
                    alt="Thiru. Udhayanidhi Stalin, Hon'ble Deputy Chief Minister of Tamil Nadu"
                    className="rounded-2xl"
                    style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}
                    width={170}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
