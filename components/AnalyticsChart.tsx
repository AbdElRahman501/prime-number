import { fetchData } from "@/lib/fetchAnalyticsData";
import { CartType, Metric, Row } from "@/types";
import CustomChart from "./dashboard/CustomChart";

// add props of div like this for button ButtonHTMLAttributes<HTMLButtonElement>
const AnalyticsChart: React.FC<{
  className?: string;
  metric: Metric;
  type?: CartType;
}> = async ({ className, type, metric }) => {
  const data = (await fetchData(metric, "date")) as Row[];
  if (!data) return <div>No data found</div>;
  return (
    <div className={className}>
      <CustomChart data={data} type={type} />
    </div>
  );
};

export default AnalyticsChart;
