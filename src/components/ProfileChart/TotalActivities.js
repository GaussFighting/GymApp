import React from "react";
import useFetchResults from "../../hooks/useFetchResults";

const TotalActivities = () => {
  const { count } = useFetchResults({
    countTrainings: true,
  });
  console.log("TotalActivities", count);
  return (
    <div>
      <h4>Total number of trainings : {count}</h4>
      <div className="spacer"></div>
    </div>
  );
};

export default TotalActivities;
