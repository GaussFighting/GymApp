import React from "react";
import { Link } from "react-router-dom";
import StartAnEmptyWorkout from "./StartAnEmptyWorkout";
import TemplatesList from "./TemplatesList";

function StartWorkout() {
  return (
    <div>
      Quick Start
      <StartAnEmptyWorkout />
      Templates
      <Link className="nav-link" to="/addnewtemplate">
        Add a New Templates
      </Link>
      Example Templates
      <TemplatesList />
    </div>
  );
}

export default StartWorkout;
