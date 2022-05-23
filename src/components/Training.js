import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { ListGroup, Row, Col } from "react-bootstrap";

const Training = () => {
  const location = useLocation();
  const loadedTemplate = location.state.templateObj;

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

  useEffect(() => {
    setFormResults((prev) => {
      const myNewArray = prev.templateExercises.map((exercise) => ({
        ...exercise,
        addedResults,
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

  let valueOfSets = (exercise) => {
    let arrayOfSets = [];
    for (let i = 0; i < exercise.sets; i++) {
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
      exercise.equipment === "MACHINE" ||
      exercise.equipment === "CABLE"
    ) {
      // console.log(exercise.id);
      console.log(addedResults);
      return (
        <Form>
          <span>WEIGHT:</span>
          <Input
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

              console.log(event.target.value);
            }}
          ></Input>
          <span>REPETITION:</span>
          <Input
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

              console.log(event.target.value);
            }}
          ></Input>
          <Label check>
            <Input type="checkbox" />
          </Label>
        </Form>
      );
    }
    if (
      exercise.equipment === "weighted bodyweight" ||
      exercise.equipment === "assisted bodyweight"
    ) {
      return (
        <Form>
          <span>WEIGHT:</span>
          <Input
            className="input d-inline-block"
            type="number"
            // value={}
          ></Input>
          <span>REPETITION:</span>
          <Input
            className="input d-inline-block"
            type="number"
            // value={}
          ></Input>
          <Label check>
            <Input type="checkbox" />
          </Label>
        </Form>
      );
    }
    if (exercise.equipment === "cardio") {
      return (
        <Form>
          <span>DISTANCE:</span>
          <Input
            className="input d-inline-block"
            type="number"
            // value={}
          ></Input>
          <span>TIME:</span>
          <Input
            className="input d-inline-block"
            type="number"
            // value={}
          ></Input>
          <Label check>
            <Input type="checkbox" />
          </Label>
        </Form>
      );
    }
    if (exercise.equipment === "duration") {
      return (
        <Form>
          <span>TIME:</span>
          <Input
            className="input d-inline-block"
            type="number"
            // value={}
          ></Input>
          <Label check>
            <Input type="checkbox" />
          </Label>
        </Form>
      );
    }
    if (exercise.equipment === "reps only") {
      return (
        <Form>
          <span>REPETITION:</span>
          <Input
            className="input d-inline-block"
            type="number"
            // value={}
          ></Input>
          <Label check>
            <Input type="checkbox" />
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
            </Row>
          ))}
        </Row>
      </ListGroup>
      <FormGroup>
        <Button
          onClick={(e) => onSubmit(e)}
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
