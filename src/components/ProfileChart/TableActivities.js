import React, { useEffect } from "react";
import useFetchResults from "../../hooks/useFetchResults";
import { Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TableActivities = () => {
  const { loading, count } = useFetchResults({
    countTrainingsPerYears: true,
  });

  const toastId = React.useRef(null);

  useEffect(() => {
    if (loading) {
      toastId.current = toast("Table of trainings in progress", {
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

  let TableYear = () => {
    return (
      <div className="profile-table ">
        <div className="profile-table ">
          <Row className="profile-table-row">
            {count.map((el, idx) => {
              return (
                <React.Fragment className="profile-table-row">
                  {idx === 0 && (
                    <Col key={el + idx}>
                      <Row className="profile-table-item">Year</Row>
                      <Row className="profile-table-item-result">Sessions</Row>
                    </Col>
                  )}
                  {idx <= count.length - 2 && (
                    <Col key={el + idx}>
                      <Row className="profile-table-item"> {2023 - idx}</Row>
                      <Row className="profile-table-item-result"> {el}</Row>
                    </Col>
                  )}
                  {idx === count.length - 1 && (
                    <Col key={el + idx}>
                      <Row className="profile-table-item-last">
                        {" "}
                        {2023 - idx}
                      </Row>
                      <Row className="profile-table-item-result-last">
                        {" "}
                        {el}
                      </Row>
                    </Col>
                  )}
                </React.Fragment>
              );
            })}
          </Row>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h4>Training summary </h4>
      {count && <TableYear />}
      <div className="spacer "></div>
    </div>
  );
};

export default TableActivities;
