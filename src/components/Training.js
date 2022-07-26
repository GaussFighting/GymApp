import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { ListGroup, Row, Col } from "react-bootstrap";
import ChooseExercise from "./ChooseExercise";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Training = () => {
  const location = useLocation();

  const [loadedTemplate, setLoadedTemplate] = useState(
    location.state.templateObj
  );

  const [bodyWeightConfirmed, setBodyWeightConfirmed] = useState();
  // const today = new Date();
  // const date =
  //   today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const [startDate, setStartDate] = useState(new Date());

  const [formResults, setFormResults] = useState({
    templateName: loadedTemplate.templateName.toUpperCase(),
    description: loadedTemplate.descritpion,
    date: startDate,
    templateExercises: loadedTemplate.templateExercises,
  });
  const [addedResults, setAddedResults] = useState([]);
  const [disabledCheckboxesArr, setDisabledCheckboxesArr] = useState([]);
  const navigate = useNavigate();

  function updateFormResults(value) {
    return setFormResults((prev) => {
      return { ...prev, ...value };
    });
  }

  console.log(startDate, formResults);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formResults),
      });
    } catch (error) {
      console.log(error);
    }

    setFormResults({
      templateName: loadedTemplate.templateName.toUpperCase(),
      description: loadedTemplate.descritpion,
      bodyWeight: "",
      date: startDate,
      templateExercises: [],
    });
    navigate("/");
  }

  let changeSetNumber = (exerciseId, isIncreasing) => {
    let stateUpdater = (prev) => {
      return {
        ...prev,
        templateExercises: prev.templateExercises.map((exercise) => {
          if (exercise.id === exerciseId) {
            return {
              ...exercise,
              sets: isIncreasing ? exercise.sets + 1 : exercise.sets - 1,
            };
          }
          return exercise;
        }),
      };
    };
    setFormResults(stateUpdater);
    setLoadedTemplate(stateUpdater);
  };

  useEffect(() => {
    setFormResults((prev) => {
      const myNewArray = prev.templateExercises.map((exercise) => ({
        ...exercise,
        addedResults: addedResults.filter((set) => {
          return set.id.startsWith(exercise.id);
        }),
      }));
      return {
        ...prev,
        templateExercises: myNewArray,
      };
    });
  }, [addedResults]);

  useEffect(() => {
    setLoadedTemplate((prev) => {
      return {
        ...prev,
        templateExercises: [...formResults.templateExercises],
      };
    });
  }, [formResults]);

  let arrayOfSetsIds = [];

  let valueOfSets = (exercise) => {
    let arrayOfSets = [];
    for (let i = 0; i < exercise.sets; i++) {
      arrayOfSetsIds = [...arrayOfSetsIds, `${exercise.id}-${i}`];
      arrayOfSets.push(
        <Row key={`${exercise.id}-${i}`}>{valueOfExercises(exercise, i)}</Row>
      );
    }
    return arrayOfSets;
  };

  let valueOfExercises = (exercise, i) => {
    let exerciseArray = ["barebell", "dumbbell", "other", "machine", "cable"];
    let exerciseArray1 = ["weighted bodyweight", "assisted bodyweight"];
    let exerciseLabels = ["WEIGHT:", "REPETITION:"];
    let exerciseArray2 = ["cardio"];
    let exerciseLabels2 = ["DISTANCE:", "TIME:"];
    let exerciseArray3 = ["duration"];
    let exerciseLabels3 = ["TIME"];
    let exerciseArray4 = ["reps only"];
    let exerciseLabels4 = ["REPETITION:"];

    let labelsFunction = (labels) => {
      return (
        <Form>
          {labels.map((label, idx) => {
            let labelName =
              "set" +
              label.charAt(0).toUpperCase() +
              label.toLowerCase().slice(1);
            return (
              <React.Fragment>
                {" "}
                <span>{`${(idx === 0 ? i + 1 : " ") + " " + label}`}</span>
                <Input
                  key={`${exercise.id}-${i}`}
                  disabled={disabledCheckboxesArr.includes(
                    `${exercise.id}-${i}`
                  )}
                  className="input d-inline-block"
                  type="number"
                  // value={}
                  onChange={(event) => {
                    setAddedResults((prev) => {
                      const isExisting = prev.find((set) => {
                        return set.id === `${exercise.id}-${i}`;
                      });
                      if (!isExisting) {
                        return [
                          ...prev,
                          {
                            id: `${exercise.id}-${i}`,
                            [labelName]: parseInt(event.target.value),
                          },
                        ];
                      } else {
                        return prev.map((res) => {
                          if (res.id === `${exercise.id}-${i}`)
                            return {
                              ...res,
                              [labelName]: parseInt(event.target.value),
                            };
                          return res;
                        });
                      }
                    });
                  }}
                ></Input>
              </React.Fragment>
            );
          })}
          <Label check>
            <Input
              type="checkbox"
              onChange={(event) => {
                setDisabledCheckboxesArr((prev) => {
                  if (event.target.checked) {
                    return [...prev, `${exercise.id}-${i}`];
                  } else {
                    return prev.filter(
                      (setId) => setId !== `${exercise.id}-${i}`
                    );
                  }
                });
              }}
            />
          </Label>
        </Form>
      );
    };
    if (exerciseArray.includes(exercise.equipment.toLowerCase())) {
      return labelsFunction(exerciseLabels);
    }
    if (exerciseArray1.includes(exercise.equipment.toLowerCase())) {
      return labelsFunction(exerciseLabels);
    }
    if (exerciseArray2.includes(exercise.equipment.toLowerCase())) {
      return labelsFunction(exerciseLabels2);
    }
    if (exerciseArray3.includes(exercise.equipment.toLowerCase())) {
      return labelsFunction(exerciseLabels3);
    }
    if (exerciseArray4.includes(exercise.equipment.toLowerCase())) {
      return labelsFunction(exerciseLabels4);
    } else {
      return <div>Dude Wrong Equipment!</div>;
    }
  };
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
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setFormResults((prev) => {
                  return { ...prev, date: date };
                });
              }}
            />
          </Col>
          <Col xs="6" md="6">
            <Form>
              <span>BODY WEIGHT:</span>
              <Input
                disabled={bodyWeightConfirmed}
                className="input d-inline-block"
                type="number"
                // value={}
                onChange={(event) => {
                  updateFormResults({
                    bodyWeight: parseInt(event.target.value),
                  });
                }}
              ></Input>
              <Label check>
                <Input
                  type="checkbox"
                  onChange={(event) => {
                    setBodyWeightConfirmed(() => event.target.checked);
                  }}
                />
              </Label>
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
              <Button
                onClick={() => changeSetNumber(exercise.id, true)}
                className="add-new-template-cancel-button"
              >
                ADD SET
              </Button>
              <Button
                onClick={() => changeSetNumber(exercise.id, false)}
                className="add-new-template-cancel-button"
              >
                DELETE SET
              </Button>
            </Row>
          ))}
        </Row>
      </ListGroup>
      <FormGroup>
        <ChooseExercise
          setAddedExercises={(asdf) => {
            setFormResults((prev) => {
              return {
                ...prev,
                templateExercises: [...prev.templateExercises, ...asdf([])],
              };
            });
          }}
          addedExercises={formResults.templateExercises}
        />
        <Button
          onClick={(e) => {
            if (arrayOfSetsIds.length !== disabledCheckboxesArr.length) {
              return;
            }
            let sortedArrayOfSetsIds = arrayOfSetsIds.sort();
            let sortedDisabledCheckboxesArr = disabledCheckboxesArr.sort();
            for (let i = 0; i < sortedArrayOfSetsIds.length; i++) {
              if (sortedArrayOfSetsIds[i] !== sortedDisabledCheckboxesArr[i]) {
                return;
              }
            }
            onSubmit(e);
          }}
          className="add-new-template-cancel-button"
        >
          FINISH
        </Button>
      </FormGroup>
      <div className="spacer"></div>
    </div>
  );
};

export default Training;
