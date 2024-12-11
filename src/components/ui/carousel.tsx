import { Link } from "@tanstack/react-router";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel as CarouselPrimitive,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel-components";
import { cn } from "@/lib/utils";
import { Maximize2 } from "lucide-react";

interface CarouselProps {
  data: { name: string; image: string }[];
  className?: string;
}

export function Carousel({ data, className }: CarouselProps) {
  return (
    <CarouselPrimitive
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className={cn(
        "w-full max-w-md sm:max-w-4xl lg:max-w-7xl mx-auto",
        className
      )}
    >
      <CarouselContent className="-ml-4 -mt-2 pb-4">
        {data.map((item, index) => (
          <CarouselItem
            key={index}
            className="pl-8 pt-2 basis-full sm:basis-1/2 lg:basis-1/3"
          >
            <CarouselCard name={item.name} image={item.image} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex -left-12" />
      <CarouselNext className="hidden sm:flex -right-12" />
    </CarouselPrimitive>
  );
}

interface CarouselCardProps {
  name: string;
  image: string;
  className?: string;
}

function CarouselCard({ name, image, className }: CarouselCardProps) {
  return (
    <div className={cn("flex flex-col h-full", className)}>
      <Link
        to={image}
        target="_blank"
        rel="noopener noreferrer"
        className="block group relative aspect-[4/3] overflow-hidden rounded-lg"
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain transition-transform hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
          <Maximize2 className="text-white size-6" />
        </div>
      </Link>
      <div className="mt-2 bg-black/50 text-white p-2 text-center rounded-md">
        <p className="text-sm font-semibold truncate">{name}</p>
      </div>
    </div>
  );
}
