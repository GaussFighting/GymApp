import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import FormExercises from "./FormExercises";
import FormSelector from "./FormSelector";
import AddNewExercise from "./AddNewExercise";
import Spinner from "react-bootstrap/Spinner";

const Exercises = () => {
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
        const responseDataRes = await response.json();
        const responseData = responseDataRes?.data?.exercises || [];

        const loadedExercises = [];

        for (const key in responseData) {
          loadedExercises.push({
            id: responseData[key]._id,
            nameEn: responseData[key].nameEn,
            bodyPart: responseData[key].bodyPart,
            equipment: responseData[key].equipment,
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

  const downloadCSV = () => {
    const csvString = [
      ["Id", "name", "bodyPart", "equipment"],
      ...exercises.map((item) => {
        return [item.id, item.nameEn, item.bodyPart, item.equipment];
      }),
    ]
      .map((e) => e.join(";"))
      .join("\n");

    const CSVfile = `data:text/csv;charset=utf-8,${csvString}`;
    const encodedUri = encodeURI(CSVfile);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "exercises.csv");
    document.body.appendChild(link);
    link.click();
    window.open(encodedUri);
    document.body.removeChild(link);
  };
  console.log(exercises);
  const ExercisesList = exercises.map((exercise, idx) => (
    <ListGroup key={exercise.id + idx}>
      <Button className="button">
        <Link to={`/exercise/${exercise.id}`}>
          <ListGroupItem className="text-uppercase">
            <Row>
              <Col sm="2" md="1">
                {idx + 1}
              </Col>
              <Col sm="10" md="5">
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
    <div className="mt-4">
      <Row>
        <Col sm="12" md="6" className="margin-input input-exercises">
          <FormExercises
            filterName={filterName}
            exercises={exercises}
            setFilterName={setFilterName}
            setExercises={setExercises}
            allExercisesForFiltering={allExercisesForFiltering}
          />
        </Col>
        <Col sm="12" md="6" className="button-new-exercise ">
          <AddNewExercise
            nameBodyPart={bodyPart}
            nameEquipment={equipment}
            uniqueListBodyPart={bodyPartUniqueList}
            uniqueListEquipment={equipmentUniqueList}
            setExercises={setExercises}
          />
        </Col>
      </Row>
      <Row className="margin-input">
        <Col sm="12" md="6">
          <FormSelector
            name={bodyPart}
            uniqueList={bodyPartUniqueList}
            setExercises={setExercises}
            setFilterByOption={setFilterByBodyPart}
            filterOption={filterByBodyPart}
            allExercisesForFiltering={allExercisesForFiltering}
          />
        </Col>
        <Col sm="12" md="6">
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
      <Button
        color="primary"
        className="add-new-template-cancel-button center-block"
        onClick={() => {
          downloadCSV();
        }}>
        DOWNLOAD CSV
      </Button>
      <div className="spacer"></div>
    </div>
  );
};

export default Exercises;
