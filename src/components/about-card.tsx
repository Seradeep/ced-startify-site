import { useState } from "react";
import { ExternalLink, ShoppingCart } from "lucide-react";
import Grid from "@/components/grid-bg";

interface AboutCardProps {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  eventzgoUrl?: string;
}

const cardBase: React.CSSProperties = {
  background: "#7C3AED",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.18)",
  boxShadow: "0 4px 32px rgba(124,58,237,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
  transition: "transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease",
};

const cardHovered: React.CSSProperties = {
  transform: "translateY(-8px) scale(1.025)",
  boxShadow: "0 0 40px rgba(124,58,237,0.5), 0 12px 40px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
  borderColor: "rgba(255,255,255,0.4)",
};

export default function AboutCard({
  title,
  description,
  eventzgoUrl,
}: AboutCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col text-left p-6 rounded-3xl overflow-hidden h-full"
      style={{ ...cardBase, ...(hovered ? cardHovered : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Subtle grid overlay */}
      <Grid size={24} />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-6 right-6 h-[2px] rounded-full"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }}
      />

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-3 leading-snug">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-white/85 leading-relaxed flex-1 mb-5">
        {description}
      </p>

      {/* Buy button */}
      {eventzgoUrl ? (
        <a
          href={eventzgoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-bold text-[#7C3AED] bg-white overflow-hidden transition-all duration-300"
          style={{
            border: "1px solid rgba(255,255,255,1)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.9)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(255,255,255,0.4)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#ffffff";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          <ShoppingCart className="size-4 shrink-0" />
          Register
          <ExternalLink className="size-3 opacity-60 group-hover:opacity-100 transition-opacity" />
        </a>
      ) : (
        <span className="flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white/70 border border-white/20 bg-white/5">
          Registration Opens Soon
        </span>
      )}
    </div>
  );
}
