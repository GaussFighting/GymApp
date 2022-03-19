import React from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";

const FormSelector = ({
  uniqueList,
  name,
  filterOption,
  allExercisesForFiltering,
  setExercises,
  setFilterByOption,
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
    <Form>
      <FormGroup>
        <Label for="exampleSelect">SELECT {humanName}</Label>
        <Input
          type="select"
          name="select"
          id="exampleSelect"
          className="selector"
          value={filterOption}
          onChange={(event) => {
            setFilterByOption(event.target.value);
            getByOption(event.target.value);
          }}
        >
          <option>ANY {humanName}</option> {options}
        </Input>
      </FormGroup>
    </Form>
  );
};

export default FormSelector;
