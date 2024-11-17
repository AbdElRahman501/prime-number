"use client";
import { Offer, Store } from "@/types";
import { createWhatsAppLink } from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React from "react";

const OffersCarousel: React.FC<{ offers: Offer[]; store: Store }> = ({
  offers,
  store,
}) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  React.useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollLeft;
        const index = Math.round(
          scrollPosition / containerRef.current.offsetWidth,
        );
        setCurrentIndex(-index);
      }
    };
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }
    const currentRef = containerRef.current;
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToNext = () => {
    const nextScrollIndex = (currentIndex + 1) % offers.length;
    if (containerRef.current) {
      const nextScrollLeft = containerRef.current.offsetWidth * nextScrollIndex;
      containerRef.current.scrollTo({
        left: -nextScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const scrollToPrev = () => {
    if (containerRef.current && currentIndex > 0) {
      containerRef.current.scrollBy({
        left: containerRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  React.useEffect(() => {
    const interval = setInterval(scrollToNext, 5000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  if (offers.length === 0) return null;

  return (
    <div
      aria-labelledby="offers"
      className="container relative mx-auto flex h-[75vh] max-h-[800px] min-h-[500px] items-center justify-around gap-4 p-5 text-center md:w-5/6"
    >
      {/* next Button */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2">
        <button
          onClick={scrollToPrev}
          className={`${currentIndex === 0 ? "invisible" : ""} group rounded-full bg-foreground p-1 text-primary transition-colors hover:bg-primary hover:text-background md:p-3 md:text-2xl`}
          aria-label="Next banner"
        >
          <Icon
            icon="bi:arrow-right"
            className="transition-transform duration-300 group-hover:scale-125"
          />
        </button>
      </div>

      {/* Main Content */}
      <div
        ref={containerRef}
        className="scroll-bar-hidden flex w-full snap-x snap-mandatory overflow-x-auto"
      >
        {offers.map((offer) => (
          <OfferCard key={offer._id} offer={offer} store={store} />
        ))}
      </div>
      {/* Previous Button */}
      <div className="absolute left-5 top-1/2 -translate-y-1/2">
        <button
          onClick={scrollToNext}
          className={`${currentIndex === offers.length - 1 ? "invisible" : ""} group rounded-full bg-foreground p-1 text-primary transition-colors hover:bg-primary hover:text-background md:p-3 md:text-2xl`}
          aria-label="Previous banner"
        >
          <Icon
            icon="bi:arrow-left"
            className="transition-transform duration-300 group-hover:scale-125"
          />
        </button>
      </div>
    </div>
  );
};
const renderTextWithLineBreaks = (text: string) => {
  return text.split("\n").map((str, index) => (
    <span key={index}>
      {str}
      <br />
    </span>
  ));
};

export const OfferCard: React.FC<{
  offer: Offer;
  viewOnly?: boolean;
  className?: string;
  store?: Store;
}> = ({ offer, viewOnly = false, className, store }) => (
  <div
    className={
      className ||
      "m-auto flex min-w-full max-w-lg snap-center flex-col items-center justify-center space-y-8 text-center text-base text-primary"
    }
  >
    {viewOnly ? (
      <p
        aria-hidden
        className="m-0 h-0.5 text-[2.25em] font-bold leading-[1em] text-transparent sm:text-[3em] sm:leading-[1em] md:text-[4.5em] md:leading-[1em]"
      >
        <strong>010101010100</strong>
      </p>
    ) : null}
    <p className="text-[2.25em] font-bold leading-[1em] sm:text-[3em] sm:leading-[1em] md:text-[4.5em] md:leading-[1em]">
      <strong>{offer.phoneNumber}</strong>
    </p>

    <h3
      className="sm:leading-[1em]md:text-[3em] text-[1.5em] font-bold leading-[1em] sm:text-[1.875em] md:leading-[1em]"
      aria-level={1}
    >
      {offer.title}
    </h3>
    <p className="mx-[15%] max-w-xl text-center text-[1.125em] leading-[1.5em]">
      {renderTextWithLineBreaks(offer.description)}
    </p>
    {store ? (
      <Link
        target="_blank"
        href={createWhatsAppLink(store.contacts.phoneNumber, offer.phoneNumber)}
        className="flex items-center justify-center gap-3 rounded-full bg-primary px-10 py-3 text-2xl font-semibold text-white hover:opacity-90 focus:outline-none focus:ring focus:ring-inset focus:ring-blue-300"
        role="button"
        aria-label="شراء الان"
      >
        <span>شراء الان</span>
        <Icon icon="ri:whatsapp-fill" />
      </Link>
    ) : null}
  </div>
);

export default OffersCarousel;
