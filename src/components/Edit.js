import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Row } from "react-bootstrap";
import useFetchExercise from "../hooks/useFetchExercise";

const Edit = ({ exerciseName, bodyPart, equipment }) => {
  const { form, setForm, params, navigate } = useFetchExercise({
    exerciseName,
    bodyPart,
    equipment,
  });

  // These methods will update the state properties.
  const updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const editedExercise = {
      nameEn: form.nameEn,
      bodyPart: form.bodyPart,
      equipment: form.equipment,
    };

    // This will send a post request to update the data in the database.
    try {
      await fetch(`/.netlify/functions/exerciseUpdate?id=${params.id}`, {
        method: "PUT",
        body: JSON.stringify(editedExercise),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
    console.log(params.id);
    navigate("/exercises");
  };

  // This following section will display the form that takes input from the user to update the data.
  return (
    <Form className="edit-form">
      <Row>
        <FormGroup className="form-group">
          <Label for="exampleSelect ">PUT NEW NAME</Label>
          <Input
            className="input "
            type="text"
            placeholder="Search..."
            value={exerciseName.toUpperCase()}
            onChange={(e) => updateForm({ nameEn: e.target.value })}></Input>
        </FormGroup>
        <FormGroup className="form-group">
          <Label for="exampleSelect">SELECT BODY PART</Label>
          <Input
            type="select"
            name="select"
            id="exampleSelect"
            value={bodyPart.toUpperCase()}
            onChange={(e) => updateForm({ bodyPart: e.target.value })}>
            <option>BACK</option>
            <option>LEGS</option>
            <option>SHOULDERS</option>
            <option>ARMS</option>
            <option>CHEST</option>
            <option>CORE</option>
            <option>OLYMPIC</option>
            <option>FULL BODY</option>
            <option>OLIMPIC</option>
          </Input>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup className="form-group">
          <Label for="exampleSelect">SELECT BODY PART</Label>
          <Input
            type="select"
            name="select"
            id="exampleSelect"
            value={equipment.toUpperCase()}
            onChange={(e) => updateForm({ equipment: e.target.value })}>
            <option>BAREBELL</option>
            <option>DUMBBELL</option>
            <option>REPS ONLY</option>
            <option>DURATION</option>
            <option>OTHER</option>
            <option>WEIGHTED BODYWEIGHT</option>
            <option>CARDIO</option>
            <option>ASSISTED BODYWEIGHT</option>
            <option>MACHINE</option>
            <option>CABLE</option>
          </Input>
        </FormGroup>
        <Row>
          <div className="row-position">
            {" "}
            Are you sure you want to edit current exercise?
          </div>
        </Row>
        <Button
          color="primary"
          className="button-edit"
          disabled={!localStorage.getItem("isAdmin")}
          onClick={(e) => onSubmit(e)}>
          EDIT
        </Button>
      </Row>
    </Form>
  );
};

export default Edit;
