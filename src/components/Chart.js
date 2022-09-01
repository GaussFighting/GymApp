import React, { PureComponent } from "react";
import moment, { max } from "moment";
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
    let arrOfDates = [];
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
        return (element / training.bodyWeight).toFixed(2);
      });
      let bestSets = training.templateExercises
        .filter((trainingResults) => {
          return trainingResults.id === exerciseId;
        })
        .map((exercise) => {
          let bestSet = [];
          for (let i = 0; i < exercise.addedResults.length; i++) {
            bestSet = [
              ...bestSet,
              exercise.addedResults[i].setWeight *
                (exercise.addedResults[i].setRepetition
                  ? exercise.addedResults[i].setRepetition
                  : 0),
            ];
          }
          return bestSet;
        });
      let bestSetsResultsByMass = bestSets.map((element) => {
        return (Math.max(...element) / training.bodyWeight).toFixed(2);
      });
      console.log(bestSetsResultsByMass);
      return {
        name: moment(training.date).format(format),
        volume: volumeResults[0],
        vpm: volumeResultsByMass[0],
        bodyweight: training.bodyWeight,
        "set Volume": Math.max(...bestSets[0]).toFixed(2),
        setvpm: bestSetsResultsByMass,
      };
    });
    for (let i = 0; i < range + 2; i++) {
      const addedDates = moment(firstDate).add(i, "days").format(format);
      arrOfDates = [...arrOfDates, addedDates];
    }
    let result = [];
    for (let i = 0; i < arrOfDates.length; i++) {
      let findedResult = arrayOfDateAndVolume.find((element) => {
        return element.name === arrOfDates[i];
      });
      if (findedResult) {
        result = [...result, findedResult];
      } else {
        result = [...result, { name: arrOfDates[i] }];
      }
    }
    return result;
  };

  return (
    <div>
      Chart
      <ResponsiveContainer width="100%" height={624}>
        <LineChart width={1500} height={300} data={dataTotalVolume()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            padding={{ left: 30, right: 30 }}
            reverse={true}
            angle={0}
            tickMargin={40}
            height={100}
            interval={30}
          />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="volume"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            connectNulls={true}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="vpm"
            stroke="#82ca9d"
            connectNulls={true}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="bodyweight"
            stroke="#ca8284"
            connectNulls={true}
          />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={624}>
        <LineChart width={1500} height={300} data={dataTotalVolume()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            padding={{ left: 30, right: 30 }}
            reverse={true}
            angle={0}
            tickMargin={40}
            height={100}
            interval={30}
          />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="set Volume"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            connectNulls={true}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="setvpm"
            stroke="#82ca9d"
            connectNulls={true}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="bodyweight"
            stroke="#ca8284"
            connectNulls={true}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="chart-spacer"></div>
    </div>
  );
};

export default Chart;
