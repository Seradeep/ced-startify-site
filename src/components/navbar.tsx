import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import GradientButton from "@/components/gradient-button";

import { navlinks } from "@/data";
import { cn } from "@/lib/utils";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <motion.a
      className="relative text-[#7C3AED] transition-colors duration-200"
      whileHover="hover"
      href={href}
    >
      {children}
      <motion.span
        className="absolute left-0 bottom-0 w-full h-0.5 bg-[#7C3AED]"
        initial={{ scaleX: 0 }}
        variants={{
          hover: { scaleX: 1 },
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.a>
  );
};

const MobileNavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <a
    href={href}
    className={cn(
      buttonVariants({
        variant: "ghost",
      }),
      "w-full justify-start"
    )}
    onClick={onClick}
  >
    {children}
  </a>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      <motion.header
        className="fixed top-4 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 sm:px-6 w-full flex justify-center pointer-events-none"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className={cn(
            "w-full max-w-5xl px-4 sm:px-6 py-2 rounded-2xl sm:rounded-full flex items-center justify-between pointer-events-auto",
            "backdrop-blur-md shadow-xl border transition-all duration-300",
            isScrolled
              ? "bg-white/95 border-[#7C3AED]/20 shadow-[0_8px_32px_rgba(124,58,237,0.15)]"
              : "bg-white/80 border-[#7C3AED]/10 shadow-[#7C3AED]/10"
          )}
        >
          <nav className="flex items-center justify-between w-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <Link to="/" className="flex items-center">
                <img
                  src="/startify_logo.png"
                  alt="Startify Logo"
                  className="h-16 md:h-[4.5rem] w-auto py-1"
                />
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-6 text-[#7C3AED]">
              {navlinks.map((item) => (
                <NavLink key={item.name} href={item.href}>
                  {item.name}
                </NavLink>
              ))}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GradientButton
                  className="max-sm:w-full"
                  label={"Register Now"}
                  href="#about"
                />
              </motion.div>
            </div>

            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  className="w-1/2 rounded-tl-md rounded-bl-md"
                  side="right"
                >
                  <nav className="flex flex-col space-y-4 mt-6">
                    {navlinks.map((item) => (
                      <MobileNavLink
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </MobileNavLink>
                    ))}
                    <GradientButton
                      className="max-sm:w-full"
                      label={"Register Now"}
                      href="#about"
                    />
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </nav>
        </motion.div>
      </motion.header>
    </AnimatePresence>
  );
}
