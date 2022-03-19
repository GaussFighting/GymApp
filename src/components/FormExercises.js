import React from "react";
import { Form, FormGroup, Input } from "reactstrap";

function FormExercises({
  setExercises,
  setFilterName,
  allExercisesForFiltering,
  filterName,
}) {
  const getByName = (value) => {
    const filteredExercises = allExercisesForFiltering.filter((exercise) => {
      // console.log(exercise.nameEn);
      // console.log(value);
      return exercise.nameEn.toLowerCase().includes(value.toLowerCase());
    });
    // console.log(filteredExercises);
    setExercises(filteredExercises);
  };
  return (
    <Form>
      <FormGroup>
        <Input
          className="input"
          type="text"
          placeholder="Search..."
          value={filterName}
          onChange={(event) => {
            setFilterName(event.target.value);
            getByName(event.target.value);
          }}
        ></Input>
      </FormGroup>
    </Form>
  );
}

export default FormExercises;
