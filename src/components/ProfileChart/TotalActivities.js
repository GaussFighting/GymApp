import React, { useEffect } from "react";
import useFetchResults from "../../hooks/useFetchResults";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TotalActivities = () => {
  const { loading, count } = useFetchResults({
    countTrainings: true,
  });

  const toastId = React.useRef(null);

  useEffect(() => {
    if (loading) {
      toastId.current = toast("Number of trainings in progress", {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.dismiss(toastId.current);
    }
  }, [loading]);

  return (
    count !== 0 && (
      <div>
        <h5 className="my-3 ">
          Total number of trainings : <b>{count}</b>
        </h5>
        <div className="spacer"></div>
      </div>
    )
  );
};

export default TotalActivities;
