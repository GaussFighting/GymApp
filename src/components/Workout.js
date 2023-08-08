import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { ListGroup, Row, Col } from "react-bootstrap";
import ChooseExercise from "./ChooseExercise";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Workout = (props) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const location = useLocation();

  const [checked, setChecked] = useState("");

  const toastId = React.useRef(null);
  useEffect(() => {
    if (checked) {
      toastId.current = toast("Check all inputs to submit results!", {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.dismiss(toastId.current);
    }
  }, [checked]);

  const [loadedTemplate, setLoadedTemplate] = useState(
    props.template
      ? location.state.templateObj
      : {
          templateName: "Quick workout",
          description: "Workout without description",
          templateExercises: [],
        }
  );

  const [bodyWeightConfirmed, setBodyWeightConfirmed] = useState();

  const [startDate, setStartDate] = useState(new Date());

  const [formResults, setFormResults] = useState({
    templateName: loadedTemplate.templateName.toUpperCase(),
    description: loadedTemplate.descritpion
      ? loadedTemplate.descritpion
      : "Workout without description",
    date: startDate,
    templateExercises: loadedTemplate.templateExercises,
  });
  const [addedResults, setAddedResults] = useState([]);
  const [disabledCheckboxesArr, setDisabledCheckboxesArr] = useState([]);
  const navigate = useNavigate();

  const updateFormResults = (value) => {
    return setFormResults((prev) => {
      return { ...prev, ...value };
    });
  };

  let filteredResultsWithExistingExercises = () => {
    let realResults = formResults.templateExercises.filter((exerciseObj) => {
      return exerciseObj.addedResults && exerciseObj.addedResults.length > 0;
    });
    return { ...formResults, templateExercises: realResults };
  };

  const [isWaiting, setWaiting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setWaiting(true);
      await fetch(`/.netlify/functions/resultCreate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          filteredResultsWithExistingExercises:
            filteredResultsWithExistingExercises(),
        }),
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
    navigate("/history");
  };
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
        <Row key={`${exercise.id}-${i}`}>
          <Col>{valueOfExercises(exercise, i)}</Col>
        </Row>
      );
    }
    return arrayOfSets;
  };

  let valueOfExercises = (exercise, i) => {
    let exerciseArray = ["barbell", "dumbbell", "other", "machine", "cable"];
    let exerciseArray1 = ["weighted bodyweight", "assisted bodyweight"];
    let exerciseLabels = ["WEIGHT", "REPETITION"];
    let exerciseArray2 = ["cardio"];
    let exerciseLabels2 = ["DISTANCE", "TIME"];
    let exerciseArray3 = ["duration"];
    let exerciseLabels3 = ["TIME"];
    let exerciseArray4 = ["reps only"];
    let exerciseLabels4 = ["REPETITION"];

    let labelsFunction = (labels) => {
      return (
        <div className="row workout-mobile">
          <Form>
            {labels.map((label, idx) => {
              let labelName =
                "set" +
                label.charAt(0).toUpperCase() +
                label.toLowerCase().slice(1);
              return (
                <React.Fragment key={idx + label}>
                  {" "}
                  <span className="workout-small">{`${
                    (idx === 0 ? i + 1 : " ") + " " + label
                  }`}</span>
                  <Input
                    key={`${exercise.id}-${i}`}
                    disabled={disabledCheckboxesArr.includes(
                      `${exercise.id}-${i}`
                    )}
                    className="input d-inline-block col-sm-6 col-lg-6 edit-input workout-input"
                    type={label === "TIME" ? "time" : "number"}
                    step="1"
                    min={0}
                    max={1000}
                    value={addedResults[i] ? addedResults[i].labelName : 0}
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
                              [labelName]: parseFloat(event.target.value),
                            },
                          ];
                        } else {
                          return prev.map((res) => {
                            if (res.id === `${exercise.id}-${i}`)
                              return {
                                ...res,
                                [labelName]:
                                  labelName === "setTime"
                                    ? event.target.value
                                    : parseFloat(event.target.value),
                              };
                            return res;
                          });
                        }
                      });
                    }}></Input>
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
        </div>
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
      return <div>Wrong Equipment!</div>;
    }
  };
  return (
    <div className="main-template-div">
      {!props.template && (
        <Row>
          <Col className="pt-3 text-center ">
            <h1>
              {" "}
              <strong>Empty Workout</strong>{" "}
            </h1>{" "}
          </Col>
        </Row>
      )}
      <ListGroup key={loadedTemplate.id}>
        <Row>
          <Col className="pt-3 text-center ">
            <h1>
              {" "}
              <strong>Current Workout</strong>{" "}
            </h1>{" "}
          </Col>
        </Row>
        <Row className="template-row ">
          <Col sm="12" md="12" className="single-col-name">
            {loadedTemplate.templateName.toUpperCase()}
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="12">
            {"Template Description: " + loadedTemplate.descritpion}
          </Col>
        </Row>
        <Row>
          <Col sm="3" md="5" lg="6" className=" pt-3 date-picker-view">
            <strong> {"Date: "}</strong>
            <DatePicker
              className="date-picker"
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setFormResults((prev) => {
                  return { ...prev, date: date };
                });
              }}
            />
          </Col>
          <Col sm="9" md="7" lg="6">
            <Form>
              <strong> {"Body Weight: "}</strong>
              <Input
                disabled={bodyWeightConfirmed}
                className="input d-inline-block workout-input"
                type="number"
                min={0}
                max={255}
                value={formResults.bodyWeight ? formResults.bodyWeight : 0}
                onChange={(event) => {
                  updateFormResults({
                    bodyWeight: parseFloat(event.target.value),
                  });
                }}></Input>
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
          <hr className="hr" />
        </Row>

        <Row className="template-row">
          {loadedTemplate.templateExercises.map((exercise, idx) => (
            <Row className="template-row-exercise" key={exercise.id}>
              <Col>
                <h5>
                  {idx + 1}
                  {". "}
                  {exercise.nameEn.toUpperCase()}
                  {" ("}
                  {exercise.equipment.toUpperCase()}
                  {")"}
                </h5>
              </Col>
              <Row>{valueOfSets(exercise)}</Row>
              <Button
                color="primary"
                onClick={() => changeSetNumber(exercise.id, true)}
                className="button-modal">
                ADD SET
              </Button>
              <Button
                color="primary"
                onClick={() => changeSetNumber(exercise.id, false)}
                className="button-modal">
                DELETE SET
              </Button>
            </Row>
          ))}
        </Row>
      </ListGroup>
      <FormGroup>
        <ChooseExercise
          setAddedExercises={(updateExcercises) => {
            setFormResults((prev) => {
              return {
                ...prev,
                templateExercises: [
                  ...updateExcercises(prev.templateExercises),
                ],
              };
            });
          }}
          addedExercises={formResults.templateExercises}
        />
        <Button
          color="primary"
          disabled={isWaiting}
          onClick={(e) => {
            if (arrayOfSetsIds.length !== disabledCheckboxesArr.length) {
              let notCheckedInput =
                document.getElementsByClassName("form-control");
              for (let i = 0; i < notCheckedInput.length; i++) {
                notCheckedInput[i].style.border = "solid  #fa4360";
                notCheckedInput[i].style.background = "#fae1e5";
              }
              let checkedInput = document.querySelectorAll(":disabled");
              for (let i = 0; i < checkedInput.length; i++) {
                checkedInput[i].style.border = "";
                checkedInput[i].style.background = "#e9ecef";
              }
              setChecked("true");
              return;
            }
            let sortedArrayOfSetsIds = arrayOfSetsIds.sort();
            let sortedDisabledCheckboxesArr = disabledCheckboxesArr.sort();

            for (let i = 0; i < sortedArrayOfSetsIds.length; i++) {
              if (sortedArrayOfSetsIds[i] !== sortedDisabledCheckboxesArr[i]) {
                return;
              }
            }
            if (bodyWeightConfirmed) onSubmit(e);
          }}
          className="margin-left button-modal">
          FINISH
        </Button>
      </FormGroup>
      <div className="spacer"></div>
    </div>
  );
};

export default Workout;
