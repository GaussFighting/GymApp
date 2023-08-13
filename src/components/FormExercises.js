import React from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";

const FormExercises = ({
  setExercises,
  filterName,
  setFilterName,
  allExercisesForFiltering,
  loading,
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
        <Label for="exampleSelect" className="text-uppercase">
          Exercise Name
        </Label>
        <Input
          className="input"
          type="text"
          placeholder="Search exercise"
          disabled={loading}
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
