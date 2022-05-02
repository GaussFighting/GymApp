import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import StartAnEmptyWorkout from "./StartAnEmptyWorkout";
import TemplatesList from "./TemplatesList";

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
      <div>Example Templates</div>
      <TemplatesList />
    </div>
  );
}

export default StartWorkout;
