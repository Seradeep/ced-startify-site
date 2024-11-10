export default function Sponsors() {
  return (
    <section className="py-8 px-8 lg:py-20">
      <div className="container mx-auto text-center">
        <h4 className="text-[#263238] scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          SPONSORED BY
        </h4>
        <div className="flex gap-6 mt-6 items-center justify-center">
          {[...Array(2)].map((_, key) => (
            <img
              key={key}
              src={`${key % 2 === 0 ? "/images/ced_logo.webp" : "/images/anna_univ_logo.webp"}`}
              alt={`Sponsor ${key + 1}`}
              className="w-28 sm:w-40 h-full mx-auto"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
