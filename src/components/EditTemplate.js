import React, { useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Row, Col } from "react-bootstrap";
import ChooseExercise from "./ChooseExercise";
import useFetchTempalte from "../hooks/useFetchTemplate";

const Edit = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { formTemplate, setFormTemplate } = useFetchTempalte();
  // These methods will update the state properties.
  const updateForm = (value) => {
    return setFormTemplate((prev) => {
      return { ...prev, ...value };
    });
  };

  const onSubmit = useCallback(
    async (e, dataOnSubmit, params) => {
      e.preventDefault();
      const editedTemplate = {
        templateName: dataOnSubmit.templateName,
        description: dataOnSubmit.description,
        templateExercises: dataOnSubmit.templateExercises,
      };

      // This will send a post request to update the data in the database.
      try {
        await fetch(`/.netlify/functions/templateUpdate?id=${params.id}`, {
          method: "PUT",
          body: JSON.stringify({
            token: localStorage.getItem("token"),
            editedTemplate: editedTemplate,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.log(error);
      }

      navigate("/templatelist");
    },
    [navigate]
  );

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
            className="input"
            type="text"
            placeholder="Search..."
            value={formTemplate.templateName}
            onChange={(e) =>
              updateForm({ templateName: e.target.value })
            }></Input>
        </FormGroup>
        <FormGroup className="form-group">
          <Label for="exampleSelect ">PUT NEW DESCRIPTION</Label>
          <Input
            className="input"
            type="textarea"
            placeholder="Search..."
            value={formTemplate.description}
            onChange={(e) =>
              updateForm({ description: e.target.value })
            }></Input>
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
                <Col sm="12" md="1" className="single-col">
                  {idx + 1}{" "}
                </Col>
                <Col sm="12" md="3" className="single-col">
                  {exercise.nameEn.toUpperCase()}
                </Col>
                <Col sm="12" md="2" className="single-col">
                  {" "}
                  {exercise.bodyPart.toUpperCase()}
                </Col>
                <Col sm="12" md="2" className="single-col">
                  {" "}
                  {exercise.equipment.toUpperCase()}
                </Col>
                <Col sm="12" md="2" className="sets">
                  <Input
                    className="input-sets edit-input"
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
                    }}></Input>{" "}
                  <div className="sets-view">SETS</div>
                </Col>
                <Col sm="12" md="12" className="single-col">
                  <Button
                    color="primary"
                    onClick={() => {
                      setFormTemplate((template) => {
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
                    }}>
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
          <Button
            color="primary"
            className="ml-0"
            disabled={!(localStorage.getItem("role") === "Admin")}
            onClick={(e) => onSubmit(e, formTemplate, params)}>
            EDIT
          </Button>
        </div>
      </Row>
    </Form>
  );
};

export default Edit;
