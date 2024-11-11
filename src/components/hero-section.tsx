import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import GradientButton from "@/components/gradient-button";
{/*import TypeWriterEffect from "./typewritter-effect";*/}

function AnimatedDigit({ value }: { value: number }) {
  return (
    <div className="relative w-16 h-20 bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-md">
      <motion.p
        className="mb-4 text-lg text-center font-semibold text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Event Starts In:
      </motion.p>
      <div className="flex justify-between">
        {timeUnits.map((unit) => (
          <div key={unit.label} className="flex flex-col items-center">
            <AnimatedDigit value={unit.value} />
            <span className="text-xs mt-2 text-white">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function HeroSection() {
  const targetDate = new Date("2025-02-21T09:00:00");

  return (
    <section id="home" className="relative min-h-screen w-full bg-[#a81d8e] text-white rounded-b-lg">
      <div className="absolute inset-0 h-full w-full bg-gray-900/60 rounded-b-lg" />
      <div className="relative z-10 container mx-auto px-4 py-12 sm:py-20 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between">
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
              className="max-sm:mt-4 mt-2 text-xl sm:text-2xl font-bold text-white-500"
            >
              Centre for Entrepreneurship Development, Anna University
            </motion.h3>
            <motion.p
              variants={fadeInUp}
              className="text-sm uppercase tracking-wide text-white"
            >
              Presents
            </motion.p>
             <motion.h1
               variants={fadeInUp}
                 className="flex items-center justify-start text-6xl sm:text-6xl md:text-7xl font-bold tracking-tight my-4 space-x-2"
                 >
                <img
                   src="/images/herologo.png" // Replace with the actual path to your logo
                   alt="Startify Logo"
                   className="h-16 w-auto sm:h-20 md:h-24" // Responsive height for different screens
                 />
                  <span className="text-yellow-400 text-6xl sm:text-5xl md:text-6xl md:mt-2">
                   3.0
                 </span>
              </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-sm font-bold uppercase"
            >
              International Level Student Startup Ecosystem Conclave
            </motion.p>
            <motion.div variants={fadeInUp} className="flex items-start mt-2">
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
              <Separator className="my-6 bg-gray-400" />
            </motion.div>
            <motion.p
              variants={fadeInUp}
              className="italic text-left text-md sm:text-lg"
            >
              "Startify 3.0: Empowering Stupreneurs, Inspiring Innovation."
            </motion.p>
            <motion.div variants={fadeInUp} className="flex gap-4 mt-6">
              <GradientButton className="w-[30%]" label="Register Now" />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center sm:w-3/4"
            >
              <p className="text-base text-white">In Association with</p>
              <div className="flex flex-row items-center justify-between gap-10">
                <img
                  src="/images/startuptn_logo.webp"
                  alt="StartupTN Logo"
                  className="w-40 sm:w-60 h-auto"
                />
                <img
                  src="/images/edii_logo.webp"
                  alt="Edii Logo"
                  className="w-16 sm:w-24 h-16"
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:w-1/2 mt-8 lg:mt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/videos/hero_vid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="mt-8 w-full flex items-center justify-center">
              <CountdownTimer targetDate={targetDate} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
