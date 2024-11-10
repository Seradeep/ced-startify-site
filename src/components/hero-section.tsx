import { useEffect, useState } from "react";
import GradientButton from "@/components/gradient-button";

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2024-11-12T00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[url('/images/hero-bg.jpg')] bg-cover bg-no-repeat text-white">
      <div className="absolute inset-0 h-full w-full bg-gray-900/40" />
      <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-20 py-10 md:py-20">
        
        {/* Left Section: Text Content and Timer */}
        <div className="flex flex-col items-start text-center md:text-left space-y-4 max-w-lg">
          <h3 className="text-xl font-semibold text-blue-400">
            Centre for Entrepreneurship Development
          </h3>
          <p className="text-md uppercase tracking-wide">Presents</p>
          
          <h1 className="text-7xl font-bold tracking-tight">
            <span className="text-yellow-400">Startify</span> 3.0
          </h1>
          <p className="text-sm font-semibold uppercase">National Level Startup Summit</p>

          <div className="flex items-center space-x-2 mt-2">
            <GradientButton label="📍 Anna University, Chennai" />
          </div>

          <hr className="my-4 border-t border-gray-500 w-full" />

          <p className="text-lg font-semibold">
            South India's Largest Startup Hackathon.
          </p>
          <p className="italic text-md">"Startify 3.0: Empowering Entrepreneurs, Inspiring Innovation."</p>

          <div className="flex gap-4 mt-4">
            <GradientButton label="Register Now" />
          </div>

          {/* Countdown Timer */}
          <div className="bg-gradient-to-r from-yellow-400 to-blue-500 text-white p-6 rounded-lg text-center font-bold mt-6 ">
            <p className="mb-2 text-sm">Event Starts In:</p>
            <div className="flex justify-center space-x-4 text-6xl bg-clip-text bg-white-600">
              <span>{timeLeft.days}d</span>
              <span>{timeLeft.hours}h</span>
              <span>{timeLeft.minutes}m</span>
              <span>{timeLeft.seconds}s</span>
            </div>
          </div>
        </div>

        {/* Right Section: Image and Quote */}
        <div className="flex flex-col items-center md:items-end mt-10 md:mt-0">
          <img
            src="/images/cmimage.png" // Replace with the path to your image
            alt="Hackers, Stop Hacking!!"
            className="max-w-full h-auto"
          />
          
          {/* Quote Overlay */}
          <div className="mt-4 bg-white/100 p-4 rounded-lg shadow-md text-center max-w-sm px-10">
            <p className="text-lg font-medium text-blue-800">
              “We have set ourselves an ambitious target of becoming a $1 Trillion economy by 2030”
            </p>
            <p className="mt-2 text-base font-bold text-gray-700">
              - Thiru. M.K. Stalin
            </p>
            <p className="text-sm text-gray-500">
              Hon'ble Chief Minister of Tamil Nadu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
