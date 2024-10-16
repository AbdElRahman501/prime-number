import { Icon } from "@iconify/react";

const Hero: React.FC = () => {
  return (
    <section
      className="rounded-b-[50px] bg-background md:rounded-b-[75px]"
      role="banner"
    >
      <div className="mx-auto flex h-[75vh] items-center justify-around gap-4 p-5 text-center md:w-5/6">
        {/* next Button */}
        <button
          className="group rounded-full bg-foreground p-3 text-lg text-primary transition-colors hover:bg-primary hover:text-background md:text-2xl"
          aria-label="Next banner"
        >
          <Icon
            icon="bi:arrow-right"
            className="transition-transform duration-300 group-hover:scale-125"
          />
        </button>

        {/* Main Content */}
        <div className="m-auto flex max-w-lg flex-col items-center justify-center space-y-8 text-primary">
          <p className="text-4xl font-bold md:text-7xl">01015753392</p>
          <h1
            className="text-3xl font-bold md:text-5xl md:leading-tight"
            role="heading"
            aria-level={1}
          >
            أحصل علي رقمك المميز الان
          </h1>
          <p className="text-lg">
            قم باضافة نص وهمي المميز لتصميم الموقع الخاص بك من خلال اي شي قم
            باضافه المزيد من النصوص الوهميه ها
          </p>
          <a
            href="#buy"
            className="flex items-center justify-center gap-3 rounded-full bg-primary px-10 py-3 text-2xl font-semibold text-white hover:opacity-90 focus:outline-none focus:ring focus:ring-inset focus:ring-blue-300"
            role="button"
            aria-label="Buy Now"
          >
            <span>شراء الان</span>
            <Icon icon="ri:whatsapp-fill" />
          </a>
        </div>
        {/* Previous Button */}
        <button
          className="group rounded-full bg-foreground p-3 text-2xl text-primary transition-colors hover:bg-primary hover:text-background"
          aria-label="Previous banner"
        >
          <Icon
            icon="bi:arrow-left"
            className="transition-transform duration-300 group-hover:scale-125"
          />
        </button>
      </div>
    </section>
  );
};

export default Hero;
