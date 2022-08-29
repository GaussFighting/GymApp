import React, { PureComponent } from "react";
import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ results, exerciseId }) => {
  const format = "YYYY-MM-DD";

  let firstDate = moment(new Date(results[results.length - 1]?.date));
  let endDate = moment(new Date(results[0]?.date));

  let range = endDate.diff(firstDate, "days");

  console.log(results);

  const dataTotalVolume = () => {
    let arr = [];
    let arrayOfDateAndVolume = results.map((training, index) => {
      let volumeResults = training.templateExercises
        .filter((trainingResults) => {
          return trainingResults.id === exerciseId;
        })
        .map((exercise) => {
          let totalVolume = 0;
          for (let i = 0; i < exercise.addedResults.length; i++) {
            totalVolume +=
              exercise.addedResults[i].setWeight *
              (exercise.addedResults[i].setRepetition
                ? exercise.addedResults[i].setRepetition
                : 0);
          }
          return totalVolume;
        });
      let volumeResultsByMass = volumeResults.map((element) => {
        console.log(element, training.bodyWeight);
        return element / training.bodyWeight;
      });
      console.log(volumeResultsByMass);
      return {
        name: moment(training.date).format(format),
        uv: volumeResults[0],
        pv: volumeResultsByMass[0],
      };
    });
    for (let i = 0; i < range + 2; i++) {
      const abc = moment(firstDate).add(i, "days").format(format);
      arr = [...arr, abc];
    }
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      let findedResult = arrayOfDateAndVolume.find((element) => {
        return element.name === arr[i];
      });
      if (findedResult) {
        result = [...result, findedResult];
      } else {
        result = [...result, { name: arr[i] }];
      }
    }
    console.log(result);
    return result;
  };

  const data = [
    {
      name: 1,
      uv: 4000,
      pv: 2400,
      rv: 2300,
      amt: 2400,
    },
    {
      name: 2,
      uv: 3000,
      pv: 1398,
      rv: 4600,
      amt: 2210,
    },
    {
      name: 3,
      uv: 2000,
      pv: 9800,
      rv: 2300,
      amt: 2290,
    },
    {
      name: 4,
      uv: 2780,
      pv: 3908,
      rv: 3900,
      amt: 2000,
    },
    {
      name: 5,
      uv: 1890,
      pv: 4800,
      rv: 1350,
      amt: 2181,
    },
    {
      name: 9,
      uv: 2390,

      rv: 11000,
      amt: 2500,
    },
    {
      name: 10,
      uv: 3490,

      rv: 5000,
      amt: 2100,
    },
    {
      name: 15,
      uv: 3490,
      pv: 4300,
      rv: 5000,
      amt: 2100,
    },
  ];
  return (
    <div>
      Chart
      {console.log(dataTotalVolume())}
      {/* <ResponsiveContainer width="100%" height="100%"> */}
      <LineChart width={1500} height={300} data={dataTotalVolume()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          padding={{ left: 30, right: 30 }}
          reverse={true}
          angle={-45}
        />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          connectNulls={true}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="pv"
          stroke="#82ca9d"
          connectNulls={true}
        />
        <Line type="monotone" dataKey="rv" stroke="#ca8284" />
      </LineChart>
      {/* </ResponsiveContainer> */}
      <div className="spacer"></div>
    </div>
  );
};

export default Chart;
