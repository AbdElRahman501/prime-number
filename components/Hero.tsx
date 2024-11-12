import OffersCarousel from "./OffersCarousel";
import { fetchAllOffers } from "@/lib/actions/offer.actions";

const Hero: React.FC = async () => {
  // TODO: make it only active and add time start and end
  const offers = await fetchAllOffers();

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
