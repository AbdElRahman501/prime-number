import { companies as baseCompanies } from "@/constants";
import { Company } from "@/types";
import CompanyLogoIcons from "./icons/logos";
import { countProductsByCompanies } from "@/lib/actions/product.actions";
import { mergeCompanyProductCounts } from "@/utils";
import Link from "next/link";

const Companies: React.FC = async () => {
  const productCounts = await countProductsByCompanies(
    baseCompanies.map((c) => c.name),
  );
  const companies = mergeCompanyProductCounts(baseCompanies, productCounts);
  return (
    <section aria-labelledby="companies" className="bg-background">
      <h2 id="companies" className="sr-only">
        جميع شركات الاتصالات المصريه متاحه فودافون و اوراج واتصالات و وي
      </h2>
      <div className="w-full rounded-b-[50px] bg-white p-5 py-12 md:rounded-b-[75px]">
        <div className="scroll-bar-hidden container mx-auto flex justify-around gap-10 overflow-x-auto text-primary">
          {companies.map((company) => (
            <CompanyCard key={company.name} {...company} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const CompanyCard: React.FC<Company> = ({
  htmlTitle,
  name,
  color,
  count,
}) => {
  return (
    <Link href={`/shop?ctf=${name}`}>
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
            aria-label={` ${count} متاح الان`}
          >
            {count} رقم متاح
          </p>
        </div>
        <CompanyLogoIcons
          name={name}
          className="aspect-square h-full"
          viewBox="0 0 50 50"
        />
      </div>
    </Link>
  );
};

export default Companies;
