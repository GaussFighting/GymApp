import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Row, Col } from "react-bootstrap";
import ChooseExercise from "./ChooseExercise";

const EditResult = ({
  bodyWeight,
  date,
  description,
  templateName,
  templateExercises,
}) => {
  const [formResult, setFormResult] = useState({
    bodyWeight: bodyWeight,
    date: date,
    templateName: templateName,
    description: description,
    templateExercises: templateExercises,
  });
  console.log(formResult);
  const params = useParams();
  const navigate = useNavigate();
  const format = "YYYY-MM-DD";
  const moment = require("moment");

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
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
      setFormResult(record.data.results[0]);
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
  }

  const addExercises = (callback) => {
    setFormResult((prevFormResult) => {
      const pickedExcercises = callback(prevFormResult.templateExercises);
      console.log(pickedExcercises);
      return {
        ...prevFormResult,
        templateExercises: pickedExcercises.map((ex, index) => {
          if (ex.addedResults) {
            return ex;
          } else if (ex.equipment === "cardio" || ex.equipment === "CARDIO") {
            return {
              ...ex,
              addedResults: [
                {
                  id: ex.id + "-0",
                  setDistance: 1,
                  setTime: "00:00:00",
                },
              ],
            };
          } else if (
            ex.equipment === "duration" ||
            ex.equipment === "DURATION"
          ) {
            return {
              ...ex,
              addedResults: [
                {
                  id: ex.id + "-0",
                  setTime: "00:00:00",
                },
              ],
            };
          } else if (
            ex.equipment === "reps only" ||
            ex.equipment === "REPS ONLY"
          ) {
            return {
              ...ex,
              addedResults: [
                {
                  id: ex.id + "-0",
                  setRepetition: 1,
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

  const ResultFieldType = ({
    inputType,
    inputUnit,
    exerciseIdx,
    resultIdx,
    inputName,
    exercise,
    inputTitle,
    callback,
  }) => {
    const inputValue =
      formResult.templateExercises[exerciseIdx].addedResults[resultIdx][
        inputName
      ];
    return (
      <Col>
        <Input
          className="input select-name-position"
          type={inputType}
          step={inputType === "time" ? "1" : "0.1"}
          value={inputType === "number" ? parseFloat(inputValue) : inputValue}
          onChange={(event) => {
            callback(event, exercise, inputTitle, resultIdx + 1);
          }}></Input>
        {inputUnit}
      </Col>
    );
  };

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
                  ["set" + fieldName]:
                    fieldName === "Time"
                      ? event.target.value
                      : parseFloat(event.target.value),
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
            onChange={(e) =>
              updateForm({ templateName: e.target.value })
            }></Input>
        </FormGroup>
        <FormGroup className="form-group">
          <Label for="exampleSelect ">PUT NEW DESCRIPTION</Label>
          <Input
            className="input select-name-position descritpion"
            type="textarea"
            placeholder="Search..."
            value={formResult.description}
            onChange={(e) =>
              updateForm({ description: e.target.value })
            }></Input>
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
            }></Input>
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
                      <React.Fragment key={result - index}>
                        {index === 0 && (
                          <Row>
                            <Col
                              className="firstCol"
                              md={
                                !result.setWeight && !result.setDistance && 4
                              }>
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
                                className="firstCol">
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
                                className="firstCol">
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
                          }>
                          <Col> {index + 1}. </Col>
                          {result.setWeight && (
                            <ResultFieldType
                              inputType="number"
                              inputUnit={result.setWeight && "kg"}
                              exerciseIdx={idx}
                              resultIdx={index}
                              inputName={"setWeight"}
                              exercise={exercise}
                              inputTitle={"Weight"}
                              callback={resultEdit}
                            />
                          )}
                          {result.setDistance && (
                            <ResultFieldType
                              inputType="number"
                              inputUnit={result.setDistance && "m"}
                              exerciseIdx={idx}
                              resultIdx={index}
                              inputName={"setDistance"}
                              exercise={exercise}
                              inputTitle={"Distance"}
                              callback={resultEdit}
                            />
                          )}
                          {result.setTime && (
                            <ResultFieldType
                              inputType="time"
                              exerciseIdx={idx}
                              resultIdx={index}
                              inputName={"setTime"}
                              exercise={exercise}
                              inputTitle={"Time"}
                              callback={resultEdit}
                            />
                          )}
                          {result.setRepetition && (
                            <ResultFieldType
                              inputType="number"
                              exerciseIdx={idx}
                              resultIdx={index}
                              inputName={"setRepetition"}
                              exercise={exercise}
                              inputTitle={"Repetition"}
                              callback={resultEdit}
                            />
                          )}
                          <Col>
                            {" "}
                            <Button
                              color="primary"
                              className="delete-exercise"
                              onClick={() =>
                                changeSetNumber(exercise.id, false, index)
                              }>
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
                  color="primary"
                  onClick={() => changeSetNumber(exercise.id, true)}
                  className="add-new-template-cancel-button">
                  ADD SET
                </Button>
                <Button
                  color="primary"
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
                  className="add-new-template-cancel-button">
                  DELETE EXERCISE
                </Button>
              </Row>
            ))}
        </Row>
      </Row>
      <div className="row-position">
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
          <Button
            color="primary"
            className="button-edit flex"
            // disabled={!localStorage.getItem("isAdmin")}
            onClick={(e) => onSubmit(e)}>
            EDIT
          </Button>
        </Row>
      </div>
    </Form>
  );
};

export default EditResult;
