"use client";
import { Review } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const TestimonialCarousel: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollLeft;
        const index = Math.round(
          scrollPosition / (containerRef.current.offsetWidth * 0.7),
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
    const nextScrollIndex = (currentIndex + 1) % reviews.length;
    if (containerRef.current) {
      const nextScrollLeft =
        containerRef.current.offsetWidth * nextScrollIndex * 0.7;
      containerRef.current.scrollTo({
        left: -nextScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const scrollToPrev = () => {
    if (containerRef.current && currentIndex > 0) {
      containerRef.current.scrollBy({
        left: containerRef.current.offsetWidth * 0.7,
        behavior: "smooth",
      });
    }
  };
  React.useEffect(() => {
    const interval = setInterval(scrollToNext, 3000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  if (reviews.length === 0) return null;
  return (
    <div className="relative w-full">
      {/* Gradient opacity edges */}
      <div className="absolute right-0 top-0 h-full min-w-[12vw] bg-gradient-to-r from-[#f0efed]/0 via-[#f0efed]/80 to-[#f0efed]/100"></div>
      <div className="absolute left-0 top-0 h-full min-w-[12vw] bg-gradient-to-l from-[#f0efed]/0 via-[#f0efed]/80 to-[#f0efed]/100"></div>

      {/* Left navigation button */}
      <div className="absolute left-[16vw] top-0 flex h-full w-10 items-center justify-center">
        <button
          onClick={scrollToNext}
          className={`${currentIndex === reviews.length - 1 ? "hidden" : ""} group rounded-full bg-foreground p-1 text-primary transition-colors hover:bg-primary hover:text-background md:p-3 md:text-2xl`}
          aria-label="Previous banner"
        >
          <Icon
            icon="bi:arrow-left"
            className="transition-transform duration-300 group-hover:scale-125"
          />
        </button>
      </div>

      {/* Right navigation button */}
      <div className="absolute right-[16vw] top-0 flex h-full w-10 items-center justify-center">
        <button
          onClick={scrollToPrev}
          className={`${currentIndex === 0 ? "hidden" : ""} group rounded-full bg-foreground p-1 text-primary transition-colors hover:bg-primary hover:text-background md:p-3 md:text-2xl`}
          aria-label="Next banner"
        >
          <Icon
            icon="bi:arrow-right"
            className="transition-transform duration-300 group-hover:scale-125"
          />
        </button>
      </div>

      {/* TestimonialCarousel */}
      <div
        ref={containerRef}
        className="scroll-bar-hidden flex w-full snap-x snap-mandatory gap-5 overflow-x-auto md:gap-10"
      >
        <div className="flex h-60 min-w-[calc(15vw-20px)] snap-center items-center justify-center rounded-l-[50px] md:min-w-[calc(15vw-50px)]"></div>
        {reviews.map((review) => (
          <ReviewCard key={review.review} {...review} />
        ))}
        <div className="flex h-full min-w-[calc(15vw-20px)] snap-center items-center justify-center rounded-r-[50px] md:min-w-[calc(15vw-50px)]"></div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;

export const ReviewCard: React.FC<Review & { className?: string }> = ({
  review,
  name,
  className,
}) => {
  return (
    <div
      className={
        className ||
        "flex h-60 min-w-[70vw] snap-center items-center justify-center rounded-[50px] bg-white p-10"
      }
    >
      <div className="m-auto flex flex-col items-center justify-center">
        <p className="mb-4 max-w-lg text-center text-sm text-gray-600 md:text-lg">
          <Icon
            icon="flowbite:quote-solid"
            className="inline text-2xl text-background md:text-4xl"
          />
          {review || ""}
          <Icon
            icon="flowbite:quote-solid"
            className="inline rotate-180 text-2xl text-background md:text-4xl"
          />
        </p>
        <p className="font-semibold md:text-xl">- {name || ""}</p>
      </div>
    </div>
  );
};
