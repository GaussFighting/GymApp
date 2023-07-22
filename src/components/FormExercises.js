import React from "react";
import { Form, FormGroup, Input } from "reactstrap";

const FormExercises = ({
  setExercises,
  filterName,
  setFilterName,
  allExercisesForFiltering,
}) => {
  const getByName = (value) => {
    const filteredExercises = allExercisesForFiltering.filter((exercise) => {
      return exercise.nameEn.toLowerCase().includes(value.toLowerCase());
    });

    setExercises(filteredExercises);
  };
  return (
    <Form>
      <FormGroup>
        <Input
          className="input"
          type="text"
          placeholder="Search exercise"
          value={filterName}
          onChange={(event) => {
            setFilterName(event.target.value);
            getByName(event.target.value);
          }}></Input>
      </FormGroup>
    </Form>
  );
};

export default FormExercises;
