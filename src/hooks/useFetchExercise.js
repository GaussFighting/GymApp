import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const useFetchExercise = ({ exerciseName, bodyPart, equipment }) => {
  const [exercise, setExercise] = useState({});
  const [form, setForm] = useState({
    nameEn: exerciseName,
    bodyPart: bodyPart?.toUpperCase(),
    equipment: equipment,
  });
  const navigate = useNavigate();
  const id = useParams().id.toString();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/.netlify/functions/exerciseRead?id=${id}`);

        if (!res.ok) {
          const message = `An error has occurred: ${res.statusText}`;
          window.alert(message);
          return;
        }

        const record = await res.json();
        const execiseRead = await record.data.exercises[0];

        if (!record) {
          window.alert(`Record with id ${id} not found`);
          navigate("/");
          return;
        }
        setExercise({
          id: execiseRead._id,
          nameEn: execiseRead.nameEn,
          bodyPart: execiseRead.bodyPart,
          equipment: execiseRead.equipment,
        });

        setForm(execiseRead);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, navigate]);

  return { form, setForm, exercise, setExercise, navigate, id };
};

export default useFetchExercise;
