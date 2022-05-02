import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Row, Col } from "react-bootstrap";

const TemplatesList = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await fetch("http://localhost:5000/templates");

      const responseData = await response.json();
      const loadedTemplates = [];

      for (const key in responseData) {
        loadedTemplates.push({
          id: responseData[key]._id,
          templateName: responseData[key].templateName,
          descritpion: responseData[key].description,
          templateExercises: responseData[key].templateExercises,
        });
      }
      setTemplates(loadedTemplates);
    };

    fetchExercises();
  }, []);

  const TemplatesList = templates.map((template, index) => (
    <ListGroup key={template.id}>
      <Link to={`/template/${template.id}`}>
        <Row>
          <Col xs="1" md="1">
            {index + 1} {template.templateName.toUpperCase()}
          </Col>
        </Row>

        <Row>
          <Col xs="6" md="6">
            {template.templateExercises.map((exercise, idx) => (
              <div>
                {idx + 1} {exercise.nameEn.toUpperCase()} {exercise.sets} SETS
              </div>
            ))}
          </Col>
        </Row>
      </Link>
    </ListGroup>
  ));

  return (
    <div>
      <ul className="ul-exercise">{TemplatesList}</ul>
      <div className="spacer"></div>
      {console.log(templates)}
    </div>
  );
};

export default TemplatesList;
