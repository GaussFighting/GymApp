import React, { useMemo, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Chart from "../Chart";
import allTypeResults from "../../utils/allTypeResults";
import ExerciseChartHeader from "./ExerciseChartHeader";
import ExerciseChartResultRender from "./ExerciseChartResultRender";
import useFetchResults from "../../hooks/useFetchResults";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExerciseChart = ({ exerciseId }) => {
  const { results, loading, isError } = useFetchResults({ exerciseId });

  const toastId = React.useRef(null);

  useEffect(() => {
    if (loading) {
      toastId.current = toast("Exercise results and charts in progress", {
        position: "top-center",
        // autoClose: 1000,
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

  // if (loading)
  //   return (
  //     <div className="d-flex spinner">
  //       <Spinner animation="border" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </Spinner>
  //     </div>
  //   );

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
