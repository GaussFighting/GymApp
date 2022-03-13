import React from "react";
import { useParams } from "react-router-dom";
import dummyExercises from "../data/dummyExercises.json";

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
      {exercise.id} {exercise.exerciseEn} {exercise.exercisePl}{" "}
      {exercise.bodyPart} {exercise.equipment}
    </div>
  );
}

export default Exercise;
