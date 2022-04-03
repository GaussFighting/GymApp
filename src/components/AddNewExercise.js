import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Modal, Row, Col } from "react-bootstrap";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
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
                //   value={}
                onChange={(event) => {}}
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
                  //   value={filterOption}
                  onChange={(event) => {}}
                >
                  {" "}
                  {props.optionsBodyPart}
                </Input>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                {" "}
                <Label for="exampleSelect">
                  SELECT{" "}
                  {props.nameEquipment.replace(/([A-Z])/g, " $1").toUpperCase()}
                </Label>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  className="selector"
                  //   value={filterOption}
                  onChange={(event) => {}}
                >
                  {props.optionsEquipment}
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button>Save</Button>
        <Button onClick={props.onHide}>Close</Button>
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
        className="new-exercise"
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
