import React from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { ListGroupItem, Row, Col, Modal } from "react-bootstrap";
import Edit from "./Edit.js";
import ExerciseChart from "./ExerciseChart/ExerciseChart.js";
import useFetchExercise from "../hooks/useFetchExercise.js";

const Exercise = () => {
  const OpenModalEdit = (props) => {
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
  };
  const OpenModal = (props) => {
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
            color="primary"
            disabled={!localStorage.getItem("role") === "Admin"}
            onClick={() => props.deleteRecord(props.id)}>
            Delete
          </Button>
          <Button color="primary" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowEdit, setModalShowEdit] = React.useState(false);

  const { exercise, id } = useFetchExercise({});

  const navigate = useNavigate();

  const deleteRecord = async (id) => {
    try {
      await fetch(`/.netlify/functions/exerciseDelete?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(localStorage.getItem("token")),
      });
    } catch (error) {
      console.log(error);
    }
    navigate("/exercises");
  };
  return (
    <ListGroupItem className="text-align-single-exercise text-uppercase">
      <Row className="row">
        <Col sm="12" md="12">
          <h1>
            {" "}
            <strong>Statistics of {exercise.nameEn}</strong>{" "}
          </h1>{" "}
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="6">
          <strong>
            {" "}
            <h4>Body Part: {exercise.bodyPart}</h4>
          </strong>
        </Col>
        <Col sm="12" md="6">
          <strong>
            {" "}
            <h4>Equipment: {exercise.equipment}</h4>
          </strong>
        </Col>
      </Row>

      {exercise.id && <ExerciseChart exerciseId={id} />}

      <Row className="row">
        <Col sm="12" md="6" className="button-new-exercise">
          <Button
            color="primary"
            disabled={!(localStorage.getItem("role") === "Admin")}
            onClick={() => setModalShowEdit(true)}>
            EDIT
          </Button>
          <OpenModalEdit
            show={modalShowEdit}
            id={id}
            onHide={() => setModalShowEdit(false)}
          />
        </Col>
        <Col sm="12" md="6" className="button-new-exercise">
          <Button
            color="primary"
            disabled={!(localStorage.getItem("role") === "Admin")}
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
};

export default Exercise;
