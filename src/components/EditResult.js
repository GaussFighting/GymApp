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
  const format = "YYYY-MM-DD";
  const moment = require("moment");

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      // console.log(id);
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
      setFormResult(record.data.results[0]); // ?? added last
    }

    fetchData();
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    // console.log("blebleble", value);
    return setFormResult((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedResult = {
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
        body: JSON.stringify(editedResult),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
    console.log(params.id);
    navigate("/history");
    // debugger;
  }

  const addExercises = (callback) => {
    setFormResult((prevFormResult) => {
      const pickedExcercises = callback(prevFormResult.templateExercises);
      console.log(pickedExcercises);
      return {
        ...prevFormResult,
        templateExercises: pickedExcercises.map((ex, index) => {
          console.log(ex);
          if (ex.addedResults) {
            return ex;
          } else if (ex.equipment === "cardio") {
            return {
              ...ex,
              addedResults: [
                {
                  id: ex.id + "-0",
                  setDistance: 1,
                  setTime: "",
                },
              ],
            };
          } else if (ex.equipment === "duration") {
            return {
              ...ex,
              addedResults: [
                {
                  id: ex.id + "-0",
                  setTime: "",
                },
              ],
            };
          } else if (ex.equipment === "repsonly") {
            return {
              ...ex,
              addedResults: [
                {
                  id: ex.id + "-0",
                  setRep: 1,
                },
              ],
            };
          } else {
            return {
              ...ex,
              addedResults: [
                {
                  id: ex.id + "-0",
                  setWeight: 1,
                  setRepetition: 1,
                },
              ],
            };
          }
        }),
      };
    });
  };
  console.log(formResult);

  const resultEdit = (event, exercise, fieldName, setNumber) => {
    updateForm({
      templateExercises: formResult.templateExercises.map((ex) => {
        if (ex.id === exercise.id) {
          return {
            ...ex,
            addedResults: ex.addedResults.map((setResult, index) => {
              if (setNumber === index + 1) {
                return {
                  ...setResult,
                  ["set" + fieldName]: parseFloat(event.target.value),
                };
              }
              return setResult;
            }),
          };
        }
        return ex;
      }),
    });
  };

  let changeSetNumber = (exerciseId, isIncreasing, setNumber) => {
    let stateUpdater = (prev) => {
      return {
        ...prev,
        templateExercises: prev.templateExercises.map((exercise, index) => {
          console.log(setNumber, 1 + index);
          if (exercise.id === exerciseId) {
            return {
              ...exercise,
              sets: isIncreasing ? exercise.sets + 1 : exercise.sets - 1,
              addedResults: isIncreasing
                ? [
                    ...exercise.addedResults,
                    {
                      id: exercise.id + "-" + exercise.sets,
                      setWeight: 1,
                      setRepetition: 1,
                    },
                  ]
                : exercise.addedResults
                    .filter((ex) => {
                      return ex.id !== exercise.id + "-" + setNumber;
                    })
                    .map((ex, index) => {
                      return { ...ex, id: ex.id.split("-")[0] + "-" + index };
                    }),
            };
          }
          return exercise;
        }),
      };
    };
    setFormResult(stateUpdater);
    // setLoadedTemplate(stateUpdater);
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
        <FormGroup className="form-group">
          <Label for="exampleSelect ">PUT NEW BODY WEIGHT</Label>
          <Input
            className="input select-name-position"
            type="number"
            placeholder="Search..."
            value={parseFloat(formResult.bodyWeight)}
            onChange={(e) =>
              updateForm({ bodyWeight: parseFloat(e.target.value) })
            }
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleDate">Date</Label>
          <Input
            type="date"
            name="date"
            id="exampleDate"
            placeholder="date placeholder"
            value={moment(formResult.date).format(format)}
            onChange={(e) => {
              updateForm({
                date: moment(e.target.value).format(format),
              });

              // const editedDate = moment(new Date(e.target.value)).format(
              //   format
              // );
              // updateForm({
              //   date: editedDate,
              // });
              console.log("date");
            }}
          />
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

                {exercise.addedResults &&
                  exercise.addedResults.map((result, index) => {
                    return (
                      <React.Fragment>
                        {index === 0 && (
                          <Row>
                            <Col
                              className="firstCol"
                              md={!result.setWeight && !result.setDistance && 4}
                            >
                              SET
                            </Col>
                            {result.setWeight && (
                              <Col className="firstCol">WEIGHT</Col>
                            )}
                            {result.setRepetition && (
                              <Col
                                md={
                                  !result.setWeight && !result.setDistance && 4
                                }
                                className="firstCol"
                              >
                                REPETITION
                              </Col>
                            )}{" "}
                            {result.setDistance && (
                              <Col className="firstCol">DISTANCE</Col>
                            )}
                            {result.setTime && (
                              <Col
                                md={
                                  !result.setWeight && !result.setDistance && 4
                                }
                                className="firstCol"
                              >
                                TIME
                              </Col>
                            )}
                          </Row>
                        )}
                        <Row
                          className={
                            idx % 2 === 0
                              ? "exercise-row-even"
                              : "exercise-row-odd"
                          }
                        >
                          <Col> {index + 1}. </Col>
                          {(result.setWeight || result.setDistance) && (
                            <Col>
                              {" "}
                              {
                                <Input
                                  className="input select-name-position"
                                  type="number"
                                  step="0.1"
                                  value={parseFloat(
                                    formResult.templateExercises[idx]
                                      .addedResults[index].setWeight
                                  )}
                                  onChange={(event) => {
                                    resultEdit(
                                      event,
                                      exercise,
                                      "Weight",
                                      index + 1
                                    );
                                  }}
                                ></Input>
                              }{" "}
                              {result.setWeight && "kg"}
                              {result.setDistance} {result.setDistance && "m"}
                            </Col>
                          )}
                          <Col>
                            {" "}
                            {
                              <Input
                                className="input select-name-position"
                                type="number"
                                placeholder="Search..."
                                value={parseFloat(
                                  formResult.templateExercises[idx]
                                    .addedResults[index].setRepetition
                                )}
                                onChange={(event) => {
                                  resultEdit(
                                    event,
                                    exercise,
                                    "Repetition",
                                    index + 1
                                  );
                                }}
                              ></Input>
                            }{" "}
                            {result.setTime}
                          </Col>
                          <Col>
                            {" "}
                            <Button
                              className="delete-exercise"
                              onClick={() =>
                                changeSetNumber(exercise.id, false, index)
                              }
                            >
                              {" "}
                              -
                            </Button>
                          </Col>
                          {!result.setWeight && !result.setDistance && (
                            <Col>{""}</Col>
                          )}
                        </Row>
                      </React.Fragment>
                    );
                  })}
                <Button
                  onClick={() => changeSetNumber(exercise.id, true)}
                  className="add-new-template-cancel-button"
                >
                  ADD SET
                </Button>
                <Button
                  onClick={() =>
                    setFormResult(() => {
                      return {
                        ...formResult,
                        templateExercises: formResult.templateExercises.filter(
                          (ex) => {
                            return ex.id !== exercise.id;
                          }
                        ),
                      };
                    })
                  }
                  disabled={!localStorage.getItem("isAdmin")}
                  className="add-new-template-cancel-button"
                >
                  DELETE EXERCISE
                </Button>
                {/* <Col xs="1" md="1" className="px-0 single-col">
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
                </Col> */}
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
