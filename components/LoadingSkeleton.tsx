import { companies } from "@/constants";
import { CompanyCard } from "./Companies";

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

export const CompaniesSkeleton: React.FC = () => {
  return (
    <section aria-labelledby="companies" className="bg-background">
      <h2 id="companies" className="sr-only">
        جميع شركات الاتصالات المصريه متاحه فودافون و اوراج واتصالات و وي
      </h2>
      <div className="w-full rounded-b-[50px] bg-white p-5 py-12 md:rounded-b-[75px]">
        <div className="scroll-bar-hidden container mx-auto flex justify-around gap-10 overflow-x-auto">
          {companies.map((company) => (
            <CompanyCard key={company.name} {...company} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const HeroSkeleton: React.FC = () => {
  return (
    <section
      className="rounded-b-[50px] bg-background text-white md:rounded-b-[75px]"
      aria-labelledby="offers"
    >
      <h2 id="offers" className="sr-only">
        عروض حصريه لارقام مميزه في مصر
      </h2>
      <div
        aria-labelledby="offers"
        className="container relative mx-auto flex h-[75vh] max-h-[800px] min-h-[500px] items-center justify-around gap-4 p-5 text-center md:w-5/6"
      >
        {/* next Button */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2">
          <div className="icon-skeleton h-10 w-10 animate-pulse rounded-full bg-white"></div>
        </div>

        {/* Main Content */}
        <div className="scroll-bar-hidden flex w-full snap-x snap-mandatory overflow-x-auto">
          <div className="m-auto flex min-w-full max-w-lg snap-center flex-col items-center justify-center space-y-8">
            <p className="animate-pulse bg-white text-4xl font-bold sm:text-5xl md:text-7xl">
              <strong>00000000</strong>
            </p>
            <h3
              className="w-4/5 animate-pulse bg-white text-2xl font-bold sm:text-3xl md:text-5xl md:leading-tight"
              aria-level={1}
            >
              رقم مميز
            </h3>
            <p className="w-3/4 max-w-xl animate-pulse bg-white text-center text-lg md:text-lg">
              رقم مميز
            </p>
            <div
              className="flex animate-pulse items-center justify-center gap-3 rounded-full bg-primary bg-white px-10 py-3 text-2xl font-semibold"
              aria-label="شراء الان"
            >
              <span>شراء الان</span>
              <div className="icon-skeleton h-10 w-10 animate-pulse rounded-full bg-white"></div>
            </div>
          </div>
        </div>
        {/* Previous Button */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2">
          <div className="icon-skeleton h-10 w-10 animate-pulse rounded-full bg-white"></div>
        </div>
      </div>
    </section>
  );
};
