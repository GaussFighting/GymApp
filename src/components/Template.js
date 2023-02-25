import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Modal } from "react-bootstrap";
import EditTemplate from "./EditTemplate";
import Spinner from "react-bootstrap/Spinner";

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
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to continue deleting current template?
      </Modal.Body>
      <Modal.Footer>
        <Button color="primary" onClick={() => props.deleteRecord(props.id)}>
          Delete
        </Button>
        <Button color="primary" onClick={props.onHide}>
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/.netlify/functions/templateRead?id=${id}`
        );

        const responseData = await response.json();

        const templateObj = responseData.data.templates[0];

        setTemplate({
          id: templateObj._id,
          templateName: templateObj.templateName,
          description: templateObj.description,
          templateExercises: templateObj.templateExercises,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchTemplate();
  }, [id]);

  const navigate = useNavigate();

  if (loading)
    return (
      <div className="d-flex spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
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
        <Col sm="12" md="12" className="single-col-name">
          {template.templateName}
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="12">
          {template.description}
        </Col>
      </Row>
      <Row>
        {template.templateExercises &&
          template.templateExercises.map((exercise, idx) => (
            <Link
              className="template-link"
              to={`/exercise/${exercise.id}`}
              key={exercise.id + idx}>
              <Row className="template-single-row-exercise" key={exercise.id}>
                <Col sm="1" md="1" className="px-0 single-col">
                  {idx + 1}{" "}
                </Col>
                <Col sm="11" md="4" className="px-0 single-col">
                  {exercise.nameEn.toUpperCase()}
                </Col>
                <Col sm="3" md="2" className="px-0 single-col">
                  {" "}
                  {exercise.bodyPart.toUpperCase()}
                </Col>
                <Col sm="5" md="4" className="px-0 single-col">
                  {" "}
                  {exercise.equipment.toUpperCase()}
                </Col>
                <Col sm="4" md="1" className="px-0 sets">
                  {exercise.sets} SETS
                </Col>
              </Row>
            </Link>
          ))}
      </Row>
      <Row className="row">
        <Col sm="12" md="12" className="button-new-exercise">
          <Button
            color="primary"
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
        <Col sm="12" md="12" className="button-new-exercise">
          <Button
            color="primary"
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
      <div className="spacer"></div>
    </div>
  );
}

export default Template;
