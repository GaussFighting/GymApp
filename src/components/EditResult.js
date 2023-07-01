import React, { useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Row, Col } from "react-bootstrap";
import ChooseExercise from "./ChooseExercise";
import useFetchResult from "../hooks/useFetchResult";

const EditResult = ({
  bodyWeight,
  date,
  description,
  templateName,
  templateExercises,
}) => {
  const { formResult, setFormResult } = useFetchResult({
    bodyWeight,
    date,
    description,
    templateName,
    templateExercises,
  });

  const params = useParams();
  const navigate = useNavigate();
  const format = "YYYY-MM-DD";
  const moment = require("moment");

  const updateForm = (value) => {
    return setFormResult((prev) => {
      return { ...prev, ...value };
    });
  };

  const onSubmit = useCallback(
    async (e, dataOnSubmit, params) => {
      e.preventDefault();
      const editedResult = {
        bodyWeight: dataOnSubmit.bodyWeight,
        date: dataOnSubmit.date,
        templateName: dataOnSubmit.templateName,
        description: dataOnSubmit.description,
        templateExercises: dataOnSubmit.templateExercises,
      };
      // This will send a post request to update the data in the database.
      try {
        await fetch(`/.netlify/functions/resultUpdate?id=${params.id}`, {
          method: "PUT",
          body: JSON.stringify({
            token: localStorage.getItem("token"),
            editedResult: editedResult,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.log(error);
      }
      navigate("/history");
    },
    [navigate]
  );

  const addExercises = (callback) => {
    setFormResult((prevFormResult) => {
      const pickedExcercises = callback(prevFormResult.templateExercises);

      return {
        ...prevFormResult,
        templateExercises: pickedExcercises.map((ex) => {
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
      <Col sm="4" md="4" className="inputUnit">
        <Input
          className="input edit-input"
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
              <Row
                className="template-single-row-exercise"
                key={exercise.id + idx}>
                <Col sm="1" md="1" className="px-0 single-col">
                  {idx + 1}{" "}
                </Col>
                <Col sm="11" md="3" className="px-0 single-col">
                  {exercise.nameEn.toUpperCase()}
                </Col>
                <Col sm="6" md="2" className="px-0 single-col">
                  {" "}
                  {exercise.bodyPart.toUpperCase()}
                </Col>
                <Col sm="6" md="3" className="px-0 single-col">
                  {" "}
                  {exercise.equipment.toUpperCase()}
                </Col>

                {exercise.addedResults &&
                  exercise.addedResults.map((result, index) => {
                    return (
                      <React.Fragment key={result + index}>
                        {index === 0 && (
                          <Row>
                            <Col sm="4" className="firstCol" md="4">
                              SET
                            </Col>
                            {result.setWeight && (
                              <Col sm="4" md="4" className="firstCol">
                                WEIGHT
                              </Col>
                            )}
                            {result.setRepetition && (
                              <Col sm="4" md="4" className="firstCol">
                                REPETITION
                              </Col>
                            )}{" "}
                            {result.setDistance && (
                              <Col sm="4" md="4" className="firstCol">
                                DISTANCE
                              </Col>
                            )}
                            {result.setTime && (
                              <Col sm="4" md="4" className="firstCol">
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
                          <Col sm="4" md="4" className="inputUnit">
                            {" "}
                            {index + 1}.{" "}
                          </Col>

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
                          <Col sm="12">
                            {" "}
                            <Button
                              color="primary button-hyphen"
                              onClick={() =>
                                changeSetNumber(exercise.id, false, index)
                              }>
                              {" "}
                              -
                            </Button>
                          </Col>
                          {!result.setWeight && !result.setDistance && (
                            <Col sm="12">{""}</Col>
                          )}
                        </Row>
                      </React.Fragment>
                    );
                  })}
                <Button
                  color="primary"
                  onClick={() => changeSetNumber(exercise.id, true)}
                  className="button-modal">
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
                  disabled={!(localStorage.getItem("role") === "Admin")}
                  className="button-modal">
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
            className="flex"
            disabled={!(localStorage.getItem("role") === "Admin")}
            onClick={(e) => onSubmit(e, formResult, params)}>
            EDIT
          </Button>
        </Row>
      </div>
    </Form>
  );
};

export default EditResult;
