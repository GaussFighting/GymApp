import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import FormExercises from "./FormExercises";
import FormSelector from "./FormSelector";
import AddNewExercise from "./AddNewExercise";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [allExercisesForFiltering, setAllExercisesForFiltering] = useState([]);
  const [filterByBodyPart, setFilterByBodyPart] = useState("");
  const [filterByEquipment, setFilterByEquipment] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await fetch("http://localhost:5000/");

      const responseData = await response.json();
      const loadedExercises = [];

      for (const key in responseData) {
        loadedExercises.push({
          id: responseData[key]._id,
          nameEn: responseData[key].nameEn,
          // namePl: responseData[key].namePl,
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
        <Link to={`/exercise/${exercise.id}`}>
          <ListGroupItem className="text-align-exercise text-uppercase">
            <Row>
              <Col xs="1" md="1">
                {idx + 1}
              </Col>
              <Col xs="5" md="5">
                {exercise.nameEn}
              </Col>
              <Col xs="3" md="3">
                {exercise.bodyPart}
              </Col>
              <Col xs="3" md="3">
                {exercise.equipment}
              </Col>
            </Row>
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

  return (
    <div className="margin-top">
      <Row>
        <Col className="margin-input">
          <FormExercises
            filterName={filterName}
            exercises={exercises}
            setFilterName={setFilterName}
            setExercises={setExercises}
            allExercisesForFiltering={allExercisesForFiltering}
          />
        </Col>
        <Col className="button-new-exercise">
          <AddNewExercise
            nameBodyPart={bodyPart}
            nameEquipment={equipment}
            uniqueListBodyPart={bodyPartUniqueList}
            uniqueListEquipment={equipmentUniqueList}
          />
        </Col>
      </Row>
      <Row className="margin-input">
        <Col xs="5" md="6">
          <FormSelector
            name={bodyPart}
            uniqueList={bodyPartUniqueList}
            setExercises={setExercises}
            setFilterByOption={setFilterByBodyPart}
            filterOption={filterByBodyPart}
            allExercisesForFiltering={allExercisesForFiltering}
          />
        </Col>
        <Col xs="6" md="6">
          <FormSelector
            name={equipment}
            uniqueList={equipmentUniqueList}
            setExercises={setExercises}
            setFilterByOption={setFilterByEquipment}
            filterOption={filterByEquipment}
            allExercisesForFiltering={allExercisesForFiltering}
          />
        </Col>
      </Row>
      <ul className="ul-exercise">{ExercisesList}</ul>
      <div className="spacer"></div>
    </div>
  );
};

export default Exercises;
