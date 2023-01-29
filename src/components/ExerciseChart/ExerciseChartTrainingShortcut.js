import { Row, Col } from "react-bootstrap";
import React from "react";

const ExerciseChartsTrainingShortcut = ({ exResults, rowKey }) => {
  let stefan = exResults.map((exercise) => {
    let asdf = exercise.map((set, idx2) => {
      console.log(set);
      let text = "";
      let colSize = "2";
      if (set.velocity && set.pace) {
        text = set.velocity + " km/h " + set.pace + " min/km";
        colSize = "6";
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
          xs="6"
          md={colSize}
          style={{
            textTransform: "lowercase",
          }}>
          {text}
        </Col>
      );
    });

    return asdf;
  });
  return (
    <Row key={rowKey}>{stefan[0].slice(Math.max(stefan[0].length - 5, 0))}</Row>
  );
};

export default ExerciseChartsTrainingShortcut;
