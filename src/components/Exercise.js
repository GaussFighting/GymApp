import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { ListGroupItem, Row, Col, Modal } from "react-bootstrap";
import Edit from "./Edit.js";

function OpenModalEdit(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Edit
          nameEn={props.nameEn}
          bodyPart={props.bodyPart}
          equipment={props.equipment}
        />
      </Modal.Body>
    </Modal>
  );
}
function OpenModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to continue deleting current exercise?
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.deleteRecord(props.id)}>Delete</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
function Exercise() {
  let { id } = useParams();
  const [exercise, setExercise] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowEdit, setModalShowEdit] = React.useState(false);

  useEffect(() => {
    const fetchExercise = async () => {
      const response = await fetch(`http://localhost:5000/exercise/${id}`);

      const responseData = await response.json();

      setExercise({
        id: responseData._id,
        nameEn: responseData.nameEn,
        bodyPart: responseData.bodyPart,
        equipment: responseData.equipment,
      });
    };
    fetchExercise();
  }, [id]);

  const navigate = useNavigate();

  async function deleteRecord(id) {
    try {
      await fetch(`http://localhost:5000/exercise/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
    navigate("/");
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
          <h3>{exercise.bodyPart}</h3>
        </Col>
        <Col xs="6" md="6" className="col-position-equipment">
          <h3>{exercise.equipment}</h3>
        </Col>
      </Row>
      <Row className="row">
        <Col xs="6" md="6" className="button-new-exercise">
          <Button onClick={() => setModalShowEdit(true)}>Edit</Button>
          <OpenModalEdit
            show={modalShowEdit}
            id={id}
            onHide={() => setModalShowEdit(false)}
          />
        </Col>
        <Col xs="6" md="6" className="button-new-exercise">
          <Button onClick={() => setModalShow(true)}>Delete</Button>
          <OpenModal
            show={modalShow}
            deleteRecord={deleteRecord}
            id={id}
            onHide={() => setModalShow(false)}
          />
        </Col>
      </Row>
      <Row className="row"> Results</Row>
      <Row className="row"> Charts</Row>
      <Row className="row"> Best scores</Row>
    </ListGroupItem>
  );
}

export default Exercise;
