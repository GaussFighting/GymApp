import React from "react";
import TotalActivities from "./ProfileChart/TotalActivities";
import TableActivities from "./ProfileChart/TableActivities";
import WeightChart from "./ProfileChart/WeightChart";
import CurrentYearCallendar from "./ProfileChart/CurrentYearCallendar";
import DayOfTheWeekDiagram from "./ProfileChart/DayOfTheWeekDiagram";

const Profile = () => {
  return (
    <div>
      Profile
      <TotalActivities />
      <TableActivities />
      <WeightChart />
      <CurrentYearCallendar />
      <DayOfTheWeekDiagram />
      <div className="spacer"></div>
    </div>
  );
};

export default Profile;
