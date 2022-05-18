import React, { useState, useEffect } from "react";
import ChooseExercise from "./ChooseExercise";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AddNewTemplate() {
  const [addedExercises, setAddedExercises] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [formTemplate, setFormTemplate] = useState({});
  // const template = {
  //   id: "234",
  //   templateName: "asdf",
  //   descirption: "test",
  //   exercises: [
  //     {
  //       id: "1",
  //       equipment: "Barebell",
  //       exerciseName: "bench press",
  //       bodyPart: "Chest",
  //       sets: "5",
  //     },
  //     {
  //       id: "2",
  //       equipment: "Barebell",
  //       exerciseName: "bench press",
  //       bodyPart: "Chest",
  //       sets: "5",
  //     },
  //   ],
  // };
  const navigate = useNavigate();

  function updateFormTemplate(value) {
    return setFormTemplate((prev) => {
      return { ...prev, ...value };
    });
  }
  console.log(formTemplate);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/templates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formTemplate),
      });
    } catch (error) {
      console.log(error);
    }

    setFormTemplate({
      templateName: "",
      description: "",
      templateExercises: [],
    });
    navigate("/templatelist");
  }

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

  useEffect(() => {
    setFormTemplate((prev) => {
      return {
        ...prev,
        templateExercises: addedExercises,
      };
    });
  }, [addedExercises]);

  let exercisesForTemplate = addedExercises.map((exercise, idx) => (
    <ListGroupItem
      className="text-align-exercise text-uppercase"
      key={exercise.id}
    >
      <Row className="text-wraper">
        <Col xs="1" md="1">
          {idx + 1}
        </Col>
        <Col xs="5" md="5">
          {exercise.nameEn}
        </Col>
        <Col xs="3" md="3">
          {exercise.bodyPart}
        </Col>
        <Col xs="3" md="3">
          {exercise.equipment}
        </Col>
      </Row>
      <Row>
        <Col xs="4" md="6">
          <Button
            className="delete-button"
            onClick={() => {
              setAddedExercises((exercises) => {
                return exercises.filter((ex) => {
                  return ex.id !== exercise.id;
                });
              });
            }}
          >
            DELETE
          </Button>
        </Col>
        <Col xs="4" md="3">
          <FormGroup className="add-new-template-input">
            <Label for="exampleEmail">Enter number of sets</Label>
          </FormGroup>
        </Col>
        <Col xs="4" md="3">
          <Form>
            {" "}
            <FormGroup className="add-new-template-input">
              {/* <Label for="exampleEmail">Number of sets</Label> */}
              <Input
                className="input"
                type="number"
                value={exercise.sets}
                onChange={(event) => {
                  setAddedExercises((prev) => {
                    return prev.map((ex) => {
                      if (ex.id === exercise.id) {
                        return {
                          ...exercise,
                          sets: parseInt(event.target.value),
                        };
                      }
                      return ex;
                    });
                  });
                  console.log(event.target.value);
                }}
              ></Input>
            </FormGroup>
          </Form>
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
          onChange={(event) =>
            updateFormTemplate({ templateName: event.target.value })
          }
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
          onChange={(event) =>
            updateFormTemplate({ description: event.target.value })
          }
        />
      </FormGroup>
      <ListGroup>{exercisesForTemplate}</ListGroup>

      <FormGroup>
        <ChooseExercise
          setAddedExercises={setAddedExercises}
          addedExercises={addedExercises}
        />
      </FormGroup>
      <FormGroup>
        <Button
          onClick={(e) => onSubmit(e)}
          className="add-new-template-cancel-button"
        >
          SUBMIT
        </Button>
      </FormGroup>
      <div className="spacer"></div>
    </Form>
  );
}

export default AddNewTemplate;
