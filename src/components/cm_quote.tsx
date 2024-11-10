import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ShineBorder from "@/components/shine-border";

export default function CMQuote() {
  return (
    <div className="container mx-auto px-4 sm:px-24 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ShineBorder
            className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl p-8"
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
                className="max-w-full h-auto rounded-lg shadow-lg"
                width={500}
                height={500}
              />
            </CardContent>
          </Card>
           {/* Second Image: Positioned below on mobile, overlaps on larger screens */}
  <Card className="bg-transparent border-none shadow-none overflow-hidden sm:absolute sm:bottom-[-190] sm:right-0 sm:transform sm:translate-x-4 sm:translate-y-4">
    <CardContent className="p-0">
      <img
        src="/images/dcm.webp"
        alt="Thiru. M.K. Stalin, Hon'ble Chief Minister of Tamil Nadu"
        className="max-w-full h-auto rounded-lg shadow-lg w-[260px] h-[200px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px]"
        width={200} // Adjusted size for mobile
        height={200}
        
      />
    </CardContent>
  </Card>
        </motion.div>
      </div>
    </div>
  );
}
