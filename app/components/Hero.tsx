import { Icon } from "@iconify/react";

const Hero = () => {
  return (
    <section className="bg-background" role="banner">
      <div className="mx-auto flex w-5/6 items-center justify-around p-6 text-center">
        {/* next Button */}
        <button
          className="group rounded-full text-2xl bg-foreground p-3 text-primary transition-colors hover:bg-primary hover:text-background"
          aria-label="Next banner"
        >
          <Icon icon="bi:arrow-right" className="group-hover:scale-125 duration-300 transition-transform" />
        </button>

        {/* Main Content */}
        <div className="my-20 flex max-w-lg flex-col items-center justify-center space-y-8 text-primary">
          <p className="text-7xl font-bold">01015753392</p>
          <h1
            className="text-5xl font-bold leading-tight"
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
            className="flex items-center justify-center gap-3 rounded-full bg-primary px-6 py-3 text-2xl font-semibold text-white hover:opacity-90 focus:outline-none focus:ring focus:ring-inset focus:ring-blue-300"
            role="button"
            aria-label="Buy Now"
          >
            <span>شراء الان</span>
            <Icon icon="ri:whatsapp-fill" />
          </a>
        </div>
        {/* Previous Button */}
        <button
          className="group rounded-full text-2xl bg-foreground p-3 text-primary transition-colors hover:bg-primary hover:text-background"
          aria-label="Previous banner"
        >
          <Icon icon="bi:arrow-left" className="group-hover:scale-125 duration-300 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
