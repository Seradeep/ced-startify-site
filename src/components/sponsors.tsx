export default function Sponsors() {
  return (
    <section className="py-8 px-8 lg:py-20">
      <div className="container mx-auto text-center">
        <h4 className="text-[#263238] scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          SPONSORED BY
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {[...Array(6)].map((_, key) => (
            <img
              key={key}
              src={`${key % 2 === 0 ? "/images/google.svg" : "/images/amazon.svg"}`}
              alt={`Sponsor ${key + 1}`}
              className="w-40 h-full mx-auto"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
