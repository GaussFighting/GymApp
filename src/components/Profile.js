import React from "react";
import TotalActivities from "./ProfileChart/TotalActivities";
import TableActivities from "./ProfileChart/TableActivities";
import WeightChart from "./ProfileChart/WeightChart";
import CurrentYearCallendar from "./ProfileChart/CurrentYearCallendar";
import DayOfTheWeekDiagram from "./ProfileChart/DayOfTheWeekDiagram";

const Profile = () => {
  return (
    <div className="mt-5">
      <h1 className="my-3">Profile</h1>
      <h2 className="my-3">
        <strong>Krzysztof Kowerczyk</strong>
      </h2>
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
