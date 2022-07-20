import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { ListGroup, Row, Col } from "react-bootstrap";

const Training = () => {
  const location = useLocation();

  const [loadedTemplate, setLoadedTemplate] = useState(
    location.state.templateObj
  );

  const [bodyWeightConfirmed, setBodyWeightConfirmed] = useState();
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const [formResults, setFormResults] = useState({
    templateName: loadedTemplate.templateName.toUpperCase(),
    description: loadedTemplate.descritpion,
    date: date,
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

  // console.log(formResults);
  // console.log(addedResults);
  // console.log(loadedTemplate.templateExercises);

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
      date: date,
      templateExercises: [],
    });
    navigate("/");
  }

  let changeSetNumber = (exerciseId, isIncreasing) => {
    setLoadedTemplate((prev) => {
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
    });
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

  const typeOfEquipment = loadedTemplate.templateExercises.map(
    (exercise) => exercise.equipment
  );

  let arrayOfSetsIds = [];

  let valueOfSets = (exercise) => {
    let arrayOfSets = [];
    for (let i = 0; i < exercise.sets; i++) {
      arrayOfSetsIds = [...arrayOfSetsIds, `${exercise.id}-${i}`];
      // console.log(arrayOfSetsIds);
      arrayOfSets.push(
        <Row key={`${exercise.id}-${i}`}>{valueOfExercises(exercise, i)}</Row>
      );
    }

    return arrayOfSets;
  };

  let valueOfExercises = (exercise, i) => {
    if (
      exercise.equipment === "barebell" ||
      exercise.equipment === "BAREBELL" ||
      exercise.equipment === "dumbbell" ||
      exercise.equipment === "DUMBBELL" ||
      exercise.equipment === "OTHER" ||
      exercise.equipment === "other" ||
      exercise.equipment === "MACHINE" ||
      exercise.equipment === "machine" ||
      exercise.equipment === "cable" ||
      exercise.equipment === "CABLE"
    ) {
      // console.log(formResults);
      // console.log(exercise.id);
      // console.log(addedResults);
      return (
        <Form>
          <span>WEIGHT:</span>
          <Input
            key={`${exercise.id}-${i}`}
            disabled={disabledCheckboxesArr.includes(`${exercise.id}-${i}`)}
            className="input d-inline-block"
            type="number"
            // value={}
            onChange={(event) => {
              setAddedResults((prev) => {
                console.log(addedResults);
                const isExisting = prev.find((set) => {
                  return set.id === `${exercise.id}-${i}`;
                });
                if (!isExisting) {
                  return [
                    ...prev,
                    {
                      id: `${exercise.id}-${i}`,
                      setWeight: parseInt(event.target.value),
                    },
                  ];
                } else {
                  return prev.map((res) => {
                    if (res.id === `${exercise.id}-${i}`)
                      return {
                        ...res,
                        setWeight: parseInt(event.target.value),
                      };
                    return res;
                  });
                }
              });
            }}
          ></Input>
          <span>REPETITION:</span>
          <Input
            disabled={disabledCheckboxesArr.includes(`${exercise.id}-${i}`)}
            className="input d-inline-block"
            type="number"
            // value={}
            onChange={(event) => {
              setAddedResults((prev) => {
                const isExisting = prev.find((set) => {
                  return set.id === `${exercise.id}-${i}`;
                });

                console.log(prev);
                if (!isExisting) {
                  return [
                    ...prev,
                    {
                      id: `${exercise.id}-${i}`,
                      setRepetition: parseInt(event.target.value),
                    },
                  ];
                } else {
                  return prev.map((res) => {
                    if (res.id === `${exercise.id}-${i}`)
                      return {
                        ...res,
                        setRepetition: parseInt(event.target.value),
                      };
                    return res;
                  });
                }
              });
            }}
          ></Input>
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
    }
    // console.log(
    //   "asdf",
    //   // `${exercise.id}-${i}`,
    //   // event,
    //   disabledCheckboxesArr
    // );
    if (
      exercise.equipment === "weighted bodyweight" ||
      exercise.equipment === "ASSISTED BODYWEIGHT" ||
      exercise.equipment === "assisted bodyweight" ||
      exercise.equipment === "ASSISTED BODYWEIGHT"
    ) {
      return (
        <Form>
          <span>WEIGHT:</span>
          <Input
            disabled={disabledCheckboxesArr.includes(`${exercise.id}-${i}`)}
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
                      setWeight: parseInt(event.target.value),
                    },
                  ];
                } else {
                  return prev.map((res) => {
                    if (res.id === `${exercise.id}-${i}`)
                      return {
                        ...res,
                        setWeight: parseInt(event.target.value),
                      };
                    return res;
                  });
                }
              });
            }}
          ></Input>
          <span>REPETITION:</span>
          <Input
            disabled={disabledCheckboxesArr.includes(`${exercise.id}-${i}`)}
            className="input d-inline-block"
            type="number"
            // value={}
            onChange={(event) => {
              setAddedResults((prev) => {
                const isExisting = prev.find((set) => {
                  return set.id === `${exercise.id}-${i}`;
                });

                console.log(prev);
                if (!isExisting) {
                  return [
                    ...prev,
                    {
                      id: `${exercise.id}-${i}`,
                      setRepetition: parseInt(event.target.value),
                    },
                  ];
                } else {
                  return prev.map((res) => {
                    if (res.id === `${exercise.id}-${i}`)
                      return {
                        ...res,
                        setRepetition: parseInt(event.target.value),
                      };
                    return res;
                  });
                }
              });
            }}
          ></Input>
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
    }
    if (exercise.equipment === "CARDIO" || exercise.equipment === "cardio") {
      return (
        <Form>
          <span>DISTANCE:</span>
          <Input
            disabled={disabledCheckboxesArr.includes(`${exercise.id}-${i}`)}
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
                      setDistance: parseInt(event.target.value),
                    },
                  ];
                } else {
                  return prev.map((res) => {
                    if (res.id === `${exercise.id}-${i}`)
                      return {
                        ...res,
                        setDistance: parseInt(event.target.value),
                      };
                    return res;
                  });
                }
              });
            }}
          ></Input>
          <span>TIME:</span>
          <Input
            disabled={disabledCheckboxesArr.includes(`${exercise.id}-${i}`)}
            className="input d-inline-block"
            type="number"
            // value={}
            onChange={(event) => {
              setAddedResults((prev) => {
                const isExisting = prev.find((set) => {
                  return set.id === `${exercise.id}-${i}`;
                });

                console.log(prev);
                if (!isExisting) {
                  return [
                    ...prev,
                    {
                      id: `${exercise.id}-${i}`,
                      setTime: parseInt(event.target.value),
                    },
                  ];
                } else {
                  return prev.map((res) => {
                    if (res.id === `${exercise.id}-${i}`)
                      return {
                        ...res,
                        setTime: parseInt(event.target.value),
                      };
                    return res;
                  });
                }
              });
            }}
          ></Input>
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
    }
    if (
      exercise.equipment === "duration" ||
      exercise.equipment === "DURATION"
    ) {
      return (
        <Form>
          <span>TIME:</span>
          <Input
            disabled={disabledCheckboxesArr.includes(`${exercise.id}-${i}`)}
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
                      setTime: parseInt(event.target.value),
                    },
                  ];
                } else {
                  return prev.map((res) => {
                    if (res.id === `${exercise.id}-${i}`)
                      return {
                        ...res,
                        setTime: parseInt(event.target.value),
                      };
                    return res;
                  });
                }
              });
            }}
          ></Input>
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
    }
    if (
      exercise.equipment === "reps only" ||
      exercise.equipment === "REPS ONLY"
    ) {
      return (
        <Form>
          <span>REPETITION:</span>
          <Input
            disabled={disabledCheckboxesArr.includes(`${exercise.id}-${i}`)}
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
                      setRepetition: parseInt(event.target.value),
                    },
                  ];
                } else {
                  return prev.map((res) => {
                    if (res.id === `${exercise.id}-${i}`)
                      return {
                        ...res,
                        setRepetition: parseInt(event.target.value),
                      };
                    return res;
                  });
                }
              });
            }}
          ></Input>
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
    } else {
      return <div>Dude Wrong Equipment!</div>;
    }
  };

  // console.log(typeOfEquipment);
  // console.log(location.state.templateObj);

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
            DATE: {date}
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
                  console.log(event.target.value);
                }}
              ></Input>
              <Label check>
                <Input
                  type="checkbox"
                  onChange={(event) => {
                    setBodyWeightConfirmed(() => event.target.checked);
                    // console.log(bodyWeightConfirmed);
                    // console.log(event.target.checked);
                    // bodyWeightConfirmed = event.target.checked;
                  }}
                />
              </Label>
            </Form>
          </Col>
        </Row>

        <Row className="template-row">
          {loadedTemplate.templateExercises.map((exercise, idx) => (
            <Row className="template-row-exercise" key={exercise.id}>
              {/* {console.log(exercise.sets)} */}
              <Col xs="1" md="2">
                {idx + 1}{" "}
              </Col>
              <Col xs="7" md="8">
                {exercise.nameEn.toUpperCase()}
              </Col>
              <Row>{valueOfSets(exercise)}</Row>
              {/* {console.log(exercise)} */}
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
        <Button
          onClick={(e) => {
            console.log(arrayOfSetsIds, disabledCheckboxesArr);
            if (arrayOfSetsIds.length !== disabledCheckboxesArr.length) {
              return;
            }
            let sortedArrayOfSetsIds = arrayOfSetsIds.sort();
            let sortedDisabledCheckboxesArr = disabledCheckboxesArr.sort();

            for (let i = 0; i < sortedArrayOfSetsIds.length; i++) {
              if (sortedArrayOfSetsIds[i] !== sortedDisabledCheckboxesArr[i]) {
                return;
              } else {
                onSubmit(e);
              }
            }
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
