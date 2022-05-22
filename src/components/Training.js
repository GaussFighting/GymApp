import React from "react";
import { useLocation } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { ListGroup, Row, Col } from "react-bootstrap";

const Training = () => {
  const location = useLocation();
  const loadedTemplate = location.state.templateObj;

  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const typeOfEquipment = loadedTemplate.templateExercises.map(
    (exercise) => exercise.equipment
  );

  let valueOfSets = (exercise) => {
    let arrayOfSets = [];
    for (let i = 0; i < exercise.sets; i++) {
      arrayOfSets.push(<Row>{valueOfExercises(exercise.equipment)}</Row>);
    }
    return arrayOfSets;
  };

  let valueOfExercises = (condition) => {
    if (
      condition === "barebell" ||
      condition === "dumbbell" ||
      condition === "OTHER" ||
      condition === "MACHINE" ||
      condition === "CABLE"
    ) {
      return (
        <Form>
          <span>WEIGHT:</span>
          <Input
            className="input d-inline-block"
            type="number"
            // value={}
          ></Input>
          <span>REPETITION:</span>
          <Input
            className="input d-inline-block"
            type="number"
            // value={}
          ></Input>
        </Form>
      );
    }
    if (
      condition === "weighted bodyweight" ||
      condition === "assisted bodyweight"
    ) {
      return (
        <Form>
          <span>WEIGHT:</span>
          <Input
            className="input d-inline-block"
            type="number"
            // value={}
          ></Input>
          <span>REPETITION:</span>
          <Input
            className="input d-inline-block"
            type="number"
            // value={}
          ></Input>
        </Form>
      );
    }
    if (condition === "cardio") {
      return (
        <Form>
          <span>DISTANCE:</span>
          <Input
            className="input d-inline-block"
            type="number"
            // value={}
          ></Input>
          <span>TIME:</span>
          <Input
            className="input d-inline-block"
            type="number"
            // value={}
          ></Input>
        </Form>
      );
    }
    if (condition === "duration") {
      return (
        <Form>
          <span>TIME:</span>
          <Input
            className="input d-inline-block"
            type="number"
            // value={}
          ></Input>
        </Form>
      );
    }
    if (condition === "reps only") {
      return (
        <Form>
          <span>REPETITION:</span>
          <Input
            className="input d-inline-block"
            type="number"
            // value={}
          ></Input>
        </Form>
      );
    } else {
      return <div>Dude Wrong Equipment!</div>;
    }
  };

  console.log(today);
  console.log(date);
  console.log(typeOfEquipment);
  console.log(location.state.templateObj);
  console.log(location.state.templateObj.descritpion);

  return (
    <div className="main-template-div">
      <ListGroup key={loadedTemplate.id}>
        <Row className="template-row ">
          <Col xs="12" md="12" className="single-col-name">
            {loadedTemplate.templateName.toUpperCase()}
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12">
            {loadedTemplate.descritpion}
          </Col>
        </Row>
        <Row>
          <Col xs="6" md="6">
            DATE: {date}
          </Col>
          <Col xs="6" md="6">
            <Form>
              <span>BODY WEIGHT:</span>
              <Input
                className="input d-inline-block"
                type="number"
                // value={}
              ></Input>
            </Form>
          </Col>
        </Row>

        <Row className="template-row">
          {loadedTemplate.templateExercises.map((exercise, idx) => (
            <Row className="template-row-exercise" key={exercise.id}>
              <Col xs="1" md="2">
                {idx + 1}{" "}
              </Col>
              <Col xs="7" md="8">
                {exercise.nameEn.toUpperCase()}
              </Col>
              <Row>{valueOfSets(exercise)}</Row>
            </Row>
          ))}
        </Row>
      </ListGroup>
    </div>
  );
};

export default Training;
