import { offers } from "@/constants";
import OffersCarousel from "./OffersCarousel";

const Hero: React.FC = () => {
  return (
    <section
      className="rounded-b-[50px] bg-background md:rounded-b-[75px]"
      aria-labelledby="offers"
    >
      <h2 id="offers" className="sr-only">
        عروض حصريه لارقام مميزه في مصر
      </h2>
      <OffersCarousel offers={offers} />
    </section>
  );
};

export default Hero;
