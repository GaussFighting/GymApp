import React, { useState } from "react";
import ChooseExercise from "./ChooseExercise";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

function AddNewTemplate() {
  const [addedExercises, setAddedExercises] = useState([]);
  console.log("asdf", addedExercises);

  return (
    <Form>
      <FormGroup>
        <Label for="exampleEmail">Name</Label>
        <Input
          className="input"
          type="text"
          placeholder="Put template name"
          // value={}
          onChange={(event) => {}}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Descritpion</Label>
        <Input
          type="textarea"
          name="text"
          id="exampleText"
          placeholder="Descritpion"
        />
      </FormGroup>
      <FormGroup>
        <ChooseExercise
          setAddedExercises={setAddedExercises}
          addedExercises={addedExercises}
        />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}

export default AddNewTemplate;
