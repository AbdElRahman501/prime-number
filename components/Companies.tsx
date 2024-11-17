import { companies } from "@/constants";
import { Company } from "@/types";
import CompanyLogoIcons from "./icons/logos";

const Companies: React.FC = () => {
  return (
    <section aria-labelledby="companies" className="bg-background">
      <h2 id="companies" className="sr-only">
        جميع شركات الاتصالات المصريه متاحه فودافون و اوراج واتصالات و وي
      </h2>
      <div className="w-full overflow-hidden rounded-b-[50px] bg-white p-5 py-12 md:rounded-b-[75px]">
        <div className="flex flex-nowrap items-center justify-center">
          <div className="flex max-w-none animate-marquee flex-nowrap gap-12 whitespace-nowrap px-6 text-3xl font-black">
            {companies.map((company) => (
              <CompanyCard key={company.name} {...company} />
            ))}
          </div>
          <div className="flex max-w-none animate-marquee flex-nowrap gap-12 whitespace-nowrap px-6 text-3xl font-black">
            {companies.map((company) => (
              <CompanyCard key={company.name} {...company} />
            ))}
          </div>
          <div className="flex max-w-none animate-marquee flex-nowrap gap-12 whitespace-nowrap px-6 text-3xl font-black">
            {companies.map((company) => (
              <CompanyCard key={company.name} {...company} />
            ))}
          </div>
          <div className="hidden max-w-none animate-marquee flex-nowrap gap-12 whitespace-nowrap px-6 text-3xl font-black md:flex">
            {companies.map((company) => (
              <CompanyCard key={company.name} {...company} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const CompanyCard: React.FC<Company> = ({ htmlTitle, name, color }) => {
  return (
    <div className="flex h-10 justify-end gap-2 text-left font-inter text-3xl">
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
      </div>
      <CompanyLogoIcons
        name={name}
        className="aspect-square h-full"
        viewBox="0 0 50 50"
      />
    </div>
  );
};

export default Companies;
