import React from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";

const FormSelector = ({
  name,
  uniqueList,
  setExercises,
  setFilterByOption,
  filterOption,
  allExercisesForFiltering,
}) => {
  const humanName = name.replace(/([A-Z])/g, " $1").toUpperCase();
  const options = uniqueList.map((item, idx) => (
    <option key={item + idx}>{item}</option>
  ));
  const getByOption = (value) => {
    const filteredExercisesByValue = allExercisesForFiltering.filter(
      (exercise) => {
        if (value === `ANY ${humanName}`) return true;
        return exercise[name].toUpperCase() === value;
      }
    );
    setExercises(filteredExercisesByValue);
  };

  return (
    <Form className="center-block flex">
      <FormGroup>
        <Label for="exampleSelect ">SELECT {humanName}</Label>
        <Input
          type="select"
          name="select"
          id="exampleSelect"
          value={filterOption}
          onChange={(event) => {
            setFilterByOption(event.target.value);
            getByOption(event.target.value);
          }}>
          <option>ANY {humanName}</option> {options}
        </Input>
      </FormGroup>
    </Form>
  );
};

export default FormSelector;
