import React, { useCallback } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Row } from "react-bootstrap";
import useFetchExercise from "../hooks/useFetchExercise";

const Edit = ({ exerciseName, bodyPart, equipment }) => {
  const { form, setForm, id, navigate } = useFetchExercise({
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

  const onSubmit = useCallback(
    async (e, dataOnSubmit, id) => {
      e.preventDefault();
      const editedExercise = {
        nameEn: dataOnSubmit.nameEn,
        bodyPart: dataOnSubmit.bodyPart,
        equipment: dataOnSubmit.equipment,
      };

      // This will send a post request to update the data in the database.
      try {
        await fetch(`/.netlify/functions/exerciseUpdate?id=${id}`, {
          method: "PUT",
          body: JSON.stringify({
            token: localStorage.getItem("token"),
            editedExercise: editedExercise,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.log(error);
      }
      navigate("/exercises");
    },
    [navigate]
  );
  // This following section will display the form that takes input from the user to update the data.
  return (
    <Form className="edit-form">
      <Row>
        <FormGroup className="form-group">
          <Label for="exampleSelect ">PUT NEW NAME</Label>
          <Input
            className="input "
            name="exerciseName"
            type="text"
            placeholder="Search..."
            value={form.nameEn}
            onChange={(e) => updateForm({ nameEn: e.target.value })}></Input>
        </FormGroup>
        <FormGroup className="form-group">
          <Label for="exampleSelect">SELECT BODY PART</Label>
          <Input
            type="select"
            name="bodyPart"
            id="exampleSelect"
            value={form.bodyPart}
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
            name="equipment"
            id="exampleSelect"
            value={form.equipment}
            onChange={(e) => updateForm({ equipment: e.target.value })}>
            <option>BARBELL</option>
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
          disabled={!(localStorage.getItem("role") === "Admin")}
          onClick={(e) => onSubmit(e, form, id)}>
          EDIT
        </Button>
      </Row>
    </Form>
  );
};

export default Edit;
