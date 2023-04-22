import React from "react";
import useFetchResults from "../../hooks/useFetchResults";
import { Row, Col } from "reactstrap";

const TableActivities = () => {
  const { count } = useFetchResults({
    countTrainingsPerYears: true,
  });

  console.log("count", count, typeof count);

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
