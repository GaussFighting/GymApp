import React from "react";
import useFetchResults from "../../hooks/useFetchResults";

const WeightChart = () => {
  const { results } = useFetchResults({
    countWeights: true,
  });
  console.log("weight", results);
  return (
    <div>
      WeightChart
      <div className="spacer"></div>
    </div>
  );
};

export default WeightChart;
