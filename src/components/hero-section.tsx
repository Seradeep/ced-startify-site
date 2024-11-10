import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import GradientButton from "@/components/gradient-button";
import TypeWriterEffect from "./typewritter-effect";

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
    <div className="relative min-h-screen w-full bg-[url('/images/hero-bg.jpeg')] bg-cover bg-center bg-no-repeat text-white">
      <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
      <div className="relative z-10 container mx-auto px-4 py-12 sm:py-20 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          className="text-center max-w-3xl mt-4"
          initial="initial"
          animate="animate"
          variants={{
            animate: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.h3
            variants={fadeInUp}
            className="mt-2 text-xl font-semibold text-blue-300"
          >
            Centre for Entrepreneurship Development
          </motion.h3>
          <motion.p
            variants={fadeInUp}
            className="text-sm uppercase tracking-wide"
          >
            Presents
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight my-4"
          >
            <TypeWriterEffect
              words={[
                { text: "Startify", className: "text-purple-400" },
                { text: " 3.0" },
              ]}
            />
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-sm font-semibold uppercase"
          >
            National Level Startup Summit
          </motion.p>
          <motion.div variants={fadeInUp} className="flex justify-center mt-2">
            <GradientButton
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
            className="text-lg sm:text-xl font-semibold"
          >
            South India's Largest Startup Hackathon
          </motion.p>
          <motion.p variants={fadeInUp} className="italic text-md sm:text-lg">
            "Startify 3.0: Empowering Entrepreneurs, Inspiring Innovation."
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex justify-center gap-4 mt-6"
          >
            <GradientButton className="w-1/2" label="Register Now" />
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="mt-8 w-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CountdownTimer targetDate={targetDate} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
