import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import FormExercises from "./FormExercises";
import FormSelector from "./FormSelector";
import AddNewExercise from "./AddNewExercise";
import useFetchExercises from "../hooks/useFetchExercises";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Exercises = () => {
  const [filterName, setFilterName] = useState("");
  const [filterByBodyPart, setFilterByBodyPart] = useState("");
  const [filterByEquipment, setFilterByEquipment] = useState("");

  const { loading, exercises, allExercisesForFiltering, setExercises } =
    useFetchExercises();
  const [exercisesCount, setExercisesCount] = useState({});
  const toastId = React.useRef(null);

  useEffect(() => {
    if (loading) {
      toastId.current = toast("Preparing data in progress", {
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
  }, [loading]);

  useEffect(() => {
    if (Object.keys(exercisesCount).length === 0) {
      let loadedExercises = {};
      const fetchResults = async () => {
        let urlChecker = `/.netlify/functions/resultRead?exercisesCount=${true}`;
        let res = "";
        try {
          res = await fetch(urlChecker);
          const responseData = await res.json();
          loadedExercises = responseData.data.res;
          setExercisesCount(loadedExercises);
        } catch (error) {
          console.log(error);
        }
      };
      fetchResults();
    }
  }, [exercises]);

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

  let sortedExercises = exercises.sort((a, b) => {
    let fa = a.nameEn.toLowerCase();
    let fb = b.nameEn.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });

  const ExercisesList = sortedExercises.map((exercise, idx) => {
    return (
      <ListGroup key={exercise.id + idx}>
        <Button className="button">
          <Link to={`/exercise/${exercise.id}`}>
            <ListGroupItem className="text-uppercase">
              <Row>
                <Col sm="2" md="1">
                  {idx + 1}
                </Col>
                <Col sm="10" md="5">
                  {exercise.nameEn}{" "}
                  <strong style={{ color: "red" }}>
                    {" "}
                    {Object.keys(exercisesCount).length &&
                      exercisesCount[exercise.id]}
                  </strong>
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
    );
  });

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
        className="center-block"
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
