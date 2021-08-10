import React from "react";
import { Line } from "react-chartjs-2";

export default function LineChart({ results }) {
  const graphData = [];
  for (let i = 0; i < 3; i++) {
    const temp = {
      label: Object.values(results[i])[1],
      data: Object.values(results[i]).slice(2),
      borderColor: "rgba(75,192,192,1)",
    };
    graphData.push(temp)
  }
  const data = {
    labels: Object.keys(results[0]).slice(2),
    datasets: graphData,
  };
  return (
    <div>
      results
      <Line data={data} />
    </div>
  );
}
