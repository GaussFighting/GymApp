import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Row, Col } from "react-bootstrap";
import ChooseExercise from "./ChooseExercise";

function Edit() {
  const [formResult, setFormResult] = useState({
    bodyWeight: "",
    date: "",
    templateName: "",
    description: "",
    templateExercises: [],
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      console.log(id);
      const response = await fetch(
        `/.netlify/functions/resultRead?id=${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setFormResult(record);
    }

    fetchData();
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setFormResult((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedTemplate = {
      bodyWeight: formResult.bodyWeight,
      date: formResult.date,
      templateName: formResult.templateName,
      description: formResult.description,
      templateExercises: formResult.templateExercises,
    };

    // This will send a post request to update the data in the database.
    try {
      await fetch(`/.netlify/functions/resultUpdate?id=${params.id}`, {
        method: "PUT",
        body: JSON.stringify(editedTemplate),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
    console.log(params.id);
    navigate("/templatelist");
  }

  const addExercises = (callback) => {
    setFormResult((prevFormResult) => {
      const pickedExcercises = callback(prevFormResult.templateExercises);
      return {
        ...prevFormResult,
        templateExercises: pickedExcercises,
      };
    });
  };

  return (
    <Form className="edit-form">
      <Row>
        <FormGroup className="form-group">
          <Label for="exampleSelect ">PUT NEW TEMPLATE NAME</Label>
          <Input
            className="input select-name-position"
            type="text"
            placeholder="Search..."
            value={formResult.templateName}
            onChange={(e) => updateForm({ templateName: e.target.value })}
          ></Input>
        </FormGroup>
        <FormGroup className="form-group">
          <Label for="exampleSelect ">PUT NEW DESCRIPTION</Label>
          <Input
            className="input select-name-position descritpion"
            type="textarea"
            placeholder="Search..."
            value={formResult.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          ></Input>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup className="form-group">
          <Label for="exampleSelect">List of Exercises</Label>
        </FormGroup>

        <Row>
          {formResult.templateExercises &&
            formResult.templateExercises.map((exercise, idx) => (
              <Row className="template-single-row-exercise" key={exercise.id}>
                <Col xs="1" md="1" className="px-0 single-col">
                  {idx + 1}{" "}
                </Col>
                <Col xs="2" md="3" className="px-0 single-col">
                  {exercise.nameEn.toUpperCase()}
                </Col>
                <Col xs="2" md="2" className="px-0 single-col">
                  {" "}
                  {exercise.bodyPart.toUpperCase()}
                </Col>
                <Col xs="3" md="3" className="px-0 single-col">
                  {" "}
                  {exercise.equipment.toUpperCase()}
                </Col>
                <Col xs="2" md="1" className="px-0 sets">
                  <Input
                    className="input-sets"
                    type="number"
                    value={exercise.sets}
                    onChange={(event) => {
                      setFormResult((prev) => {
                        return {
                          ...prev,
                          templateExercises: prev.templateExercises.map(
                            (ex) => {
                              if (ex.id === exercise.id) {
                                return {
                                  ...ex,
                                  sets: parseInt(event.target.value),
                                };
                              }
                              return ex;
                            }
                          ),
                        };
                      });
                      console.log(event.target.value);
                    }}
                  ></Input>{" "}
                  <div className="sets-view">SETS</div>
                </Col>
                <Col xs="1" md="1" className="px-0 single-col">
                  <Button
                    className="delete-exercise"
                    onClick={() => {
                      setFormResult((template) => {
                        console.log(template.templateExercises);
                        return {
                          templateName: template.templateName,
                          description: template.description,
                          templateExercises: template.templateExercises.filter(
                            (ex) => {
                              return ex.id !== exercise.id;
                            }
                          ),
                        };
                      });
                    }}
                  >
                    -
                  </Button>
                </Col>
              </Row>
            ))}
        </Row>
      </Row>
      <Row></Row>
      <Row>
        <ChooseExercise
          setAddedExercises={addExercises}
          addedExercises={formResult.templateExercises}
        />
      </Row>
      <Row>
        <div className="row-position">
          {" "}
          Are you sure you want to edit current template?
        </div>
      </Row>
      <Row>
        <div className="row-position">
          <Button
            className="button-edit"
            disabled={!localStorage.getItem("isAdmin")}
            onClick={(e) => onSubmit(e)}
          >
            EDIT
          </Button>
        </div>
      </Row>
    </Form>
  );
}

export default Edit;
