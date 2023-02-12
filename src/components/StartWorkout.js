import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { Row } from "react-bootstrap";

function StartWorkout() {
  return (
    <div>
      <Row>
        <Button color="primary" className="start-workout-button">
          <Link className="start-workout-navlink" to="/choosetemplate">
            Start Workout from Template
          </Link>
        </Button>
      </Row>
      <Row>
        <Button color="primary" className="start-workout-button">
          <Link className="start-workout-navlink" to="/emptyworkout">
            Start an Empty Workout
          </Link>
        </Button>
      </Row>
      <Row>
        <Button color="primary" className="start-workout-button">
          <Link className="start-workout-navlink" to="/addnewtemplate">
            Add a New Templates
          </Link>
        </Button>
      </Row>
      <Row>
        <Button color="primary" className="start-workout-button">
          <Link className="start-workout-navlink" to="/templatelist">
            List of Templates
          </Link>
        </Button>
      </Row>
    </div>
  );
}

export default StartWorkout;
