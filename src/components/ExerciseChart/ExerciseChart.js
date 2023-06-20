import React, { useMemo, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Chart from "../Chart";
import allTypeResults from "../../utils/allTypeResults";
import ExerciseChartHeader from "./ExerciseChartHeader";
import ExerciseChartResultRender from "./ExerciseChartResultRender";
import useFetchResults from "../../hooks/useFetchResults";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExerciseChart = ({ exerciseId }) => {
  const { results, loading, isError, noDataText } = useFetchResults({
    exerciseId,
  });
  const toastId = React.useRef(null);

  useEffect(() => {
    if (loading) {
      toastId.current = toast("Exercise results and charts in progress", {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.dismiss(toastId.current);
    }
  }, [loading]);

  const bestResults = useMemo(() => {
    if (results.length > 0) {
      return allTypeResults(results, exerciseId);
    } else {
      return {};
    }
  }, [results, exerciseId]);
  if (isError) {
    return <div>{isError}</div>;
  }

  if (!results.length) {
    return <div>{noDataText}</div>;
  }

  return (
    <div>
      <Chart results={results} exerciseId={exerciseId} />
      <Row className="top-row">
        <Row>
          <Col sm="12" md="12">
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
export default ExerciseChart;
