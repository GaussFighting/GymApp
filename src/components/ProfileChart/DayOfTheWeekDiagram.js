import React, { useEffect, useState } from "react";
import useFetchResults from "../../hooks/useFetchResults";
import moment from "moment";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DayOfTheWeekDiagram = () => {
  const { loading, results } = useFetchResults({
    countWeights: true,
  });

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const toastId = React.useRef(null);

  useEffect(() => {
    if (loading) {
      toastId.current = toast("Weight Chart in progress", {
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

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const format = "YYYY-MM-DD";

  const bodyWeightArr = results.map((el) => {
    let dataArr = [];
    dataArr = {
      name: moment(el.date).format(format),
      bodyWeight: el.bodyWeight,
    };
    return dataArr;
  });

  const daysOfTheWeekArr = bodyWeightArr.map((el) => {
    let daysArr = [];
    daysArr = moment(el.name).format("dddd");
    return daysArr;
  });

  const dataOfDays = () => {
    let sumOfMondays = 0;
    let sumOfTuesdays = 0;
    let sumOfWednesdays = 0;
    let sumOfThursdays = 0;
    let sumOfFridays = 0;
    let sumOfSaturdays = 0;
    let sumOfSundays = 0;

    for (let i = 0; i < daysOfTheWeekArr.length; i++) {
      if (daysOfTheWeekArr[i] === "Monday") sumOfMondays++;
      if (daysOfTheWeekArr[i] === "Tuesday") sumOfTuesdays++;
      if (daysOfTheWeekArr[i] === "Wednesday") sumOfWednesdays++;
      if (daysOfTheWeekArr[i] === "Thursday") sumOfThursdays++;
      if (daysOfTheWeekArr[i] === "Friday") sumOfFridays++;
      if (daysOfTheWeekArr[i] === "Saturday") sumOfSaturdays++;
      if (daysOfTheWeekArr[i] === "Sunday") sumOfSundays++;
    }

    return [
      { name: "Monday", value: sumOfMondays },
      { name: "Tuesday", value: sumOfTuesdays },
      { name: "Wendesday", value: sumOfWednesdays },
      { name: "Thursday", value: sumOfThursdays },
      { name: "Friday", value: sumOfFridays },
      { name: "Saturday", value: sumOfSaturdays },
      { name: "Sunday", value: sumOfSundays },
    ];
  };

  const data = dataOfDays();

  const COLORS = [
    "#f9aa33",
    "#232f34",
    "#716f6f",
    "#d1d1d1",
    "#070101",
    "#232f34",
    "#716f6f",
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
    fill,
    payload,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const radius1 = innerRadius + (outerRadius - innerRadius) * 1.1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const x1 = cx + radius1 * Math.cos(-midAngle * RADIAN);
    const y1 = cy + radius1 * Math.sin(-midAngle * RADIAN);
    return (
      <>
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
        <text x={x1} y={y1} fill={fill} textAnchor={x > cx ? "start" : "end"}>
          {name} {`\n`} {`(${payload.value})`}
        </text>
      </>
    );
  };

  return (
    <div>
      <h4 className="my-4 ">Days of week distribution</h4>
      <div className="pie-chart pb-4">
        <ResponsiveContainer width="100%" height={600}>
          <PieChart width={600} height={600}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={windowSize[0] > 1300 ? 250 : windowSize[0] / 5}
              fill="#8884d8"
              dataKey="value">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="spacer"></div>
    </div>
  );
};

export default DayOfTheWeekDiagram;
