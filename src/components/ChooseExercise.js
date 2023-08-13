import React, { useState } from "react";
import ExercisesForTemplate from "./ExercisesForTemplate";
import { Button } from "reactstrap";
import { Modal, ModalHeader, ModalFooter } from "react-bootstrap";

const ChooseExercise = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCancel = () => props.setAddedExercises(() => []);

  return (
    <div className="addButtonWidth">
      <Button color="primary" onClick={handleShow} className="button-modal">
        ADD NEW EXERCISE
      </Button>
      <Modal show={show} onHide={handleClose}>
        <ModalHeader className="form-label">CHOOSE EXERCISE</ModalHeader>
        <ExercisesForTemplate
          setAddedExercises={props.setAddedExercises}
          addedExercises={props.addedExercises}
        />
        <ModalFooter className="modal-footer-buttons center-block-button">
          <Button
            color="primary button-modal"
            onClick={() => {
              handleClose();
            }}>
            ADD
          </Button>
          <Button
            color="primary button-modal"
            className="cancel-button"
            onClick={() => {
              handleClose();
              handleCancel();
            }}>
            CANCEL
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ChooseExercise;
