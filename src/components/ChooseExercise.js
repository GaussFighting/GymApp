import React, { useState } from "react";
import Exercises from "./Exercises";
import { Button } from "reactstrap";
import { Modal, ModalHeader, ModalFooter } from "react-bootstrap";

function ChooseExercise() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button color="danger" onClick={handleShow}>
        Add New Exercise
      </Button>
      <Modal show={show} onHide={handleClose}>
        <ModalHeader toggle={function noRefCheck() {}}>Modal title</ModalHeader>
        <Exercises />
        <ModalFooter>
          <Button color="primary" onClick={handleClose}>
            Do Something
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ChooseExercise;
