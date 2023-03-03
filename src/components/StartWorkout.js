import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { Row } from "react-bootstrap";

const StartWorkout = () => {
  return (
    <div>
      <Row>
        <Button color="primary">
          <Link to="/choosetemplate">START WORKOUT FROM TEMPLATE</Link>
        </Button>
      </Row>
      <Row>
        <Button color="primary">
          <Link to="/emptyworkout">START AN EMPTY WORKOUT</Link>
        </Button>
      </Row>
      <Row>
        <Button color="primary">
          <Link to="/addnewtemplate">ADD A NEW TEMPLATE</Link>
        </Button>
      </Row>
      <Row>
        <Button color="primary">
          <Link to="/templatelist">LIST OF TEMPLATES</Link>
        </Button>
      </Row>
    </div>
  );
};

export default StartWorkout;
