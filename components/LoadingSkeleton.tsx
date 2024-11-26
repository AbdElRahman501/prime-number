export const ProductSliderSkeleton: React.FC = () => {
  return (
    <section
      role="status"
      aria-busy="true"
      className="bg-background p-5 py-10 pb-16 text-white lg:px-20"
    >
      <span className="sr-only">Content is loading...</span>
      <div className="rounded-4xl container mx-auto flex animate-pulse flex-col gap-4">
        <div className="title flex items-center justify-between">
          <h2 className="bg-white text-3xl font-bold uppercase md:text-4xl">
            افضل الارقام المميزه
          </h2>
          <div
            className="group flex items-center gap-1 rounded-full text-sm md:text-base"
            aria-label="View all"
          >
            <div className="whitespace-nowrap bg-white uppercase">عرض الكل</div>
            <span className="duration-300" />
          </div>
        </div>
        <div className="relative">
          <div
            className="scroll-bar-hidden flex w-full gap-4 overflow-x-scroll"
            aria-label="Product slider"
          >
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductCard: React.FC = () => {
  return (
    <div className="flex h-full w-full min-w-[265px] flex-col justify-between rounded-3xl bg-foreground pt-6 text-white">
      <div className="bg-background py-3">
        <h3 className="bg-white text-center text-4xl font-bold">0123456789</h3>
      </div>
      <div className="flex justify-between p-3 pb-0">
        <h4 className="max-w-[40%] overflow-hidden text-nowrap bg-white font-bold">
          رقم مميز
        </h4>
        <h4 className="text-nowrap bg-white text-lg font-bold">15000000000</h4>
      </div>
      <div className="flex items-center justify-between p-3">
        <span className="h-10 w-10 rounded-full bg-white"></span>
        <div className="flex gap-2">
          <div className="h-10 w-10 rounded-full bg-white"></div>
          <div className="h-10 w-10 rounded-full bg-white"></div>
          <div className="h-10 w-10 rounded-full bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export const HeroSkeleton: React.FC = () => {
  return (
    <section
      className="rounded-b-[50px] bg-background md:rounded-b-[75px]"
      aria-busy="true"
    >
      <div className="container relative mx-auto flex h-[75vh] max-h-[800px] min-h-[500px] items-center justify-around gap-4 p-5 text-center md:w-5/6"></div>
    </section>
  );
};

export const TestimonialSkeleton: React.FC = () => {
  return (
    <div aria-busy="true" className="w-full bg-background py-16 text-primary">
      <h2 className="mb-8 text-center text-3xl font-bold">آراء عملائنا</h2>
      <div className="relative w-full">
        {/* TestimonialCarousel */}
        <div className="scroll-bar-hidden flex w-full snap-x snap-mandatory gap-5 overflow-x-auto md:gap-10">
          <div className="flex h-60 min-w-[calc(15vw-20px)] snap-center items-center justify-center rounded-l-[50px] md:min-w-[calc(15vw-50px)]"></div>
          <div className="flex h-60 min-w-[70vw] animate-pulse snap-center items-center justify-center rounded-[50px] bg-white p-10"></div>
          <div className="flex h-full min-w-[calc(15vw-20px)] snap-center items-center justify-center rounded-r-[50px] md:min-w-[calc(15vw-50px)]"></div>
        </div>
      </div>
    </div>
  );
};

export const FeatureSkeleton: React.FC = () => {
  return (
    <section
      className="min-h-60 px-5 py-20 md:px-20"
      aria-busy="true"
    ></section>
  );
};
