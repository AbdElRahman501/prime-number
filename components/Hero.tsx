import { offers } from "@/constants";
import OffersCarousel from "./OffersCarousel";

const Hero: React.FC = () => {
  return (
    <section
      className="rounded-b-[50px] bg-background md:rounded-b-[75px]"
      role="banner"
    >
      <OffersCarousel offers={offers} />
    </section>
  );
};

export default Hero;
