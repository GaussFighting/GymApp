import React, { useState, useEffect, useCallback } from "react";
import ChooseExercise from "./ChooseExercise";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import useFetchExercises from "../hooks/useFetchExercises";

const AddNewTemplate = () => {
  const [addedExercises, setAddedExercises] = useState([]);
  const [formTemplate, setFormTemplate] = useState({});

  const navigate = useNavigate();

  const updateFormTemplate = (value) => {
    return setFormTemplate((prev) => {
      return { ...prev, ...value };
    });
  };

  const onSubmit = useCallback(
    async (e, dataOnSubmit) => {
      e.preventDefault();
      try {
        await fetch(`/.netlify/functions/templateCreate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataOnSubmit),
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
    },
    [navigate]
  );

  // const { exercises } = useFetchExercises();

  useEffect(() => {
    setFormTemplate((prev) => {
      return {
        ...prev,
        templateExercises: addedExercises,
      };
    });
  }, [addedExercises]);

  let exercisesForTemplate = addedExercises.map((exercise, idx) => (
    <ListGroupItem className="text-uppercase" key={exercise.id}>
      <Row className="text-wraper">
        <Col sm="6" md="1">
          {idx + 1}
        </Col>
        <Col sm="6" md="5">
          {exercise.nameEn}
        </Col>
        <Col sm="6" md="3">
          {exercise.bodyPart}
        </Col>
        <Col sm="6" md="3">
          {exercise.equipment}
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="6" xl="3">
          <FormGroup>
            <Label for="exampleEmail">Enter number of sets</Label>
          </FormGroup>
        </Col>
        <Col sm="12" md="6" xl="3">
          <Form>
            {" "}
            <FormGroup>
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
                }}></Input>
            </FormGroup>
          </Form>
        </Col>
        <Col sm="12" md="12" xl="6">
          <Button
            color="primary"
            disabled={!(localStorage.getItem("role") === "Admin")}
            onClick={() => {
              setAddedExercises((exercises) => {
                return exercises.filter((ex) => {
                  return ex.id !== exercise.id;
                });
              });
            }}>
            DELETE
          </Button>
        </Col>
      </Row>
    </ListGroupItem>
  ));
  return (
    <Form>
      <FormGroup>
        <Label for="exampleEmail">Name</Label>
        <Input
          className="input"
          type="text"
          placeholder="Put template name"
          // value={}
          onChange={(event) =>
            updateFormTemplate({ templateName: event.target.value })
          }></Input>
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Descritpion</Label>
        <Input
          type="textarea"
          name="text"
          id="exampleText"
          placeholder="Descritpion"
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
          color="primary"
          onClick={(e) => onSubmit(e, formTemplate)}
          className="add-new-template-cancel-button">
          SUBMIT
        </Button>
      </FormGroup>
      <div className="spacer"></div>
    </Form>
  );
};

export default AddNewTemplate;
