import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Row, Col } from "react-bootstrap";
import { Label, Input, Button } from "reactstrap";
import useFetchResults from "../hooks/useFetchResults";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const History = () => {
  // let [startDate, setStartDate] = useState();
  // let [endDate, setEndDate] = useState();
  let startDate = "";
  let endDate = "";
  const format = "YYYY-MM-DD";
  const moment = require("moment");
  const toastId = React.useRef(null);

  const {
    results,
    loading,
    pageCount,
    currentPage,
    setCurrentPage,
    limit,
    setLimit,
    handlePageClick,
  } = useFetchResults({ startDate, endDate });

  useEffect(() => {
    if (loading) {
      toastId.current = toast("Results in progress", {
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

  const displayedWorkouts = () => {
    return results.map((result, index) => {
      return (
        <ListGroup key={result.id}>
          <Row className="template-row">
            <Link to={`/results/${result.id}`}>
              <Col sm="12" md="12" className="col-name">
                {index + 1} {moment(result.date).format(format)}
              </Col>
            </Link>
          </Row>
        </ListGroup>
      );
    });
  };

  const downloadJson = () => {
    const mainData = results;
    const JSONfile = `data:text/json;charset=utf-8,${JSON.stringify(mainData)}`;
    const encodedUri = encodeURI(JSONfile);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "results.json");
    document.body.appendChild(link);
    link.click();
    window.open(encodedUri);
    document.body.removeChild(link);
  };

  return (
    <div className="mt-3">
      <Row>
        <Col className="pt-3 text-center ">
          <h1>
            {" "}
            <strong>List of all results</strong>{" "}
          </h1>{" "}
        </Col>
      </Row>
      <ul className="ul-exercise mt-3">{displayedWorkouts()}</ul>
      <Label for="setLimit">SET NUMBER OF RESULTS</Label>
      {pageCount != 0 && (
        <div className="input-limit mb-3">
          <Input
            className="input "
            type="select"
            name="Set Limit"
            value={limit}
            onChange={(event) => {
              setLimit(event.target.value);
              setCurrentPage(1);
            }}>
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
            <option>500</option>
            <option>1000</option>
          </Input>
        </div>
      )}
      {pageCount != 0 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          forcePage={currentPage - 1}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      )}
      <Button
        color="primary"
        className="add-new-template-cancel-button"
        onClick={() => {
          downloadJson();
        }}>
        DOWNLOAD {limit} RESULTS
      </Button>
      <div className="spacer  mb-3"></div>
    </div>
  );
};

export default History;
