// lib/fetchAnalyticsData.ts
import { Dimension, Metric } from "@/types";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL || "",
    private_key: (process.env.GA_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
  },
});

// Common function to fetch data
// TODO : improve  it to have cache
export const fetchData = async (metric: Metric, dimension: Dimension) => {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.GA_PROPERTY_ID}`,
    dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
    metrics: [{ name: metric }],
    dimensions: [{ name: dimension }],
  });
  return (
    response.rows?.map((row) => ({
      date: row.dimensionValues?.[0].value,
      value: row.metricValues?.[0].value,
    })) || []
  );
};
