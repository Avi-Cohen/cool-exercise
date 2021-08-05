import React from "react";
import { Line } from "react-chartjs-2";

export default function LineChart({results}) {
  const data = {
    labels: Object.keys(results[0]).slice(2),
    datasets: [
      {
        label: Object.values(results[0])[1],
        data: Object.values(results[0]).slice(2),
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: Object.values(results[1])[1],
        data: Object.values(results[1]).slice(2),
        borderColor: "#742774"
      },
      {
        label: Object.values(results[2])[1],
        data: Object.values(results[2]).slice(2),
        borderColor: "#238359"
      }
    ],
  };
  return (
    <div>
      results
      <Line data={data}/>
    </div>
  );
}
