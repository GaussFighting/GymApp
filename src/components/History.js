import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Row, Col } from "react-bootstrap";
import { FormGroup, Label, Input, Button } from "reactstrap";
import Spinner from "react-bootstrap/Spinner";

const History = () => {
  const [results, setResults] = useState([]);
  let [startDate, setStartDate] = useState();
  let [endDate, setEndDate] = useState();
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const allResults = () => {
    return setFilteredResults(results);
  };
  const displayedWorkouts = () => {
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
      try {
        // setLoading(true);
        const response =
          startDate && endDate
            ? await fetch(
                `/.netlify/functions/resultRead?startDate=${startDate}&endDate=${endDate}`
              )
            : await fetch(`/.netlify/functions/resultRead`);

        const responseData = await response.json();
        const loadedResults = [];
        const resultArr = responseData.data.results;

        for (const key in resultArr) {
          loadedResults.push({
            id: resultArr[key]._id,
            templateName: resultArr[key].templateName,
            descritpion: resultArr[key].description,
            bodyWeight: resultArr[key].bodyWeight,
            date: resultArr[key].date,
            templateExercises: resultArr[key].templateExercises,
          });
        }
        setResults(loadedResults);
        console.log("loadedResults", loadedResults);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchResults();
  }, [startDate, endDate]);

  if (loading)
    return (
      <div className="d-flex spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );

  const downloadJson = () => {
    const mainData = results;
    const JSONfile = `data:text/json;charset=utf-8,${JSON.stringify(mainData)}`;
    const encodedUri = encodeURI(JSONfile);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "results.json");
    document.body.appendChild(link);
    link.click();
    window.open(encodedUri);
    document.body.removeChild(link);
  };

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
        color="primary"
        className="add-new-template-cancel-button"
        onClick={() => {
          if (startDate && endDate) {
            filterResults();
          }
        }}>
        SHOW RESULTS
      </Button>
      <Button
        color="primary"
        className="add-new-template-cancel-button"
        onClick={() => {
          allResults();
        }}>
        SHOW ALL RESULTS
      </Button>
      {/* <Button className="add-new-template-cancel-button" onClick={() => {}}>
        NEXT PAGE
      </Button> */}
      <Button
        color="primary"
        className="add-new-template-cancel-button"
        onClick={() => {
          downloadJson();
        }}>
        DOWNLOAD JSON
      </Button>
      <ul className="ul-exercise">{displayedWorkouts()}</ul>
      <div className="spacer"></div>
    </div>
  );
};

export default History;
