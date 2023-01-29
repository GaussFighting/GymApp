import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Chart from "../Chart";
import allTypeResults from "../../utils/allTypeResults";
import ExerciseChartHeader from "./ExerciseChartHeader";
import ExerciseChartResultRender from "./ExerciseChartResultRender";

const ExerciseCharts = ({ exerciseId }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      let response = "";
      try {
        setLoading(true);
        response = exerciseId
          ? await fetch(
              `/.netlify/functions/resultRead?exerciseId=${exerciseId}`
            )
          : await fetch(`/.netlify/functions/resultRead`);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setIsError("server error");
        console.log(error);
      }
      if (!(200 <= response.status && response.status < 300)) {
        setIsError("error - status is not 2XX");
        console.log("error", response);
      } else {
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
      }
    };

    fetchResults();
  }, [exerciseId]);

  if (isError) {
    return <div>{isError}</div>;
  }

  if (loading)
    return (
      <div className="d-flex spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  const bestResults = allTypeResults(results, exerciseId);

  if (!results.length) {
    return (
      <div>
        We ARE SORRY THERE IS NO RECORDS IN DATABASE FOR THIS EXERCISE :(
      </div>
    );
  }
  return (
    <div>
      <Chart results={results} exerciseId={exerciseId} />
      <Row className="top-row">
        <Row>
          <Col xs="12" md="12">
            <ExerciseChartHeader bestResults={bestResults} />
            <ExerciseChartResultRender
              results={results}
              bestResults={bestResults}
              exerciseId={exerciseId}
            />
          </Col>
        </Row>
      </Row>
      <div className="spacer"></div>
    </div>
  );
};
export default ExerciseCharts;
