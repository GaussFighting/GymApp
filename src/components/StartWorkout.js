import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import StartAnEmptyWorkout from "./StartAnEmptyWorkout";

function StartWorkout() {
  return (
    <div>
      <div>Quick Start</div>
      <StartAnEmptyWorkout />
      <div> Templates</div>
      <Button className="start-workout-button">
        <Link className="start-workout-navlink" to="/addnewtemplate">
          Add a New Templates
        </Link>
      </Button>
      <Button className="start-workout-button">
        <Link className="start-workout-navlink" to="/templatelist">
          List of Templates
        </Link>
      </Button>
    </div>
  );
}

export default StartWorkout;
