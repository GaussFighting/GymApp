import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

function StartWorkout() {
  return (
    <div>
      <Button className="start-workout-button">
        <Link className="start-workout-navlink" to="/templateworkout">
          Start Workout from Template
        </Link>
      </Button>
      <Button className="start-workout-button">
        <Link className="start-workout-navlink" to="/startworkoutfromtemplate">
          Start an Empty Workout
        </Link>
      </Button>
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
