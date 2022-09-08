import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Row, Col } from "react-bootstrap";
import ChooseExercise from "./ChooseExercise";

function Edit() {
  const [formTemplate, setFormTemplate] = useState({
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
        `/.netlify/functions/templateRead?id=${params.id.toString()}`
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

      setFormTemplate(record.data.templates[0]);
    }

    fetchData();
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setFormTemplate((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedTemplate = {
      templateName: formTemplate.templateName,
      description: formTemplate.description,
      templateExercises: formTemplate.templateExercises,
    };

    // This will send a post request to update the data in the database.
    try {
      await fetch(`/.netlify/functions/templateUpdate?id=${params.id}`, {
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
    setFormTemplate((prevFormTemplate) => {
      const pickedExcercises = callback(prevFormTemplate.templateExercises);
      return {
        ...prevFormTemplate,
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
            value={formTemplate.templateName}
            onChange={(e) => updateForm({ templateName: e.target.value })}
          ></Input>
        </FormGroup>
        <FormGroup className="form-group">
          <Label for="exampleSelect ">PUT NEW DESCRIPTION</Label>
          <Input
            className="input select-name-position descritpion"
            type="textarea"
            placeholder="Search..."
            value={formTemplate.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          ></Input>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup className="form-group">
          <Label for="exampleSelect">List of Exercises</Label>
        </FormGroup>

        <Row>
          {formTemplate.templateExercises &&
            formTemplate.templateExercises.map((exercise, idx) => (
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
                      setFormTemplate((prev) => {
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
                      setFormTemplate((template) => {
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
          addedExercises={formTemplate.templateExercises}
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
          <Button className="button-edit" onClick={(e) => onSubmit(e)}>
            EDIT
          </Button>
        </div>
      </Row>
    </Form>
  );
}

export default Edit;
