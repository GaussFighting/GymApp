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
  let TableYear = () => {
    return (
      <div className="profile-table">
        <Row className="pb-0">
          {count.map((el, idx) => {
            return (
              <Col className="profile-table-item" key={el + idx}>
                {2023 - idx}
              </Col>
            );
          })}
        </Row>
        <Row className="pt-0">
          {count.map((el, idx) => {
            return (
              <Col className="profile-table-item-result" key={el + idx}>
                {el}
              </Col>
            );
          })}
        </Row>
      </div>
    );
  };

  return (
    <div>
      <h4 className="my-3">Training summary </h4>
      {count && <TableYear />}
      <div className="spacer"></div>
    </div>
  );
};

export default TableActivities;
