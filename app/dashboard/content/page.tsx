import AboutForm from "@/components/AboutForm";
import { getAllAboutDate } from "@/lib/actions/about.actions";
const page = async () => {
  const aboutData = await getAllAboutDate();
  return (
    <div className="flex-1">
      <AboutForm aboutData={aboutData} />
    </div>
  );
};

export default page;
