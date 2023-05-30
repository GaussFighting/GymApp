import { useState, useEffect, useRef } from "react";

const useFetchTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [pageCount, setPageCount] = useState(0);

  const handlePageClick = (e) => {
    console.log(e);
    setCurrentPage(e.selected + 1);
  };

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/.netlify/functions/templateRead?page=${currentPage}&limit=${limit}`
        );
        const resData = await res.json();
        console.log(resData);

        const loadedTemplates = [];
        setPageCount(resData.data.results.pageCount);
        const templatesArr = resData.data.results.result
          ? resData.data.results.result
          : resData.data.templates;
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
  }, [currentPage]);
  return { templates, loading, pageCount, limit, handlePageClick };
};

export default useFetchTemplates;
