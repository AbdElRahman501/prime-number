import { isCurrentDateInRange } from "@/utils";
import OffersCarousel from "./OffersCarousel";
import { fetchOffers } from "@/lib/actions/offer.actions";

const Hero: React.FC = async () => {
  const data = await fetchOffers();
  const offers = data.filter((offer) => isCurrentDateInRange(offer));
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
