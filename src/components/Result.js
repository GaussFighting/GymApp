import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Modal } from "react-bootstrap";
import EditResult from "./EditResult";
import Spinner from "react-bootstrap/Spinner";

const Result = () => {
  const format = "YYYY-MM-DD dddd";
  const moment = require("moment");

  let { id } = useParams();
  const [results, setResults] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowEdit, setModalShowEdit] = React.useState(false);
  const [loading, setLoading] = useState(true);
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
          <EditResult
            bodyWeight={results.bodyWeight}
            date={results.date}
            description={results.description}
            templateName={results.templateName}
            templateExercises={results.templateExercises}
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
          Are you sure you want to continue deleting current training?
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
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/.netlify/functions/resultRead?id=${id}`);

        const responseData = await response.json();
        const resultObj = responseData.data.results[0];
        setResults({
          id: resultObj._id,
          templateName: resultObj.templateName,
          description: resultObj.description,
          templateExercises: resultObj.templateExercises,
          bodyWeight: resultObj.bodyWeight,
          date: resultObj.date,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchResults();
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

  const deleteRecord = async (id) => {
    try {
      await fetch(`/.netlify/functions/resultDelete?id=${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
    navigate("/results");
  };

  return (
    <div className="main-template-div">
      <Row className="top-row">
        <Row>
          <Col md="12" className="single-col-name">
            {results.templateName}
          </Col>
        </Row>
        <Row>
          <Col md="12">{results.description}</Col>
        </Row>
        <Row>
          <Col md="12">{moment(results.date).format(format)}</Col>
        </Row>
        <Row>
          <Col md="12">
            {"BODY WEIGHT: "}
            {results.bodyWeight}
            {" kg"}
          </Col>
        </Row>
      </Row>
      <Row>
        {results.templateExercises &&
          results.templateExercises.map((exercise, idx) => (
            <Link
              className="template-link"
              to={`/exercise/${exercise.id}`}
              key={exercise.id + idx}>
              <Row
                className="template-single-row-exercise "
                key={idx + exercise.id}>
                <Col sm="2" md="2" className="px-0 single-col exercise-col">
                  {idx + 1}{" "}
                </Col>
                <Col sm="5" md="5" className="px-0 single-col exercise-col">
                  {exercise.nameEn.toUpperCase()} (
                  {exercise.equipment.toUpperCase()})
                </Col>
                <Col sm="5" md="5" className="px-0 single-col exercise-col">
                  {" "}
                  {exercise.bodyPart.toUpperCase()}
                </Col>

                {exercise.addedResults &&
                  exercise.addedResults.map((result, index) => {
                    let totalVolume = 0;
                    let totalVolumeDivideBymass = 0;

                    for (let i = 0; i <= index; i++) {
                      totalVolume +=
                        exercise.addedResults[i].setWeight *
                        exercise.addedResults[i].setRepetition;
                      totalVolumeDivideBymass =
                        totalVolume / results.bodyWeight;
                    }
                    return (
                      <React.Fragment key={result.id + index}>
                        {index === 0 && (
                          <Row>
                            <Col
                              className="firstCol"
                              md={
                                !result.setWeight && !result.setDistance && 4
                              }>
                              SET
                            </Col>
                            {result.setWeight && (
                              <Col className="firstCol">WEIGHT</Col>
                            )}
                            {result.setRepetition && (
                              <Col
                                md={
                                  !result.setWeight && !result.setDistance && 4
                                }
                                className="firstCol">
                                REPETITION
                              </Col>
                            )}{" "}
                            {result.setDistance && (
                              <Col className="firstCol">DISTANCE</Col>
                            )}
                            {result.setTime && (
                              <Col
                                md={
                                  !result.setWeight && !result.setDistance && 4
                                }
                                className="firstCol">
                                TIME
                              </Col>
                            )}
                          </Row>
                        )}
                        <Row
                          key={result.id + index}
                          className={
                            idx % 2 === 0
                              ? "exercise-row-even"
                              : "exercise-row-odd"
                          }>
                          <Col> {index + 1}. </Col>
                          {(result.setWeight || result.setDistance) && (
                            <Col>
                              {" "}
                              {result.setWeight} {result.setWeight && "kg"}
                              {result.setDistance} {result.setDistance && "m"}
                            </Col>
                          )}
                          <Col>
                            {" "}
                            {result.setRepetition} {result.setTime}
                          </Col>
                          {!result.setWeight && !result.setDistance && (
                            <Col>{""}</Col>
                          )}
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
        <Col sm="6" md="6" className="button-new-exercise">
          <Button
            color="primary"
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
        <Col sm="6" md="6" className="button-new-exercise">
          <Button
            color="primary"
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
};

export default Result;
