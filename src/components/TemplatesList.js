import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

const TemplatesList = (props) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/.netlify/functions/templateRead`);

        const responseData = await response.json();
        const loadedTemplates = [];

        const templatesArr = responseData.data.templates;

        for (const key in templatesArr) {
          loadedTemplates.push({
            id: templatesArr[key]._id,
            templateName: templatesArr[key].templateName,
            descritpion: templatesArr[key].description,
            templateExercises: templatesArr[key].templateExercises,
          });
        }
        setTemplates(loadedTemplates);
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

  const TemplatesList = templates.map((template, index) => (
    <ListGroup key={template.id}>
      <Row className="template-row">
        <Link
          state={props.training ? { templateObj: template } : {}}
          to={props.training ? `/templateworkout` : `/template/${template.id}`}
        >
          <Col xs="12" md="12" className="col-name">
            {index + 1} {template.templateName.toUpperCase()}
          </Col>
        </Link>
      </Row>
      <Row className="template-row">
        {template.templateExercises.map((exercise, idx) => (
          <Row className="template-row-exercise" key={exercise.id}>
            <Col xs="1" md="2">
              {idx + 1}{" "}
            </Col>
            <Col xs="7" md="8">
              {exercise.nameEn.toUpperCase()} {"("}
              {exercise.equipment.toUpperCase()}
              {")"}
            </Col>
            <Col xs="4" md="2">
              {" "}
              {exercise.sets} SETS
            </Col>
          </Row>
        ))}
      </Row>
    </ListGroup>
  ));

  return (
    <div>
      <ul className="ul-exercise">{TemplatesList}</ul>
      <div className="spacer"></div>
    </div>
  );
};

export default TemplatesList;
