import { reviews } from "@/constants";

import dynamic from "next/dynamic";
const TestimonialCarousel = dynamic(() => import("./TestimonialCarousel"), {
  ssr: false,
});
const Testimonial: React.FC = () => {
  return (
    <div className="w-full bg-background py-16 text-primary">
      <h2 className="mb-8 text-center text-3xl font-bold">آراء عملائنا</h2>
      <TestimonialCarousel reviews={reviews} />
    </div>
  );
};

export default Testimonial;
