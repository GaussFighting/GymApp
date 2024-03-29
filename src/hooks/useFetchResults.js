import { useEffect, useState } from "react";

const useFetchResults = (propsObj) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [noDataText, setNoDataText] = useState();

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };

  let urlChecker = `/.netlify/functions/resultRead?page=${currentPage}&limit=${limit}`;

  if (propsObj.exerciseId)
    urlChecker = `/.netlify/functions/resultRead?exerciseId=${propsObj.exerciseId}`;
  if (propsObj.startDate && propsObj.endDate)
    urlChecker = `/.netlify/functions/resultRead?startDate=${propsObj.startDate}&endDate=${propsObj.endDate}`;

  if (propsObj.countTrainings)
    urlChecker = `/.netlify/functions/resultRead?countTrainings=${propsObj.countTrainings}`;
  if (propsObj.countTrainingsPerYears)
    urlChecker = `/.netlify/functions/resultRead?countTrainingsPerYears=${propsObj.countTrainingsPerYears}`;
  if (propsObj.countWeights)
    urlChecker = `/.netlify/functions/resultRead?countWeights=${propsObj.countWeights}`;
  if (propsObj.countDays)
    urlChecker = `/.netlify/functions/resultRead?countDays=${propsObj.countDays}`;
  useEffect(() => {
    const fetchResults = async () => {
      let res = "";
      try {
        setLoading(true);
        res = await fetch(urlChecker);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setIsError("server error");
        console.log(error);
      }
      if (!(200 <= res.status && res.status < 300)) {
        setIsError("error - status is not 2XX");
        console.log("error", res);
      } else {
        const responseData = await res.json();

        const loadedResults = [];
        setPageCount(responseData.data.resultsOfTrainings.pageCount);

        const resultArr = responseData.data.resultsOfTrainings.result
          ? responseData.data.resultsOfTrainings.result
          : responseData.data.res.results;

        resultArr.forEach((el) => {
          if (
            el._id &&
            !el.bodyWeight &&
            el.date &&
            !el.templateName &&
            !el.description &&
            el.templateExercises
          ) {
            loadedResults.push({
              id: el._id,
              date: el.date,
              templateExercises: el.templateExercises,
            });
          }
          if (
            el._id &&
            el.bodyWeight &&
            el.date &&
            !el.templateName &&
            !el.description &&
            !el.templateExercises
          ) {
            loadedResults.push({
              id: el._id,
              bodyWeight: el.bodyWeight,
              date: el.date,
            });
          }
          if (
            el._id &&
            el.bodyWeight &&
            el.date &&
            el.templateName &&
            el.description &&
            el.templateExercises
          )
            loadedResults.push({
              id: el._id,
              templateName: el.templateName,
              descritpion: el.description,
              bodyWeight: el.bodyWeight,
              date: el.date,
              templateExercises: el.templateExercises,
            });
        });
        setResults(loadedResults);
        setCount(responseData.data.res.count);
        if (loadedResults.length === 0) {
          setNoDataText(
            "WE ARE SORRY THERE IS NO RECORDS IN DATABASE FOR THIS EXERCISE :("
          );
        }
      }
    };
    fetchResults();
  }, [urlChecker, currentPage, limit]);

  return {
    results,
    loading,
    isError,
    count,
    pageCount,
    limit,
    setLimit,
    currentPage,
    setCurrentPage,
    handlePageClick,
    noDataText,
  };
};

export default useFetchResults;
