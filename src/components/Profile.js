import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { Row, Col } from "react-bootstrap";
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
      setUserData(dataOfUserResponse);
      if (dataOfUserResponse === "token expired") {
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
      <Row>
        <Col className="pt-3" sm="6">
          <h1>Profile</h1>{" "}
        </Col>
        <Col sm="6">
          {" "}
          <Button
            color="primary"
            className="center-block "
            onClick={(e) => logOut(e)}>
            LOG OUT
          </Button>
        </Col>
      </Row>
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
      <div className="mb-5"></div>
      <div className="spacer"></div>
    </div>
  );
};

export default Profile;
