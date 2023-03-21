import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const useFetchTempalte = () => {
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState({});
  const [formTemplate, setFormTemplate] = useState({
    templateName: "",
    description: "",
    templateExercises: [],
  });

  const navigate = useNavigate();
  const id = useParams().id.toString();

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/.netlify/functions/templateRead?id=${id}`);
        if (!res.ok) {
          const message = `An error has occurred: ${res.statusText}`;
          window.alert(message);
          return;
        }
        const resData = await res.json();
        const templateObj = resData.data.templates[0];
        if (!resData) {
          window.alert(`Record with id ${id} not found`);
          navigate("/");
          return;
        }
        setTemplate({
          id: templateObj._id,
          templateName: templateObj.templateName,
          description: templateObj.description,
          templateExercises: templateObj.templateExercises,
        });
        setFormTemplate(resData.data.templates[0]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchTemplate();
  }, [id, navigate]);

  return { id, loading, template, formTemplate, setFormTemplate };
};

export default useFetchTempalte;
