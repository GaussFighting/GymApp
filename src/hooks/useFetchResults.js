import { useEffect, useState } from "react";

const useFetchResults = (propsObj) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  let urlChecker = `/.netlify/functions/resultRead`;
  if (propsObj.exerciseId)
    urlChecker = `/.netlify/functions/resultRead?exerciseId=${propsObj.exerciseId}`;

  if (propsObj.startDate && propsObj.endDate)
    urlChecker = `/.netlify/functions/resultRead?startDate=${propsObj.startDate}&endDate=${propsObj.endDate}`;

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
        const resultArr = responseData.data.results;
        resultArr.forEach((el) => {
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
      }
    };
    fetchResults();
  }, [urlChecker]);
  return { results, loading, isError };
};

export default useFetchResults;
