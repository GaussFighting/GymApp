import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

const useFetchResult = ({
  bodyWeight,
  date,
  description,
  templateName,
  templateExercises,
}) => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [formResult, setFormResult] = useState({
    bodyWeight: bodyWeight,
    date: date,
    templateName: templateName,
    description: description,
    templateExercises: templateExercises,
  });

  const navigate = useNavigate();
  const id = useParams().id.toString();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/.netlify/functions/resultRead?id=${id}`);
        const resData = await res.json();
        const resultObj = resData.data.results[0];
        setResults({
          id: resultObj._id,
          templateName: resultObj.templateName,
          description: resultObj.description,
          templateExercises: resultObj.templateExercises,
          bodyWeight: resultObj.bodyWeight,
          date: resultObj.date,
        });
        setLoading(false);
        if (!res.ok) {
          const message = `An error has occurred: ${res.statusText}`;
          window.alert(message);
          return;
        }
        const record = await res.json();
        if (!record) {
          window.alert(`Record with id ${id} not found`);
          navigate("/");
          return;
        }
        setFormResult(record.data.results[0]);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchResult();
  }, [id, navigate]);
  return {
    id,
    formResult,
    setFormResult,
    setLoading,
    loading,
    results,
    setResults,
  };
};

export default useFetchResult;
