import { motion } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ShineBorder from "@/components/shine-border";

export default function CMQuote() {
  return (
    <div className="container mx-auto px-4 sm:px-20 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-6 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ShineBorder
            className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl p-12"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <svg
                className="h-8 w-8 text-blue-600 mb-4"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="text-xl sm:text-2xl font-medium text-blue-800 mb-4">
                We have set ourselves an ambitious target of becoming a $1
                Trillion economy by 2030
              </p>
              <div className="flex items-center mt-6">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage
                    src="/images/cm_image.webp"
                    alt="Thiru. M.K. Stalin"
                  />
                  <AvatarFallback>MKS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-base font-bold text-gray-700">
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
        <ShineBorder
          className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
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
        </ShineBorder>
      </div>
    </div>
  );
}
