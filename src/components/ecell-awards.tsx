import { TypographyH1 } from "@/components/ui/typography";
import { Carousel } from "@/components/ui/carousel";
import { eCellAwards } from "@/data";

export default function ECellAwards() {
  return (
    <section id="ecell-awards" className="pt-8 px-8 lg:pt-20">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-20">
          <TypographyH1 className="mb-2 text-[#263238]">
            Golden Star E-Cell Awards
          </TypographyH1>
        </div>

        <Carousel
          data={eCellAwards.map(({ award, image }) => ({
            name: award,
            image,
          }))}
        />
      </div>
    </section>
  );
}
