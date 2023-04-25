import React from "react";
import ActivityCalendar, { ThemeInput } from "react-activity-calendar";
import useFetchResults from "../../hooks/useFetchResults";
import moment from "moment";

const ActivityCallendar = () => {
  const minimalTheme = {
    light: ["hsl(0, 0%, 92%)", "rebeccapurple"],
    // dark: the default theme will be used as fallback
  };

  const { results } = useFetchResults({
    countDays: true,
  });
  const format = "YYYY-MM-DD";
  let omg = () => {
    if (results.length > 0) {
      let lastYearArr = [];
      for (let i = 0; i < results.length; i++) {
        lastYearArr = [
          ...lastYearArr,
          {
            date: moment(results[i].date).format(format),
            count: 1,
            level: 4,
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
      <h4 className="my-3"> ActivityCallendar</h4>
      <div className="d-flex justify-content-center">
        {omg().length && (
          <ActivityCalendar
            data={omg()}
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
