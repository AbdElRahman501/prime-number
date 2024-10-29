import { companies, phoneNumbers } from "@/constants";
import { Company, PhoneNumber } from "@/types";
import LogoIcons from "./icons/logos";

const Companies: React.FC = () => {
  return (
    <section aria-labelledby="companies" className="bg-background">
      <h2 id="companies" className="sr-only">
        جميع شركات الاتصالات المصريه متاحه فودافون و اوراج واتصالات و وي
      </h2>
      <div className="w-full rounded-b-[50px] bg-white p-5 py-12 md:rounded-b-[75px]">
        <div className="scroll-bar-hidden container mx-auto flex justify-around gap-10 overflow-x-auto text-primary">
          {companies.map((company) => (
            <CompanyCard
              key={company.name}
              {...company}
              phoneNumbers={phoneNumbers}
            />
          ))}
        </div>
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
    <div className="flex h-16 justify-end gap-2 text-left font-inter text-3xl">
      <div>
        {htmlTitle ? (
          <div
            style={{ color }}
            dangerouslySetInnerHTML={{ __html: htmlTitle }}
          />
        ) : (
          <h3 className="font-bold drop-shadow-lg" style={{ color }}>
            {name}
          </h3>
        )}
        <p
          className="text-right text-base"
          aria-label={` ${totalAvailable} متاح الان`}
        >
          {totalAvailable} رقم متاح
        </p>
      </div>
      <LogoIcons
        name={name}
        className="aspect-square h-full"
        viewBox="0 0 50 50"
      />
    </div>
  );
};

export default Companies;
