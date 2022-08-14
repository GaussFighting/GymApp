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
  const format = "YYYY-MM-DD dddd";
  const moment = require("moment");

  let { id } = useParams();
  const [results, setResults] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowEdit, setModalShowEdit] = React.useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(`http://localhost:5000/results/${id}`);

      const responseData = await response.json();

      setResults({
        id: responseData._id,
        templateName: responseData.templateName,
        description: responseData.description,
        templateExercises: responseData.templateExercises,
        bodyWeight: responseData.bodyWeight,
        date: responseData.date,
      });
    };
    fetchResults();
  }, [id]);

  const navigate = useNavigate();

  async function deleteRecord(id) {
    try {
      await fetch(`http://localhost:5000/results/${id}`, {
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
          {results.templateName}
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="12">
          {results.description}
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="12">
          {moment(results.date).format(format)}
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="12">
          {results.bodyWeight}
        </Col>
      </Row>
      <Row>
        {results.templateExercises &&
          results.templateExercises.map((exercise, idx) => (
            <Link className="template-link" to={`/exercise/${exercise.id}`}>
              <Row className="template-single-row-exercise" key={exercise.id}>
                <Col xs="1" md="1" className="px-0 single-col">
                  {idx + 1}{" "}
                </Col>
                <Col xs="5" md="5" className="px-0 single-col">
                  {exercise.nameEn.toUpperCase()} (
                  {exercise.equipment.toUpperCase()})
                </Col>
                <Col xs="5" md="5" className="px-0 single-col">
                  {" "}
                  {exercise.bodyPart.toUpperCase()}
                </Col>
                {/* <Col xs="3" md="3" className="px-0 single-col">
                  {" "}
                  {exercise.equipment.toUpperCase()}
                </Col> */}
                {/* <Col xs="1" md="4" className="px-0 sets">
                  {exercise.sets} SETS
                </Col> */}
                {console.log(exercise.addedResults)}
                {exercise.addedResults.map((result, index) => {
                  let totalVolume = 0;
                  let totalVolumeDivideBymass = 0;

                  for (let i = 0; i < index + 1; i++) {
                    totalVolume += result.setWeight * result.setRepetition;
                    totalVolumeDivideBymass = totalVolume / results.bodyWeight;
                  }

                  return (
                    <React.Fragment>
                      {index === 0 && (
                        <Row>
                          <Col>SET</Col>
                          {result.setWeight && <Col>WEIGHT</Col>}
                          <Col>REPETITION</Col>{" "}
                        </Row>
                      )}
                      <Row>
                        <Col> {index + 1}. </Col>
                        <Col>
                          {" "}
                          {result.setWeight} {result.setWeight && "kg"}
                        </Col>
                        <Col> {result.setRepetition}</Col>
                      </Row>
                      {index === exercise.addedResults.length - 1 && (
                        <Row>
                          {totalVolume > 0 && (
                            <React.Fragment>
                              <Col>Total Volume: {totalVolume}</Col>
                              <Col>
                                {" "}
                                Volume / mass:{" "}
                                {totalVolumeDivideBymass.toFixed(2)}
                              </Col>
                            </React.Fragment>
                          )}
                        </Row>
                      )}
                    </React.Fragment>
                  );
                })}
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
      {console.log(results)}
    </div>
  );
}

export default Template;
