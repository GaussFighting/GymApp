import { useEffect, useState } from "react";

const useFetchExercises = () => {
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState([]);
  const [allExercisesForFiltering, setAllExercisesForFiltering] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        const res = await fetch("/.netlify/functions/exerciseRead");
        const resData = await res.json();
        const loadedExercises = [];
        const exercisesArr = resData.data.exercises;
        exercisesArr.forEach((el) => {
          loadedExercises.push({
            id: el._id,
            nameEn: el.nameEn,
            bodyPart: el.bodyPart,
            equipment: el.equipment,
            sets: 1,
          });
        });
        setExercises(loadedExercises);
        setAllExercisesForFiltering(loadedExercises);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchExercises();
  }, []);
  return { loading, exercises, allExercisesForFiltering, setExercises };
};

export default useFetchExercises;
