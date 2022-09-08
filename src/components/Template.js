import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Modal } from "react-bootstrap";
import EditTemplate from "./EditTemplate";

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
        <EditTemplate />
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
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to continue deleting current template?
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="start-workout-button"
          onClick={() => props.deleteRecord(props.id)}
        >
          Delete
        </Button>
        <Button className="start-workout-button" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Template() {
  let { id } = useParams();
  const [template, setTemplate] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowEdit, setModalShowEdit] = React.useState(false);

  useEffect(() => {
    const fetchTemplate = async () => {
      const response = await fetch(`/.netlify/functions/templateRead?id=${id}`);

      const responseData = await response.json();

      const templateObj = responseData.data.templates[0];

      setTemplate({
        id: templateObj._id,
        templateName: templateObj.templateName,
        description: templateObj.description,
        templateExercises: templateObj.templateExercises,
      });
    };
    fetchTemplate();
  }, [id]);

  const navigate = useNavigate();

  async function deleteRecord(id) {
    try {
      await fetch(`/.netlify/functions/templateDelete?id=${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
    navigate("/templatelist");
  }

  return (
    <div className="main-template-div">
      <Row>
        <Col xs="12" md="12" className="single-col-name">
          {template.templateName}
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="12">
          {template.description}
        </Col>
      </Row>
      <Row>
        {template.templateExercises &&
          template.templateExercises.map((exercise, idx) => (
            <Link className="template-link" to={`/exercise/${exercise.id}`}>
              <Row className="template-single-row-exercise" key={exercise.id}>
                <Col xs="1" md="1" className="px-0 single-col">
                  {idx + 1}{" "}
                </Col>
                <Col xs="3" md="3" className="px-0 single-col">
                  {exercise.nameEn.toUpperCase()}
                </Col>
                <Col xs="3" md="3" className="px-0 single-col">
                  {" "}
                  {exercise.bodyPart.toUpperCase()}
                </Col>
                <Col xs="3" md="3" className="px-0 single-col">
                  {" "}
                  {exercise.equipment.toUpperCase()}
                </Col>
                <Col xs="1" md="1" className="px-0 sets">
                  {exercise.sets} SETS
                </Col>
              </Row>
            </Link>
          ))}
      </Row>
      <Row className="row">
        <Col xs="6" md="6" className="button-new-exercise">
          <Button
            className="delete-exercise"
            onClick={() => setModalShowEdit(true)}
          >
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
            onClick={() => setModalShow(true)}
          >
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
      <div className="spacer"></div>
      {console.log(template)}
    </div>
  );
}

export default Template;
