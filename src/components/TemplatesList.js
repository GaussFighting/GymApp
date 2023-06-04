import React from "react";
import { Link } from "react-router-dom";
import { Button, Input, Label } from "reactstrap";
import { ListGroup, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { CSVLink } from "react-csv";
import useFetchTemplates from "../hooks/useFetchTemplates";
import ReactPaginate from "react-paginate";

const TemplatesList = (props) => {
  const {
    templates,
    loading,
    pageCount,
    currentPage,
    setCurrentPage,
    limit,
    setLimit,
    handlePageClick,
  } = useFetchTemplates();

  if (loading)
    return (
      <div className="d-flex spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );

  const headers = [
    { label: "Template id", key: "idTemplate" },
    { label: "Template Name", key: "nameTemplate" },
    { label: "Template Descritpion", key: "descriptionTemplate" },
    { label: "Exercise id", key: "id" },
    { label: "Exercise MongoDB id", key: "_id" },
    { label: "Exercise Name", key: "nameEn" },
    { label: "Exercise Body Part", key: "bodyPart" },
    { label: "Exercise Equipment", key: "equipment" },
    { label: "Exercise Sets", key: "sets" },
  ];

  const dataSketch = templates.map((trn) => {
    let exerciseWithTempAtr = trn.templateExercises.map((ex) => {
      return {
        ...ex,
        idTemplate: trn.id,
        nameTemplate: trn.templateName,
        descriptionTemplate: trn.descritpion,
      };
    });
    return exerciseWithTempAtr;
  });

  const data = dataSketch.flat();

  // without slice, reverse gaves unexpected results and dont reverse array templates!
  const TemplatesList = templates
    .slice(0)
    .reverse()
    .map((template, index) => (
      <ListGroup key={template.id}>
        <Row className="main-row ml-0 pl-0 gx-0">
          <Link
            className=" ml-0 pl-0 gx-0"
            state={props.training ? { templateObj: template } : {}}
            to={
              props.training ? `/templateworkout` : `/template/${template.id}`
            }>
            <Col sm="12" md="12 " className="col-name">
              {index + 1} {template.templateName.toUpperCase()}
            </Col>
          </Link>
        </Row>
        <Row className="template-row">
          {template.templateExercises.map((exercise, idx) => (
            <Row className="template-row-exercise" key={exercise.id}>
              <Col sm="1" md="1" lg="1">
                {idx + 1}{" "}
              </Col>
              <Col sm="7" md="8" lg="10">
                {exercise.nameEn.toUpperCase()} {"("}
                {exercise.equipment.toUpperCase()}
                {")"}
              </Col>
              <Col sm="4" md="2" lg="1">
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
      <ul className="ul-exercise mt-3">{TemplatesList}</ul>
      <Label for="setLimit">SET NUMBER OF TEMPLATE</Label>
      <div className="input-limit mb-3">
        <Input
          className="input "
          type="select"
          name="Set Limit"
          value={limit}
          onChange={(event) => {
            setLimit(event.target.value);
            setCurrentPage(1);
          }}>
          <option>1</option>
          <option>5</option>
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </Input>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        forcePage={currentPage - 1}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
      />

      <Button color="primary">
        {" "}
        <CSVLink
          data={data}
          headers={headers}
          separator={";"}
          filename={"template-exercises.csv"}
          className="add-new-template-cancel-button"
          target="_blank">
          Download CSV
        </CSVLink>
      </Button>

      <div className="spacer"></div>
    </div>
  );
};

export default TemplatesList;
