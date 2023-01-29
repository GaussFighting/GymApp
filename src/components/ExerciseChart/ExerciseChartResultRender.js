import React from "react";
import ExerciseChartSubHeader from "./ExerciseChartSubHeader";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import ExerciseChartSingleResultRender from "./ExerciseChartSingleResultRender";
import ExerciseChartsTrainingShortcut from "./ExerciseChartTrainingShortcut";
import twoColResRend from "../../utils/twoColResRend";
import singleTrainingResults from "../../utils/singleTrainingResults";
import moment from "moment";

const ExerciseChartResultRender = ({ results, bestResults, exerciseId }) => {
  const format = "YYYY-MM-DD";

  let renderedResults = results.map((ex, index) => {
    const shortTrainingSummary = twoColResRend(ex, exerciseId);
    const singleTrainRes = singleTrainingResults(ex, exerciseId);
    return (
      <React.Fragment key={"mainRow" + index}>
        {index === 0 && <ExerciseChartSubHeader bestResults={bestResults} />}
        <div key={"exerciseLink" + index}>
          <Link
            className="template-link-chart"
            to={`/results/${results[index].id}`}>
            <Row className="template-link-chart">
              <Col xs="1" md="1">
                {index + 1}
              </Col>
              <Col xs="1" md="1">
                {moment(ex.date).format(format)}
              </Col>
              <Col xs="1" md="1">
                {ex.bodyWeight.toFixed(1)}
                {" kg"}
              </Col>
              <ExerciseChartSingleResultRender
                shortTrainingSummary={shortTrainingSummary}
              />
              <Col>
                <ExerciseChartsTrainingShortcut
                  exResults={singleTrainRes}
                  rowKey={"row" + index}
                />
              </Col>
            </Row>
          </Link>
        </div>
      </React.Fragment>
    );
  });
  return renderedResults;
};

export default ExerciseChartResultRender;
