import React from "react";
import useFetchResults from "../../hooks/useFetchResults";

const TableActivities = () => {
  const { count } = useFetchResults({
    countTrainings2023: true,
  });
  console.log("2023", count);
  return (
    <div>
      TableActivities
      <div className="spacer"></div>
    </div>
  );
};

export default TableActivities;
