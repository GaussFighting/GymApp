import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import TotalActivities from "./ProfileChart/TotalActivities";
import TableActivities from "./ProfileChart/TableActivities";
import WeightChart from "./ProfileChart/WeightChart";
import ActivityCallendar from "./ProfileChart/ActivityCallendar";
import DayOfTheWeekDiagram from "./ProfileChart/DayOfTheWeekDiagram";

const Profile = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const dataOfUser = async () => {
      const res = await fetch("/.netlify/functions/userDataCreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: window.localStorage.getItem("token") }),
      });
      const dataOfUserResponse = await res.json();
      console.log("RES", dataOfUserResponse);
      setUserData(dataOfUserResponse);
      if (dataOfUserResponse === "token expired") {
        alert("Token expired login again");
        window.localStorage.clear();
        window.location.href = "/";
      }
    };
    dataOfUser();
  }, []);

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./";
  };

  return (
    <div className="mt-5">
      <h1 className="my-3">Profile</h1>{" "}
      <h2 className="my-3">
        <strong>
          {userData.firstname} {userData.lastname}
        </strong>
      </h2>
      <TotalActivities />
      <TableActivities />
      <ActivityCallendar />
      <WeightChart />
      <DayOfTheWeekDiagram />
      <div className="mb-5">
        <Button
          color="primary"
          className="add-new-template-cancel-button center-block "
          onClick={(e) => logOut(e)}>
          Log Out
        </Button>
      </div>
      <div className="spacer"></div>
    </div>
  );
};

export default Profile;
