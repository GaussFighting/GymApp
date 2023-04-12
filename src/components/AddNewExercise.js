import React, { useState, useCallback } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Modal, Row, Col } from "react-bootstrap";

const MyVerticallyCenteredModal = (props) => {
  const [form, setForm] = useState({
    exerciseName: "",
    selectedBodyPart: "CHEST",
    selectedEquipment: "BAREBELL",
  });

  let updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };
  const onSubmit = useCallback(async (e, dataOnSubmit) => {
    e.preventDefault();
    const newExercise = { ...dataOnSubmit };
    try {
      const res = await fetch("/.netlify/functions/exerciseCreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExercise),
      });
      console.log("res", res);
      const record = await res.json();
      console.log("record:", record);
      props.setExercises((prev) => {
        return [...prev, record.data];
      });
    } catch (error) {
      console.log(error);
    }

    setForm({ exerciseName: "", selectedBodyPart: "", selectedEquipment: "" });
    props.onHide();
  }, []);

  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter ">
          Please add new exercise
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <FormGroup>
              <Input
                className="input"
                type="text"
                placeholder="Exercise name"
                value={form.exerciseName}
                onChange={(event) =>
                  updateForm({ exerciseName: event.target.value })
                }></Input>
            </FormGroup>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                {" "}
                <Label for="exampleSelect">
                  SELECT{" "}
                  {props.nameBodyPart.replace(/([A-Z])/g, " $1").toUpperCase()}
                </Label>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  value={form.selectedBodyPart}
                  onChange={(event) =>
                    updateForm({ selectedBodyPart: event.target.value })
                  }>
                  {props.optionsBodyPart}
                </Input>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="exampleSelect">
                  SELECT{" "}
                  {props.nameEquipment.replace(/([A-Z])/g, " $1").toUpperCase()}
                </Label>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  value={form.selectedEquipment}
                  onChange={(event) =>
                    updateForm({ selectedEquipment: event.target.value })
                  }>
                  {props.optionsEquipment}
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="center-block-button">
        <Button color="primary" onClick={(e) => onSubmit(e, form)}>
          Save
        </Button>
        <Button color="primary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const AddNewExercise = ({
  nameBodyPart,
  uniqueListBodyPart,
  nameEquipment,
  uniqueListEquipment,
  setExercises,
}) => {
  const [modalShow, setModalShow] = React.useState(false);

  const optionsBodyPart = uniqueListBodyPart.map((item, idx) => (
    <option key={item + idx}>{item}</option>
  ));

  const optionsEquipment = uniqueListEquipment.map((item, idx) => (
    <option key={item + idx}>{item}</option>
  ));

  return (
    <div className="center-block">
      <Button color="link" onClick={() => setModalShow(true)}>
        ADD NEW EXERCISE
      </Button>

      <MyVerticallyCenteredModal
        nameBodyPart={nameBodyPart}
        uniqueListBodyPart={uniqueListBodyPart}
        nameEquipment={nameEquipment}
        uniqueListEquipment={uniqueListEquipment}
        optionsBodyPart={optionsBodyPart}
        optionsEquipment={optionsEquipment}
        show={modalShow}
        setExercises={setExercises}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default AddNewExercise;
