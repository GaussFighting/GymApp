import { useState, useEffect } from "react";

const useFetchTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/.netlify/functions/templateRead`);
        const resData = await res.json();
        const loadedTemplates = [];
        const templatesArr = resData.data.templates;
        templatesArr.forEach((el) => {
          loadedTemplates.push({
            id: el._id,
            templateName: el.templateName,
            descritpion: el.description,
            templateExercises: el.templateExercises,
          });
        });
        setTemplates(loadedTemplates);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchTemplates();
  }, []);
  return { templates, loading };
};

export default useFetchTemplates;
