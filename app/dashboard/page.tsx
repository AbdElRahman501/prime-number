import AnalyticsChart from "@/components/AnalyticsChart";
import { Suspense } from "react";

const page = () => {
  return (
    <div>
      <div className="container m-5 mx-auto flex flex-col gap-5 px-5">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <Suspense fallback={<p>Loading...</p>}>
            <AnalyticsChart
              className="w-full overflow-hidden rounded-3xl bg-white p-5 text-sm text-primary shadow-sm"
              metric="activeUsers"
              type="line"
            />
          </Suspense>
          <Suspense fallback={<p>Loading...</p>}>
            <AnalyticsChart
              className="w-full overflow-hidden rounded-3xl bg-white p-5 text-sm text-primary shadow-sm"
              metric="sessions"
              type="bar"
            />
          </Suspense>
          <Suspense fallback={<p>Loading...</p>}>
            <AnalyticsChart
              className="w-full overflow-hidden rounded-3xl bg-white p-5 text-sm text-primary shadow-sm md:col-span-2"
              metric="newUsers"
              type="line"
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default page;
