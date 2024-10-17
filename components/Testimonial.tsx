import { Icon } from "@iconify/react/dist/iconify.js";

interface Review {
  _id: number;
  name: string;
  review: string;
}

const reviews: Review[] = [
  {
    _id: 1,
    name: "John Doe",
    review:
      "تجربتي مع هذا الموقع كانت رائعة. اخترت الرقم المثالي لي بكل سهولة، والعملية كلها كانت سلسة وسريعة. شكراً لفريق الدعم الرائع!",
  },
  {
    _id: 2,
    name: "Jane Smith",
    review:
      "لطالما كنت أبحث عن رقم مميز يعكس شخصيتي، وهذا الموقع وفّر لي خيارات لا حصر لها. أنصح الجميع باستخدام خدماتهم!",
  },
  {
    _id: 3,
    name: "Bob Johnson",
    review:
      "خدمة العملاء ممتازة! أجابوا على كل استفساراتي وساعدوني في العثور على الرقم المثالي لأعمالي التجارية.",
  },
];

const Testimonial = () => {
  return (
    <div className="w-full bg-gray-100 py-16 text-primary">
      <h2 className="mb-8 text-center text-3xl font-bold">آراء عملائنا</h2>
      <div className="relative w-full">
        {/* Left navigation button */}
        <div className="absolute left-[15vw] top-0 flex h-full w-10 items-center justify-center">
          <button
            className="group rounded-full bg-foreground p-1 text-primary transition-colors hover:bg-primary hover:text-background md:p-3 md:text-2xl"
            aria-label="Previous banner"
          >
            <Icon
              icon="bi:arrow-left"
              className="transition-transform duration-300 group-hover:scale-125"
            />
          </button>
        </div>

        {/* Testimonial carousel */}
        <div className="scroll-bar-hidden flex w-full snap-x snap-mandatory gap-10 overflow-x-auto">
          <div className="flex h-60 min-w-[calc(15vw-40px)] snap-center items-center justify-center rounded-l-[50px] bg-white md:min-w-[calc(15vw-50px)]"></div>
          {reviews.map((review) => (
            <div
              key={review._id}
              className="flex h-60 min-w-[70vw] snap-center items-center justify-center rounded-[50px] bg-white p-10"
            >
              <div className="m-auto flex flex-col items-center justify-center">
                <p className="mb-4 max-w-lg text-center text-sm text-gray-600 md:text-base">
                  &quot;{review.review}&quot;
                </p>
                <p className="font-semibold">- {review.name}</p>
              </div>
            </div>
          ))}
          <div className="flex h-60 min-w-[calc(15vw-40px)] snap-center items-center justify-center rounded-r-[50px] bg-white md:min-w-[calc(15vw-50px)]"></div>
        </div>

        {/* Right navigation button */}
        <div className="absolute right-[15vw] top-0 flex h-full w-10 items-center justify-center">
          <button
            className="group rounded-full bg-foreground p-1 text-primary transition-colors hover:bg-primary hover:text-background md:p-3 md:text-2xl"
            aria-label="Next banner"
          >
            <Icon
              icon="bi:arrow-right"
              className="transition-transform duration-300 group-hover:scale-125"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
