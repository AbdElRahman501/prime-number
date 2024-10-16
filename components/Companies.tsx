import { companies } from "@/constants";
import { Company } from "@/types";
import Image from "next/image";

const Companies: React.FC = () => {
  return (
    <section aria-labelledby="companies-title" className="bg-background">
      <h2 id="companies-title" className="sr-only">
        شركات الاتصالات المتاحة
      </h2>
      <div className="scroll-bar-hidden flex items-baseline justify-around gap-6 overflow-x-auto rounded-b-[50px] bg-white p-5 py-12 text-primary md:rounded-b-[75px] md:px-20">
        {companies.map((company) => (
          <CompanyCard key={company.name} {...company} />
        ))}
      </div>
    </section>
  );
};

const CompanyCard: React.FC<Company> = ({ number, image }) => {
  return (
    <div className="relative flex min-h-[45px] min-w-48">
      <Image
        src={image}
        alt="Orange logo"
        priority={true}
        fill
        className="h-[45px] w-auto object-contain"
      />

      <p
        className="absolute -bottom-2 right-0 text-xs"
        aria-label="12 رقم متاح لشركة فودافون"
      >
        {number} رقم متاح
      </p>
    </div>
  );
};

export default Companies;
