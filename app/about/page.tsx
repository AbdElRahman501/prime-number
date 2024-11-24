import { FeatureBlock, HeaderBlock, ParagraphBlock } from "@/components/Blocks";
import { getAboutData } from "@/lib/actions/about.actions";
import { fetchStore } from "@/lib/actions/store.actions";
import { createWhatsAppLink } from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export default async function page() {
  const store = await fetchStore();
  const aboutData = await getAboutData();
  return (
    <div className="bg-background py-10">
      <main className="container mx-auto px-6" aria-labelledby="about-heading">
        {aboutData.map((block, index) => {
          switch (block.type) {
            case "header":
              return <HeaderBlock key={index} block={block} />;
            case "paragraph":
              return <ParagraphBlock key={index} content={block.content} />;
            case "features":
              return <FeatureBlock key={index} content={block.content} />;
            default:
              return null;
          }
        })}
        <div className="flex items-center justify-center gap-3">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={createWhatsAppLink(store.contacts.phoneNumber)}
            className="flex max-w-96 items-center justify-center gap-3 rounded-full bg-primary px-10 py-3 text-2xl font-semibold text-white hover:opacity-90 focus:outline-none focus:ring focus:ring-inset focus:ring-blue-300"
            role="button"
            aria-label="تواصل معنا"
          >
            <span>تواصل معنا</span>
            <Icon icon="ri:whatsapp-fill" />
          </Link>
        </div>
      </main>
    </div>
  );
}
