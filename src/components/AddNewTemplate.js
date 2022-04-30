import React, { useState, useEffect } from "react";
import ChooseExercise from "./ChooseExercise";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";

function AddNewTemplate() {
  const [addedExercises, setAddedExercises] = useState([]);

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await fetch("http://localhost:5000/");

      const responseData = await response.json();
      const loadedExercises = [];

      for (const key in responseData) {
        loadedExercises.push({
          id: responseData[key]._id,
          nameEn: responseData[key].nameEn,
          bodyPart: responseData[key].bodyPart,
          equipment: responseData[key].equipment,
        });
      }
      setExercises(loadedExercises);
    };

    fetchExercises();
  }, []);
  console.log(addedExercises);

  let exercisesForTemplate = addedExercises.map((exercise, idx) => (
    <ListGroupItem
      className="text-align-exercise text-uppercase"
      key={exercise.id}
    >
      <Row>
        <Col xs="1" md="1">
          {idx + 1}
        </Col>
        <Col xs="4" md="5">
          {exercise.nameEn}
        </Col>
        <Col xs="3" md="2">
          {exercise.bodyPart}
        </Col>
        <Col xs="3" md="3">
          {exercise.equipment}
        </Col>
        <Col xs="1" md="1">
          <Button> - </Button>
        </Col>
      </Row>
    </ListGroupItem>
  ));

  return (
    <Form>
      <FormGroup className="add-new-template-input">
        <Label for="exampleEmail">Name</Label>
        <Input
          className="input"
          type="text"
          placeholder="Put template name"
          // value={}
          onChange={(event) => {}}
        ></Input>
      </FormGroup>
      <FormGroup className="add-new-template-input">
        <Label for="exampleText">Descritpion</Label>
        <Input
          type="textarea"
          name="text"
          id="exampleText"
          placeholder="Descritpion"
          className="add-new-template-input-position"
        />
      </FormGroup>
      <ListGroup>{exercisesForTemplate}</ListGroup>
      <FormGroup>
        <ChooseExercise
          setAddedExercises={setAddedExercises}
          addedExercises={addedExercises}
        />
      </FormGroup>
      <Button className="add-new-template-cancel-button">Submit</Button>
      <div className="spacer"></div>
    </Form>
  );
}

export default AddNewTemplate;
