import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";

export default function GradientButton({
  label,
  onClick,
  className,
  href,
}: {
  label: string | React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (href) {
      navigate({
        to: href,
      });
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      className={cn(
        "relative max-sm:w-full py-2 px-3 rounded-lg font-medium text-sm bg-gradient-to-b from-[#190d2e] to-[#4a208a] shadow-[0px_0px_12px_#8c45ff] text-neutral-100",
        "hover:opacity-90 transition-opacity",
        className
      )}
      onClick={handleClick}
    >
      <div className="absolute inset-0 rounded-lg">
        <div className="absolute inset-0 border rounded-lg border-white/20 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="absolute inset-0 border rounded-lg border-white/40 [mask-image:linear-gradient(to_top,black,transparent)]" />
        <div className="absolute inset-0 rounded-lg shadow-[0_0_10px_rgb(140,69,255,0.7)_inset]" />
      </div>
      <span className="relative z-10">{label}</span>
    </Button>
  );
}
