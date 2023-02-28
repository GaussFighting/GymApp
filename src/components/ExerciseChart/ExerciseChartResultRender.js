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
      <div className="single-training-result">
        <React.Fragment key={"mainRow" + index}>
          {index === 0 && <ExerciseChartSubHeader bestResults={bestResults} />}
          <div key={"exerciseLink" + index}>
            <Link
              className="template-link-chart"
              to={`/results/${results[index].id}`}>
              <Row className="template-link-chart">
                <Col sm="12" md="1" lg="1">
                  {index + 1}
                </Col>
                <Col sm="12" md="1" lg="1">
                  {moment(ex.date).format(format)}
                </Col>
                <Col sm="12" md="1" lg="1">
                  {ex.bodyWeight.toFixed(1)}
                  {" kg"}
                </Col>
                <ExerciseChartSingleResultRender
                  shortTrainingSummary={shortTrainingSummary}
                />
                <Col sm="12" md="6" lg="6">
                  <ExerciseChartsTrainingShortcut
                    exResults={singleTrainRes}
                    rowKey={"row" + index}
                  />
                </Col>
              </Row>
            </Link>
          </div>
        </React.Fragment>
      </div>
    );
  });
  return renderedResults;
};

export default ExerciseChartResultRender;
