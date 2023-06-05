import React, { useEffect } from "react";
import ActivityCalendar from "react-activity-calendar";
import useFetchResults from "../../hooks/useFetchResults";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActivityCallendar = () => {
  const { loading, results } = useFetchResults({
    countDays: true,
  });

  const toastId = React.useRef(null);

  useEffect(() => {
    if (loading) {
      toastId.current = toast("Activity Callendar in progress", {
        position: "top-center",
        // autoClose: 1000,
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

  const format = "YYYY-MM-DD";
  let data = () => {
    if (results.length > 0) {
      let lastYearArr = [];
      for (let i = 0; i < results.length; i++) {
        lastYearArr = [
          ...lastYearArr,
          {
            date: moment(results[i].date).format(format),
            count: 1,
            level: results[i].templateExercises.length - 3,
          },
        ];
      }
      return lastYearArr;
    } else {
      return [];
    }
  };

  const explicitTheme = {
    light: ["#f0f0f0", "#c4edde", "#7ac7c4", "#f73859", "#384259"],
    dark: ["hsl(0, 0%, 22%)", "#4D455D", "#7DB9B6", "#F5E9CF", "#E96479"],
  };
  const labels = {
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    totalCount: "{{count}} activities in the last year",
    legend: {
      less: "Less",
      more: "More",
    },
  };
  return (
    <div>
      <h4 className="my-3"> Activity Callendar</h4>
      <div className="d-flex justify-content-center">
        {data().length && (
          <ActivityCalendar
            data={data()}
            blockMargin={10}
            blockSize={14}
            showWeekdayLabels={true}
            weekStart={1}
            fontSize={18}
            colorScheme={true}
            theme={explicitTheme}
            labels={labels}
          />
        )}
        <div className="spacer"></div>
      </div>
    </div>
  );
};

export default ActivityCallendar;
