import { companies, phoneNumbers } from "@/constants";
import { Company, PhoneNumber } from "@/types";
import LogoIcons from "./icons/logos";

const Companies: React.FC = () => {
  return (
    <section aria-labelledby="اسماء الشركات" className="bg-background">
      <h2 id="companies-title" className="sr-only">
        شركات الاتصالات المتاحة
      </h2>
      <div className="scroll-bar-hidden flex justify-around gap-10 overflow-x-auto rounded-b-[50px] bg-white p-5 py-12 text-primary md:rounded-b-[75px] md:px-20">
        {companies.map((company) => (
          <CompanyCard
            key={company.name}
            {...company}
            phoneNumbers={phoneNumbers}
          />
        ))}
      </div>
    </section>
  );
};

const CompanyCard: React.FC<Company & { phoneNumbers: PhoneNumber[] }> = ({
  htmlTitle,
  name,
  color,
  phoneNumbers,
}) => {
  const totalAvailable = phoneNumbers.filter((p) => p.company === name).length;
  return (
    <div className="flex min-w-52 justify-end gap-2">
      <div>
        {htmlTitle ? (
          <div
            className="text-left font-inter text-3xl"
            style={{ color }}
            dangerouslySetInnerHTML={{ __html: htmlTitle }}
          />
        ) : (
          <h2
            className="text-left font-inter text-3xl font-bold"
            style={{ color }}
          >
            {name}
          </h2>
        )}
        <p
          className="text-right text-xs"
          aria-label={` ${totalAvailable} متاح الان`}
        >
          {totalAvailable} رقم متاح
        </p>
      </div>
      <LogoIcons name={name} className="h-16 w-16" viewBox="0 0 50 50" />
    </div>
  );
};

export default Companies;
