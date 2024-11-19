import { fetchReviews } from "@/lib/actions/reviews.actions";
import TestimonialCarousel from "./TestimonialCarousel";

const Testimonial: React.FC = async () => {
  const reviews = await fetchReviews();
  if (!reviews || reviews.length === 0) return null;
  return (
    <div className="w-full bg-background py-16 text-primary">
      <h2 className="mb-8 text-center text-3xl font-bold">آراء عملائنا</h2>
      <TestimonialCarousel reviews={reviews} />
    </div>
  );
};

export default Testimonial;
