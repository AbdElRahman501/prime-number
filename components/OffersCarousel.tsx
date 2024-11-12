"use client";
import { store } from "@/constants";
import { Offer } from "@/types";
import { createWhatsAppLink } from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React from "react";

const OffersCarousel: React.FC<{ offers: Offer[] }> = ({ offers }) => {
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
          <OfferCard key={offer._id} offer={offer} />
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

export const OfferCard: React.FC<{ offer: Offer; viewOnly?: boolean }> = ({
  offer,
  viewOnly = false,
}) => (
  <div className="m-auto flex min-w-full max-w-lg snap-center flex-col items-center justify-center space-y-8 text-primary">
    <p className="text-4xl font-bold sm:text-5xl md:text-7xl">
      <strong>{offer.phoneNumber}</strong>
    </p>
    <h3
      className="w-4/5 text-2xl font-bold sm:text-3xl md:text-5xl md:leading-tight"
      aria-level={1}
    >
      {offer.title}
    </h3>
    <p className="w-3/4 max-w-xl text-center text-lg md:text-lg">
      {offer.description}
    </p>
    {viewOnly ? null : (
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
    )}
  </div>
);

export default OffersCarousel;
