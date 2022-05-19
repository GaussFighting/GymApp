import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Row } from "react-bootstrap";

function Edit() {
  const [form, setForm] = useState({
    nameEn: "",
    bodyPart: "",
    equipment: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5000/exercise/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedExercise = {
      nameEn: form.nameEn,
      bodyPart: form.bodyPart,
      equipment: form.equipment,
    };

    // This will send a post request to update the data in the database.
    try {
      await fetch(`http://localhost:5000/exercise/${params.id}`, {
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
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <Form className="edit-form">
      <Row>
        <FormGroup className="form-group">
          <Label for="exampleSelect ">PUT NEW NAME</Label>
          <Input
            className="input select-name-position"
            type="text"
            placeholder="Search..."
            value={form.nameEn.toUpperCase()}
            onChange={(e) => updateForm({ nameEn: e.target.value })}
          ></Input>
        </FormGroup>
        <FormGroup className="form-group">
          {console.log(form)}
          <Label for="exampleSelect">SELECT BODY PART</Label>
          <Input
            type="select"
            name="select"
            id="exampleSelect"
            className="selector select-name-position"
            value={form.bodyPart}
            onChange={(e) => updateForm({ bodyPart: e.target.value })}
          >
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
            className="selector select-name-position"
            value={form.equipment}
            onChange={(e) => updateForm({ equipment: e.target.value })}
          >
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
        <Button className="button-edit" onClick={(e) => onSubmit(e)}>
          EDIT
        </Button>
      </Row>
    </Form>
  );
}

export default Edit;
