import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Ticket,
} from "lucide-react";
import { navlinks } from "@/data";

const socialLinks = [
  { href: "https://www.facebook.com/Startify-Anna-University", Icon: Facebook, name: "Facebook" },
  { href: "https://x.com/startifyau", Icon: Twitter, name: "Twitter" },
  { href: "https://www.instagram.com/ced_au/", Icon: Instagram, name: "Instagram" },
  { href: "https://www.linkedin.com/company/centre-for-entrepreneurship-development/posts/", Icon: Linkedin, name: "LinkedIn" },
];

const policyLinks = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Refund Policy", href: "/refund-policy" },
  { name: "Terms & Conditions", href: "/terms-and-conditions" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative w-full overflow-hidden"
      style={{
        background: "#ffffff",
        borderTop: "1px solid rgba(124,58,237,0.15)",
      }}
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[250px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(124,58,237,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 pt-14 pb-6">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-10">

          {/* Brand column */}
          <motion.div
            className="flex flex-col items-center sm:items-start gap-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <img src="/images/anna_univ_logo.webp" alt="Anna University" className="size-12" />
              <img src="/images/ced_logo.webp" alt="CED Logo" className="size-12" />
              <img src="/startify_logo.png" alt="Startify 4.0" className="h-12 w-auto" />
            </div>
            <p className="text-sm text-[#7C3AED]/80 leading-relaxed text-center sm:text-left max-w-xs">
              National Student Startup Ecosystem Conclave — fostering innovation, entrepreneurship & growth.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {socialLinks.map(({ href, Icon, name }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="group w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-300"
                  style={{
                    background: "rgba(124,58,237,0.08)",
                    border: "1px solid rgba(124,58,237,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.15)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.08)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.2)";
                  }}
                >
                  <Icon className="h-4 w-4 text-[#7C3AED]/80 group-hover:text-[#7C3AED] transition-colors duration-300" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="flex flex-col items-center sm:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="mb-5 text-sm font-bold tracking-widest uppercase text-[#7C3AED]">
              Quick Links
            </h2>
            <nav className="flex flex-col gap-3">
              {navlinks.map((navlink) => (
                <a
                  key={navlink.name}
                  href={navlink.href}
                  className="group flex items-center gap-2 text-sm text-[#7C3AED]/80 hover:text-[#7C3AED] transition-colors duration-300"
                >
                  <span
                    className="h-px w-4 bg-[#7C3AED]/40 group-hover:w-6 group-hover:bg-[#7C3AED] transition-all duration-300"
                  />
                  {navlink.name}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="flex flex-col items-center sm:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="mb-5 text-sm font-bold tracking-widest uppercase text-[#7C3AED]">
              Contact Us
            </h2>
            <div className="flex flex-col gap-4 text-sm text-[#7C3AED]/80">
              <a
                href="https://www.google.com/maps/dir//302,+2nd+Floor,+Platinum+Jubilee+Building+AC+Tech+Campus,+Sardar+Patel+Rd,+Anna+University,+Guindy,+Chennai,+Tamil+Nadu+600025/@13.0087452,80.1550457,12z"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-[#7C3AED] transition-colors duration-300 group"
              >
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#7C3AED]/60 group-hover:text-[#7C3AED]" />
                <span className="leading-relaxed">
                  302, 2nd Floor, Platinum Jubilee Building, AC Tech Campus, Anna University, Guindy, Chennai 600025
                </span>
              </a>
              <a href="tel:04422359289" className="flex items-center gap-2 hover:text-[#7C3AED] transition-colors duration-300 group">
                <Phone className="size-4 shrink-0 text-[#7C3AED]/60 group-hover:text-[#7C3AED]" />
                044 22359289
              </a>
              <a href="tel:04422359287" className="flex items-center gap-2 hover:text-[#7C3AED] transition-colors duration-300 group">
                <Phone className="size-4 shrink-0 text-[#7C3AED]/60 group-hover:text-[#7C3AED]" />
                044 22359287
              </a>
              <a href="mailto:cedau.outreach@gmail.com" className="flex items-center gap-2 hover:text-[#7C3AED] transition-colors duration-300 group">
                <Mail className="size-4 shrink-0 text-[#7C3AED]/60 group-hover:text-[#7C3AED]" />
                cedau.outreach@gmail.com
              </a>
            </div>
          </motion.div>

          {/* Ticket Partner */}
          <motion.div
            className="flex flex-col items-center sm:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="mb-5 text-sm font-bold tracking-widest uppercase text-[#7C3AED] flex items-center gap-2">
              <Ticket className="size-4 shrink-0 text-[#7C3AED]" />
              Ticket Partner
            </h2>
            <a
              href="https://eventzgo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center p-4 rounded-2xl transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.06) 0%, rgba(124,58,237,0.02) 100%)",
                border: "1px solid rgba(124,58,237,0.2)",
                backdropFilter: "blur(12px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.5)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(124,58,237,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.2)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <img
                src="/eventzgo_logo.png"
                alt="Eventzgo — Ticket Partner"
                className="h-14 w-auto object-contain"
                style={{ filter: "brightness(1.1)" }}
              />
              <ExternalLink
                className="absolute top-2 right-2 size-3 text-[#7C3AED]/40 group-hover:text-[#7C3AED] transition-colors duration-300"
              />
            </a>
            <p className="mt-3 text-xs text-[#7C3AED]/70 text-center sm:text-left">
              Official ticketing partner for Startify 4.0
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-6"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)",
          }}
        />

        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-[#7C3AED]/70">
            © 2026 CED, Anna University. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
            {policyLinks.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                className="text-xs text-[#7C3AED]/80 hover:text-[#7C3AED] transition-colors duration-300"
              >
                {name}
              </a>
            ))}
          </div>

          <p className="flex items-center text-xs text-[#7C3AED]/80">
            Designed with{" "}
            <Heart className="mx-1 size-3 text-pink-500" aria-label="love" /> by{" "}
            <a
              href="https://cibisuryaa.space"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 font-bold text-[#7C3AED] hover:text-[#5b21b6] transition-colors"
            >
              Cibi
            </a>
            {" & "}
            <a
              href="https://www.linkedin.com/in/omprakash-d/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 font-bold text-[#7C3AED] hover:text-[#5b21b6] transition-colors"
            >
              Om
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
