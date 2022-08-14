import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Row, Col } from "react-bootstrap";
import { FormGroup, Label, Input, Button } from "reactstrap";

const History = () => {
  const [results, setResults] = useState([]);
  let [startDate, setStartDate] = useState();
  let [endDate, setEndDate] = useState();
  const [filteredResults, setFilteredResults] = useState([]);

  const format = "YYYY-MM-DD";
  const moment = require("moment");

  const filterResults = () => {
    const resultsList = results.filter((result) => {
      return (
        moment(result.date).isAfter(startDate) &&
        moment(result.date).isBefore(endDate)
      );
    });

    return setFilteredResults(resultsList);
  };

  const asdf = () => {
    return filteredResults.map((result, index) => {
      return (
        <ListGroup key={result.id}>
          <Row className="template-row">
            <Link to={`/results/${result.id}`}>
              <Col xs="12" md="12" className="col-name">
                {index + 1} {moment(result.date).format(format)}
              </Col>
            </Link>
          </Row>
        </ListGroup>
      );
    });
  };

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(
        `http://localhost:5000/results?abc=${startDate}&def=${endDate}`
      );

      const responseData = await response.json();
      const loadedResults = [];

      for (const key in responseData) {
        loadedResults.push({
          id: responseData[key]._id,
          templateName: responseData[key].templateName,
          descritpion: responseData[key].description,
          bodyWeight: responseData[key].bodyWeight,
          date: responseData[key].date,
          templateExercises: responseData[key].templateExercises,
        });
      }
      setResults(loadedResults);
      console.log("loadedResults", loadedResults);
    };

    fetchResults();
  }, [startDate, endDate]);

  return (
    <div>
      <FormGroup>
        <Label for="exampleDate">START DATE</Label>
        <Input
          id="exampleDate"
          name="date"
          placeholder="date placeholder"
          type="date"
          onChange={(date) => {
            console.log(date.target.value);
            setStartDate(() => {
              return moment(date.target.value).toDate();
            });
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleDate">END DATE</Label>
        <Input
          id="exampleDate"
          name="date"
          placeholder="date placeholder"
          type="date"
          onChange={(date) => {
            setEndDate(() => {
              return moment(date.target.value).endOf("day").toDate();
            });
          }}
        />
      </FormGroup>
      <Button
        className="add-new-template-cancel-button"
        onClick={() => {
          if (startDate && endDate) {
            filterResults();
          }
        }}
      >
        SHOW RESULTS
      </Button>
      {/* <Button className="add-new-template-cancel-button" onClick={() => {}}>
        NEXT PAGE
      </Button> */}

      <ul className="ul-exercise">{asdf()}</ul>
      {/* {console.log("asdf")} */}
      <div className="spacer"></div>
    </div>
  );
};

export default History;
