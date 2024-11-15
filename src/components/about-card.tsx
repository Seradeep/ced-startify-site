import { useId } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { TypographyH4, TypographyP } from "@/components/ui/typography";
import StartupCafeForm from "@/components/event-forms/startup-cafe";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AboutCardProps {
  id: string;
  title: string;
  description: string;
}

export default function AboutCard({ id, description, title }: AboutCardProps) {
  if (id === "startup-cafe") {
    return (
      <Dialog>
        <DialogTrigger>
          <div
            key={title}
            className="relative flex flex-col text-left bg-purple-700 p-6 rounded-3xl border border-purple-900 overflow-hidden"
          >
            <Grid size={20} />
            <TypographyH4 className="text-[22px] underline underline-offset-2 decoration-purple-300 text-white">
              {title}
            </TypographyH4>
            <TypographyP className="text-white">{description}</TypographyP>
            <Badge
              variant="secondary"
              className="absolute bottom-2 right-2 bg-purple-500 text-white hover:bg-purple-600"
            >
              {id === "startup-cafe" ? "Apply" : "Registration Opens Soon"}
            </Badge>
          </div>
        </DialogTrigger>
        <DialogContent className="h-[90%] p-2">
          <ScrollArea>
            <StartupCafeForm />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <div
      key={title}
      className="relative bg-purple-700 p-6 rounded-3xl border border-purple-900 overflow-hidden"
    >
      <Grid size={20} />
      <TypographyH4 className="text-[22px] underline underline-offset-2 decoration-purple-300 text-white">
        {title}
      </TypographyH4>
      <TypographyP className="text-white">{description}</TypographyP>
      <Badge
        variant="secondary"
        className="absolute bottom-2 right-2 bg-purple-500 text-white hover:bg-purple-600"
      >
        {id === "startup-cafe" ? "Apply" : "Registration Opens Soon"}
      </Badge>
    </div>
  );
}

export function EventForm({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <StartupCafeForm />
      </DialogContent>
    </Dialog>
  );
}

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: number[][];
  size?: number;
}) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: any) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
