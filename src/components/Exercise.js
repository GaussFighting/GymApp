import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

function Exercise() {
  let { id } = useParams();
  const [exercise, setExercise] = useState({});

  useEffect(() => {
    const fetchExercise = async () => {
      const response = await fetch(`http://localhost:5000/exercise/${id}`);

      const responseData = await response.json();

      setExercise({
        id: responseData._id,
        nameEn: responseData.nameEn,
        bodyPart: responseData.bodyPart,
        equipment: responseData.equipment,
      });
    };
    fetchExercise();
  }, [id]);

  const navigate = useNavigate();

  async function deleteRecord(id) {
    console.log(id);
    try {
      await fetch(`http://localhost:5000/exercise/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  }
  return (
    <div>
      {exercise.nameEn}

      <Button onClick={() => deleteRecord(id)}>Delete</Button>
    </div>
  );
}

export default Exercise;
