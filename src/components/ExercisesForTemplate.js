import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import { Button } from "reactstrap";
import FormExercises from "./FormExercises";
import FormSelector from "./FormSelector";
import Spinner from "react-bootstrap/Spinner";

const ExercisesForTemplate = (props) => {
  const [exercises, setExercises] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [allExercisesForFiltering, setAllExercisesForFiltering] = useState([]);
  const [filterByBodyPart, setFilterByBodyPart] = useState("");
  const [filterByEquipment, setFilterByEquipment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        const response = await fetch("/.netlify/functions/exerciseRead");

        const responseData = await response.json();
        const loadedExercises = [];
        const exercisesArr = responseData.data.exercises;
        for (const key in exercisesArr) {
          loadedExercises.push({
            id: exercisesArr[key]._id,
            nameEn: exercisesArr[key].nameEn,
            bodyPart: exercisesArr[key].bodyPart,
            equipment: exercisesArr[key].equipment,
            sets: 1,
          });
        }
        setExercises(loadedExercises);
        setAllExercisesForFiltering(loadedExercises);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchExercises();
  }, []);

  if (loading)
    return (
      <div className="d-flex spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );

  const addExercise = (exercise) => {
    props.setAddedExercises((prev) => {
      return [...prev, exercise];
    });
  };

  const removeExercise = (exercise) => {
    props.setAddedExercises((prev) => {
      return prev.filter((element) => element !== exercise);
    });
  };

  const ExercisesList = exercises.map((exercise, idx) => {
    const isAdded = props.addedExercises
      .map((ex) => {
        return ex.id;
      })
      .includes(exercise.id);

    return (
      <ListGroup key={exercise.id}>
        <Button color="link" className="button" outline>
          <ListGroupItem
            className={
              isAdded ? "text-uppercase button-clicked" : "text-uppercase "
            }
            onClick={() => {
              isAdded ? removeExercise(exercise) : addExercise(exercise);
            }}>
            <Row>
              <Col sm="6" md="1">
                {idx + 1}
              </Col>
              <Col sm="6" md="5">
                {exercise.nameEn}
              </Col>
              <Col sm="6" md="3">
                {exercise.bodyPart}
              </Col>
              <Col sm="6" md="3">
                {exercise.equipment}
              </Col>
            </Row>
          </ListGroupItem>
        </Button>
      </ListGroup>
    );
  });

  const bodyPart = "bodyPart";
  const bodyPartUniqueList = [
    ...new Set(
      allExercisesForFiltering.map((item) => item.bodyPart?.toUpperCase())
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
        <Col sm="12" md="12" className="margin-input">
          <FormExercises
            filterName={filterName}
            exercises={exercises}
            setFilterName={setFilterName}
            setExercises={setExercises}
            allExercisesForFiltering={allExercisesForFiltering}
          />
        </Col>
        <Col className="button-new-exercise"></Col>
      </Row>
      <Row className="margin-input">
        <Col sm="12" md="12">
          <FormSelector
            name={bodyPart}
            uniqueList={bodyPartUniqueList}
            setExercises={setExercises}
            setFilterByOption={setFilterByBodyPart}
            filterOption={filterByBodyPart}
            allExercisesForFiltering={allExercisesForFiltering}
          />
        </Col>
        <Col sm="12" md="12">
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
    </div>
  );
};

export default ExercisesForTemplate;
