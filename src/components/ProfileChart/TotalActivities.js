import React from "react";
import useFetchResults from "../../hooks/useFetchResults";

const TotalActivities = () => {
  const { count } = useFetchResults({
    countTrainings: true,
  });
  console.log("results", count);
  return (
    <div>
      TotalActivities
      <div className="spacer"></div>
    </div>
  );
};

export default TotalActivities;
