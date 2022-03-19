import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import FormExercises from "./FormExercises";
import FormSelector from "./FormSelector";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [allExercisesForFiltering, setAllExercisesForFiltering] = useState([]);
  const [filterByBodyPart, setFilterByBodyPart] = useState("");
  const [filterByEquipment, setFilterByEquipment] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await fetch(
        "https://gymapp2-d46e1-default-rtdb.firebaseio.com/exercises.json"
      );

      const responseData = await response.json();

      const loadedExercises = [];

      for (const key in responseData) {
        loadedExercises.push({
          id: key,
          nameEn: responseData[key].nameEn,
          namePl: responseData[key].namePl,
          bodyPart: responseData[key].bodyPart,
          equipment: responseData[key].equipment,
        });
      }
      setExercises(loadedExercises);
      setAllExercisesForFiltering(loadedExercises);
    };

    fetchExercises();
  }, []);

  const ExercisesList = exercises.map((exercise, idx) => (
    <ListGroup key={exercise.id}>
      <Button className="button" outline>
        <Link to={`/exercise/${idx + 1}`}>
          <ListGroupItem className="text-align-exercise text-uppercase">
            <Row>
              <Col xs="1" md="1">
                {" "}
                {idx + 1}
              </Col>
              <Col xs="5" md="5">
                {" "}
                {exercise.nameEn}
              </Col>
              <Col xs="3" md="3">
                {" "}
                {exercise.bodyPart}{" "}
              </Col>
              <Col xs="3" md="3">
                {" "}
                {exercise.equipment}
              </Col>
            </Row>{" "}
          </ListGroupItem>
        </Link>
      </Button>
    </ListGroup>
  ));

  const bodyPart = "bodyPart";
  const bodyPartUniqueList = [
    ...new Set(
      allExercisesForFiltering.map((item) => item.bodyPart.toUpperCase())
    ),
  ];

  const equipment = "equipment";
  const equipmentUniqueList = [
    ...new Set(
      allExercisesForFiltering.map((item) => item.equipment.toUpperCase())
    ),
  ];

  console.log(bodyPartUniqueList, equipmentUniqueList);

  return (
    <div className="margin-top">
      <Row>
        <Col className="margin-input">
          <FormExercises
            setFilterName={setFilterName}
            exercises={exercises}
            filterName={filterName}
            setExercises={setExercises}
            allExercisesForFiltering={allExercisesForFiltering}
          />
        </Col>
      </Row>
      <Row className="margin-input">
        <Col xs="6" md="6">
          <FormSelector
            uniqueList={bodyPartUniqueList}
            name={bodyPart}
            setExercises={setExercises}
            setFilterByOption={setFilterByBodyPart}
            filterOption={filterByBodyPart}
            allExercisesForFiltering={allExercisesForFiltering}
          />
        </Col>
        <Col xs="6" md="6">
          <FormSelector
            uniqueList={equipmentUniqueList}
            name={equipment}
            setExercises={setExercises}
            setFilterByOption={setFilterByEquipment}
            filterOption={filterByEquipment}
            allExercisesForFiltering={allExercisesForFiltering}
          />
        </Col>
      </Row>
      <ul className="ul-exercise">{ExercisesList}</ul>
    </div>
  );
};

export default Exercises;
