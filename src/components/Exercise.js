import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { ListGroupItem, Row, Col, Modal } from "react-bootstrap";
import Edit from "./Edit.js";
import ExerciseChart from "./ExerciseChart/ExerciseChart.js";

function Exercise() {
  function OpenModalEdit(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Edit
            exerciseName={exercise.nameEn}
            bodyPart={exercise.bodyPart}
            equipment={exercise.equipment}
          />
        </Modal.Body>
      </Modal>
    );
  }
  function OpenModal(props) {
    return (
      <Modal
        onHide={props.onHide}
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to continue deleting current exercise?
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="start-workout-button"
            onClick={() => props.deleteRecord(props.id)}>
            Delete
          </Button>
          <Button className="start-workout-button" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  let { id } = useParams();
  const [exercise, setExercise] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowEdit, setModalShowEdit] = React.useState(false);
  useEffect(() => {
    const fetchExercise = async () => {
      const response = await fetch(`/.netlify/functions/exerciseRead?id=${id}`);

      const responseData = await response.json();
      const execiseRead = await responseData.data.exercises[0];
      setExercise({
        id: execiseRead._id,
        nameEn: execiseRead.nameEn,
        bodyPart: execiseRead.bodyPart,
        equipment: execiseRead.equipment,
      });
    };
    fetchExercise();
  }, [id]);

  const navigate = useNavigate();

  async function deleteRecord(id) {
    try {
      await fetch(`/.netlify/functions/exerciseDelete?id=${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
    navigate("/exercises");
  }
  return (
    <ListGroupItem className="text-align-single-exercise text-uppercase">
      <Row className="row">
        <Col xs="12" md="12">
          <h1>{exercise.nameEn}</h1>
        </Col>
      </Row>
      <Row>
        <Col xs="6" md="6" className="col-position-body-part">
          <h4>Body Part: {exercise.bodyPart}</h4>
        </Col>
        <Col xs="6" md="6" className="col-position-equipment">
          <h4>Equipment: {exercise.equipment}</h4>
        </Col>
      </Row>

      {exercise.id && <ExerciseChart exerciseId={id} />}

      <Row className="row">
        <Col xs="6" md="6" className="button-new-exercise">
          <Button
            className="delete-exercise"
            disabled={!localStorage.getItem("isAdmin")}
            onClick={() => setModalShowEdit(true)}>
            EDIT
          </Button>
          <OpenModalEdit
            show={modalShowEdit}
            id={id}
            onHide={() => setModalShowEdit(false)}
          />
        </Col>
        <Col xs="6" md="6" className="button-new-exercise">
          <Button
            className="delete-exercise"
            disabled={!localStorage.getItem("isAdmin")}
            onClick={() => setModalShow(true)}>
            DELETE
          </Button>
          <OpenModal
            show={modalShow}
            deleteRecord={deleteRecord}
            id={id}
            onHide={() => setModalShow(false)}
          />
        </Col>
      </Row>
    </ListGroupItem>
  );
}

export default Exercise;
