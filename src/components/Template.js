import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ListGroupItem, Row, Col, Modal } from "react-bootstrap";

function Template() {
  let { id } = useParams();
  const [template, setTemplate] = useState({});

  useEffect(() => {
    const fetchTemplate = async () => {
      const response = await fetch(`http://localhost:5000/template/${id}`);

      const responseData = await response.json();

      setTemplate({
        id: responseData._id,
        templateName: responseData.templateName,
        description: responseData.description,
        templateExercises: responseData.templateExercises,
      });
    };
    fetchTemplate();
  }, [id]);

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
      <div className="spacer"></div>
      {console.log(template)}
    </div>
  );
}

export default Template;
