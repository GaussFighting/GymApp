import React from "react";
import { useParams } from "react-router-dom";
import dummyExercises from "../data/exercises.json";

function Exercise() {
  let { id } = useParams();
  const exercise = dummyExercises.find((ex, idx) => {
    console.log(ex.id, id);
    if (ex.id === id) {
      return true;
    } else {
      return false;
    }
  });
  console.log(exercise);
  return (
    <div>
      {exercise.id} {exercise.nameEn} {exercise.namePl} {exercise.bodyPart}{" "}
      {exercise.equipment}
    </div>
  );
}

export default Exercise;
