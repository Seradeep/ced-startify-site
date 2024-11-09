import GradientButton from "@/components/gradient-button";

export default function HeroSection() {
  return (
    <div className="text-white relative min-h-screen w-full bg-[url('/images/hero-bg.jpeg')] bg-cover bg-no-repeat">
      <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
      <div className="grid min-h-screen px-8">
        <div className="container relative z-10 my-auto mx-auto grid gap-y-2 place-items-center text-center">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            29-31 August @ New York
          </h3>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            AI Conference 2023: Unlocking the Future
          </h1>
          <p className="text-xl italic">
            Join us for the most anticipated event of the year - the AI
            Conference 2023!
          </p>
          <div className="flex items-center gap-4">
            <GradientButton label="Get Started" />
          </div>
        </div>
      </div>
    </div>
  );
}
