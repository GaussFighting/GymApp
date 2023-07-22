import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { Row } from "react-bootstrap";

const StartWorkout = () => {
  return (
    <div>
      <Row>
        <Link to="/choosetemplate">
          <Button color="primary">START WORKOUT</Button>
        </Link>
      </Row>
      <Row>
        {" "}
        <Link to="/emptyworkout">
          <Button color="primary">EMPTY WORKOUT</Button>
        </Link>
      </Row>
      <Row>
        {" "}
        <Link to="/addnewtemplate">
          <Button color="primary">NEW TEMPLATE</Button>
        </Link>
      </Row>
      <Row>
        {" "}
        <Link to="/templatelist">
          <Button color="primary">LIST OF TEMPLATES</Button>
        </Link>
      </Row>
    </div>
  );
};

export default StartWorkout;
