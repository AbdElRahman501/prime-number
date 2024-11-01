// lib/fetchAnalyticsData.ts
import { Dimension, Metric } from "@/types";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

// Helper function for environment variable fallback
const getEnv = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is missing`);
  }
  return value;
};

const email = getEnv("GA_CLIENT_EMAIL");
const propertyId = getEnv("GA_PROPERTY_ID");
const privateKey = getEnv("GA_PRIVATE_KEY").replace(/\\n/g, "\n");

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: email || "",

    private_key: (privateKey || "").replace(/\\n/g, "\n"),
  },
});

// Common function to fetch data
// TODO : improve  it to have cache

export const fetchData = async (metric: Metric, dimension: Dimension) => {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
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
  } catch (error) {
    // handel error
    throw new Error(`Environment variable ${error} is missing`);
  }
};
