import { useState, useEffect } from "react";

const useFetchTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [pageCount, setPageCount] = useState(1);

  const handlePageClick = (e) => {
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
  }, [currentPage, limit]);
  return {
    templates,
    loading,
    pageCount,
    limit,
    setLimit,
    currentPage,
    setCurrentPage,
    handlePageClick,
  };
};

export default useFetchTemplates;
