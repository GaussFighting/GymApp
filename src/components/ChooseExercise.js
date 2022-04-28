import React, { useState } from "react";
import ExercisesForTemplate from "./ExercisesForTemplate";
import { Button } from "reactstrap";
import { Modal, ModalHeader, ModalFooter } from "react-bootstrap";

function ChooseExercise(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCancel = () => props.setAddedExercises([]);

  return (
    <div>
      <Button color="danger" onClick={handleShow}>
        Add New Exercise
      </Button>
      <Modal show={show} onHide={handleClose}>
        <ModalHeader toggle={function noRefCheck() {}}>
          CHOOSE EXERCISE
        </ModalHeader>
        <ExercisesForTemplate
          setAddedExercises={props.setAddedExercises}
          addedExercises={props.addedExercises}
        />
        <ModalFooter>
          <Button color="primary" onClick={handleClose}>
            Add to Template
          </Button>
          <Button
            onClick={() => {
              handleClose();
              handleCancel();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ChooseExercise;
