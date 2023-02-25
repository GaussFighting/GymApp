import { Row, Col } from "react-bootstrap";
import React from "react";

const ExerciseChartsTrainingShortcut = ({ exResults, rowKey }) => {
  let allResultsForCurrentExercise = exResults.map((exercise) => {
    let singleTrainingResults = exercise.map((set, idx2) => {
      let text = "";
      let colSize = "2";
      if (set.velocity && set.pace) {
        text =
          set.velocity +
          " km/h " +
          "\xA0" +
          "\xA0" +
          "\xA0" +
          "\xA0" +
          "\xA0" +
          set.pace +
          " min/km";
        colSize = "7";
      }
      if (set.weight && set.repetition) {
        text = set.weight + "kg x " + set.repetition;
      }
      if (!set.weight && set.repetition) {
        text = set.repetition;
      }

      return (
        <Col
          key={"exerciseResults-" + rowKey + idx2}
          sm="12"
          md={colSize}
          style={{
            textTransform: "lowercase",
          }}>
          {text}
        </Col>
      );
    });
    return singleTrainingResults;
  });

  return (
    <Row key={rowKey} className="mobile-row">
      {allResultsForCurrentExercise[0].slice(
        Math.max(allResultsForCurrentExercise[0].length - 5, 0)
      )}
    </Row>
  );
};

export default ExerciseChartsTrainingShortcut;
