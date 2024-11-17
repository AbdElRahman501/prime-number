import { isCurrentDateInRange } from "@/utils";
import OffersCarousel from "./OffersCarousel";
import { fetchOffers } from "@/lib/actions/offer.actions";
import { fetchStore } from "@/lib/actions/store.actions";

const Hero: React.FC = async () => {
  const data = await fetchOffers();
  const offers = data.filter((offer) => isCurrentDateInRange(offer));
  const store = await fetchStore();
  return (
    <section
      className="rounded-b-[50px] bg-background md:rounded-b-[75px]"
      aria-labelledby="offers"
    >
      <h2 id="offers" className="sr-only">
        عروض حصريه لارقام مميزه في مصر
      </h2>
      <OffersCarousel offers={offers} store={store} />
    </section>
  );
};

export default Hero;
