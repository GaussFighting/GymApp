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
    console.log(count.slice(0, 4));

    return (
      <div className="profile-table ">
        <div className="profile-table ">
          <Row className="profile-table-row">
            {count.map((el, idx) => {
              return (
                <React.Fragment key={idx + el}>
                  {idx === 0 && (
                    <Col key={el - 1}>
                      <Row className="profile-table-item">Year</Row>
                      <Row className="profile-table-item-result">Sessions</Row>
                    </Col>
                  )}
                  {idx <= count.length - 2 && (
                    <Col key={el + idx}>
                      <Row className="profile-table-item"> {2024 - idx}</Row>
                      <Row className="profile-table-item-result"> {el}</Row>
                    </Col>
                  )}
                  {idx === count.length - 1 && (
                    <Col key={el + idx}>
                      <Row className="profile-table-item-last">
                        {" "}
                        {2024 - idx}
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
    count !== 0 && (
      <div className="mobile-header">
        <h4>Training summary </h4>
        <TableYear />
        <div className="spacer "></div>
      </div>
    )
  );
};

export default TableActivities;
