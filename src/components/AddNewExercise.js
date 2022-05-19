import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Modal, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MyVerticallyCenteredModal(props) {
  const [form, setForm] = useState({
    exerciseName: "",
    selectedBodyPart: "CHEST",
    selectedEquipment: "BAREBELL",
  });

  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  async function onSubmit(e) {
    e.preventDefault();
    const newExercise = { ...form };
    try {
      await fetch("http://localhost:5000/exercise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExercise),
      });
    } catch (error) {
      console.log(error);
    }

    setForm({ exerciseName: "", selectedBodyPart: "", selectedEquipment: "" });
    navigate("/exercises");
  }
  console.log(props);
  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
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
                }
              ></Input>
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
                  className="selector"
                  value={form.selectedBodyPart}
                  onChange={(event) =>
                    updateForm({ selectedBodyPart: event.target.value })
                  }
                >
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
                  className="selector"
                  value={form.selectedEquipment}
                  onChange={(event) =>
                    updateForm({ selectedEquipment: event.target.value })
                  }
                >
                  {props.optionsEquipment}
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="new-exercise" onClick={(e) => onSubmit(e)}>
          Save
        </Button>
        <Button className="new-exercise" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const AddNewExercise = ({
  nameBodyPart,
  uniqueListBodyPart,
  nameEquipment,
  uniqueListEquipment,
}) => {
  const [modalShow, setModalShow] = React.useState(false);

  const optionsBodyPart = uniqueListBodyPart.map((item, idx) => (
    <option key={item + idx}>{item}</option>
  ));

  const optionsEquipment = uniqueListEquipment.map((item, idx) => (
    <option key={item + idx}>{item}</option>
  ));

  return (
    <div>
      <Button
        color="link"
        className="new-exercise "
        onClick={() => setModalShow(true)}
      >
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
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default AddNewExercise;
