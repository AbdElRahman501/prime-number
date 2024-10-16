import Image from "next/image";

const Companies = () => {
  return (
    <section aria-labelledby="companies-title" className="bg-background">
      <h2 id="companies-title" className="sr-only">
        شركات الاتصالات المتاحة
      </h2>
      <div className="flex items-baseline justify-around rounded-b-[75px] bg-white p-5 py-7 text-primary md:px-20">
        {/* Vodafone */}
        <div className="relative">
          <Image
            width={200}
            height={200}
            src="/images/vodafone.png"
            alt="Vodafone logo"
            priority={true}
          />
          <p
            className="absolute -bottom-2 left-16 text-xs"
            aria-label="12 رقم متاح لشركة فودافون"
          >
            12 رقم متاح
          </p>
        </div>

        {/* Etisalat */}
        <div className="relative">
          <Image
            width={200}
            height={200}
            src="/images/etisalat.png"
            alt="Etisalat logo"
            priority={true}
          />
          <p
            className="absolute -bottom-2 left-16 text-xs"
            aria-label="12 رقم متاح لشركة فودافون"
          >
            12 رقم متاح
          </p>
        </div>

        {/* Orange */}
        <div className="relative">
          <Image
            width={200}
            height={200}
            src="/images/orange.png"
            alt="Orange logo"
            priority={true}
          />
          <p
            className="absolute -bottom-2 left-16 text-xs"
            aria-label="12 رقم متاح لشركة فودافون"
          >
            12 رقم متاح
          </p>
        </div>

        {/* WE */}
        <div className="relative">
          <Image
            width={200}
            height={200}
            src="/images/we.png"
            alt="WE logo"
            priority={true}
          />
          <p
            className="absolute -bottom-2 left-10 text-xs"
            aria-label="12 رقم متاح لشركة فودافون"
          >
            12 رقم متاح
          </p>
        </div>
      </div>
    </section>
  );
};

export default Companies;
