import { DialogContent } from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventDetailsProps {
  id: string;
  title: string;
  description: string;
  prizeAmount: string;
  regFee: string;
  imageSrc: string;
  onApply: () => void;
}

export default function EventDetailsDialog({
  title,
  description,
  prizeAmount,
  regFee,
  imageSrc,
  onApply,
}: EventDetailsProps) {
  return (
    <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <a
          href={imageSrc}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full md:w-1/2 relative group"
        >
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
            title="Click to view full image"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
            <Maximize2 className="text-white size-6" />
          </div>
        </a>
        <div className="w-full md:w-1/2 flex flex-col gap-y-1 justify-between">
          <div>
            <TypographyH3 className="mb-2">{title}</TypographyH3>
            <TypographyP className="mb-4">{description}</TypographyP>
            <TypographyP className="!mt-2">
              <span className="font-medium underline underline-offset-1">
                Prize Amount:
              </span>{" "}
              {prizeAmount}
            </TypographyP>
            <TypographyP className="!mt-2">
              <span className="font-medium underline underline-offset-1">
                Registration Fee:
              </span>{" "}
              {regFee[0] === "/" ? (
                <a
                  href={regFee}
                  className={cn(
                    buttonVariants({
                      variant: "link",
                    }),
                    "p-0 pl-1"
                  )}
                  target="_blank"
                >
                  View Reg. Fees
                </a>
              ) : (
                `Rs.${regFee}/-(Inclusive of all taxes)`
              )}
            </TypographyP>
          </div>
          <Button onClick={onApply} className="mt-4 w-full md:w-auto">
            Apply Now
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
