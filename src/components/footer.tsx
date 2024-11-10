import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const SocialMediaLinks = () => (
  <div className="flex items-center space-x-4">
    {[
      { href: "#", Icon: Facebook, name: "Facebook" },
      { href: "#", Icon: Twitter, name: "Twitter" },
      { href: "#", Icon: Instagram, name: "Instagram" },
      { href: "#", Icon: Linkedin, name: "LinkedIn" },
    ].map(({ href, Icon, name }) => (
      <a
        key={name}
        href={href}
        className="group text-muted-foreground transition-colors hover:text-purple-700"
        aria-label={name}
      >
        <Icon className="h-5 w-5 transition-transform duration-300 ease-in-out group-hover:scale-125" />
      </a>
    ))}
  </div>
);

const NavLinks = () => (
  <div className="flex max-sm:flex-col flex-row flex-wrap items-center justify-center gap-4 sm:justify-end">
    {["About Startify 3.0", "Schedule", "Highlights", "FAQs"].map((text) => (
      <a
        key={text}
        href="#"
        className="text-sm text-muted-foreground transition-all duration-300 ease-in-out hover:text-purple-700 hover:scale-110"
      >
        {text}
      </a>
    ))}
  </div>
);

const Address = () => (
  <address className="flex flex-col space-y-2 text-sm text-muted-foreground not-italic max-sm:pl-4">
    <div className="flex items-start">
      <MapPin className="mr-2 size-16 sm:size-10" />
      <span>
        302, 2nd Floor, Platinum Jubilee Building AC Tech Campus, Sardar Patel
        Rd, Anna University, Guindy, Chennai, Tamil Nadu, 600025
      </span>
    </div>
    <div className="flex items-center">
      <Phone className="mr-2 size-4" />
      <a href="tel:+917894512345" className="hover:text-purple-700">
        +91 78945 12345
      </a>
    </div>
    <div className="flex items-center">
      <Mail className="mr-2 size-4" />
      <a href="mailto:info@startify.com" className="hover:text-purple-700">
        info@startify.com
      </a>
    </div>
  </address>
);

export default function Footer() {
  return (
    <Card className="w-full rounded-t-xl border-t bg-secondary/50 shadow-lg">
      <CardContent className="p-6 pb-1">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center space-x-4">
              {/* <img src="/vite.svg" alt="Startify Logo" className="size-14" /> */}
              <img
                src="/images/anna_univ_logo.webp"
                alt="Logo 2"
                className="size-14"
              />
              <img
                src="/images/ced_logo.webp"
                alt="Logo 3"
                className="size-14"
              />
            </div>
            <span className="mt-2 text-xl font-bold text-purple-600">
              Startify 3.0
            </span>
          </div>
          <div className="flex flex-row gap-x-4 justify-between">
            <div className="flex flex-col items-center sm:items-start">
              <h2 className="mb-4 text-lg font-semibold">Quick Links</h2>
              <NavLinks />
            </div>
            <div className="max-sm:ml-4 flex flex-1 flex-col items-center sm:items-start">
              <h2 className="mb-4 text-lg font-semibold">Contact Us</h2>
              <Address />
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="mb-4 text-lg font-semibold">Follow Us</h2>
            <SocialMediaLinks />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-2 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 CED. All rights reserved.
          </p>
          <p className="flex items-center text-sm text-muted-foreground">
            Designed with{" "}
            <Heart className="mx-1 size-4 text-red-500" aria-label="love" /> by
            <span className="ml-1 font-bold italic"> CED</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
