import React, { useState, useCallback, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Modal, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

const MyVerticallyCenteredModal = (props) => {
  const [form, setForm] = useState({
    exerciseName: "",
    selectedBodyPart: "CHEST",
    selectedEquipment: "BAREBELL",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);

  const toastId = React.useRef(null);

  useEffect(() => {
    if (errorMsg) {
      setIsWaiting(true);
      toastId.current = toast(errorMsg, {
        position: "top-center",
        autoClose: 100000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setErrorMsg("");
  }, [errorMsg]);

  let updateForm = (value) => {
    return setForm((prev) => {
      setIsWaiting(false);
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
      const record = await res.json();
      if (res.status < 200 || res.status > 299) {
        // errorMsg = alert(record.msg);
        setErrorMsg(record.msg);

        return;
      }
      props.setExercises((prev) => {
        return [...prev, record.data];
      });
    } catch (error) {
      console.log(error);
    }

    setForm({ exerciseName: "", selectedBodyPart: "", selectedEquipment: "" });
    props.onHide();
  }, []);

  const onClose = () => {
    props.onHide();
    setIsWaiting(false);
  };

  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header>
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
        <Button
          disabled={isWaiting}
          color="primary"
          onClick={(e) => onSubmit(e, form)}>
          Save
        </Button>
        <Button color="primary" onClick={onClose}>
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
  const [modalShow, setModalShow] = useState(false);

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
