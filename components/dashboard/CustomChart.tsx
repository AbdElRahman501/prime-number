// components/CustomChart.tsx
"use client";
import React from "react";
import { Chart } from "react-google-charts";
import { CartType, Row } from "@/types";
import { formatDate } from "@/utils";

interface Props {
  data: Row[];
  type?: CartType;
}

const CustomChart: React.FC<Props> = ({ data, type }) => {
  // Prepare the data for Google Charts
  const chartData = [
    ["Date", "Value"], // Google Charts requires the first row to contain column names
    ...data.map((row) => [formatDate(row.date), Number(row.value)]),
  ];
  // TODO : make it start from 0 at day before the last day
  const options = {
    curveType: "function",
    legend: { position: "none" },
    hAxis: {
      gridlines: { color: "transparent" }, // Hide x-axis gridlines
      baselineColor: "transparent",
    },
    vAxis: {
      gridlines: { color: "transparent" }, // Hide y-axis gridlines
      baselineColor: "transparent",
    },
    chartArea: {
      left: 30, // Adjust left margin
      top: 10, // Adjust top margin
      right: 10, // Adjust right margin
      bottom: 30, // Adjust bottom margin
    },
  };

  // Determine which chart to render based on the type prop
  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <Chart
            chartType="LineChart"
            data={chartData}
            options={options}
            width="100%"
            height="100%"
          />
        );
      case "bar":
        return (
          <Chart
            chartType="ColumnChart"
            data={chartData}
            options={options}
            width="100%"
            height="100%"
          />
        );
      case "pie":
        return (
          <Chart
            chartType="PieChart"
            data={chartData}
            options={options}
            width="100%"
            height="100%"
          />
        );
      case "doughnut":
        return (
          <Chart
            chartType="PieChart"
            data={chartData}
            options={options}
            width="100%"
            height="100%"
          />
        );
      default:
        return (
          <Chart
            chartType="LineChart"
            data={chartData}
            options={options}
            width="100%"
            height="100%"
          />
        );
    }
  };

  return <>{renderChart()}</>;
};

export default CustomChart;
