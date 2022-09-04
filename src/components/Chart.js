import React, { PureComponent, useState, useEffect } from "react";
import moment, { max } from "moment";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
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
  const [disabledVolumeLine, setDisabledVolumeLine] = useState(false);
  const [disabledWeightLine, setDisabledWeightLine] = useState(false);
  const [disabledVolumePerWeight, setDisabledVolumePerWeight] = useState(false);
  const [disabledSetVolumeLine, setDisabledSetVolumeLine] = useState(false);
  const [disabledSetWeightLine, setDisabledSetWeightLine] = useState(false);
  const [disabledSetVolumePerWeight, setDisabledSetVolumePerWeight] =
    useState(false);

  const format = "YYYY-MM-DD";

  let firstDate = moment(new Date(results[results.length - 1]?.date));
  let endDate = moment(new Date(results[0]?.date));

  let range = endDate.diff(firstDate, "days");

  let interval = parseInt((range / 8).toFixed(0));

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
      <h5>Volume Chart</h5>
      <Input
        type="checkbox"
        onChange={() => {
          setDisabledVolumeLine(!disabledVolumeLine);
        }}
      ></Input>{" "}
      Hide Volume line
      <Input
        type="checkbox"
        onChange={() => {
          setDisabledWeightLine(!disabledWeightLine);
        }}
      ></Input>{" "}
      Hide Body Weight line
      <Input
        type="checkbox"
        onChange={() => {
          setDisabledVolumePerWeight(!disabledVolumePerWeight);
        }}
      ></Input>{" "}
      Hide Volume per body weight line
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
            interval={interval}
          />
          <YAxis
            yAxisId="left"
            tickCount={8}
            interval="preserveEnd"
            domain={(element) => {
              return [
                Math.round((element[0] * 0.9).toFixed(0) / 100) * 100,
                Math.round((element[1] * 1.1).toFixed(0) / 100) * 100,
              ];
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={(element) => {
              if (disabledVolumePerWeight) {
                return [Math.round((element[0] - 5) / 10) * 10, element[1] + 5];
              } else {
                return [0, Math.round(element[1].toFixed(0) / 10) * 10];
              }
            }}
          />
          <Tooltip />
          <Legend />
          {!disabledVolumeLine && (
            <Line
              index="1"
              yAxisId="left"
              dataKey="volume"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              connectNulls={true}
            />
          )}

          {!disabledVolumePerWeight && (
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="vpm"
              stroke="#82ca9d"
              connectNulls={true}
            />
          )}
          {!disabledWeightLine && (
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="bodyweight"
              stroke="#ca8284"
              connectNulls={true}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
      <h5>Volume Chart</h5>
      <Input
        type="checkbox"
        onChange={() => {
          setDisabledSetVolumeLine(!disabledSetVolumeLine);
        }}
      ></Input>{" "}
      Hide Volume line
      <Input
        type="checkbox"
        onChange={() => {
          setDisabledSetWeightLine(!disabledSetWeightLine);
        }}
      ></Input>{" "}
      Hide Body Weight line
      <Input
        type="checkbox"
        onChange={() => {
          setDisabledSetVolumePerWeight(!disabledSetVolumePerWeight);
        }}
      ></Input>{" "}
      Hide Volume per body weight line
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
            interval={interval}
          />
          <YAxis
            yAxisId="left"
            domain={(element) => {
              return [
                Math.round((element[0] * 0.9).toFixed(0) / 100) * 100,
                Math.round((element[1] * 1.1).toFixed(0) / 100) * 100,
              ];
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={(element) => {
              if (disabledSetVolumePerWeight) {
                return [Math.round((element[0] - 5) / 10) * 10, element[1] + 5];
              } else {
                return [0, Math.round(element[1].toFixed(0) / 10) * 10];
              }
            }}
          />
          <Tooltip />
          <Legend />
          {!disabledSetVolumeLine && (
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="set Volume"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              connectNulls={true}
            />
          )}
          {!disabledSetVolumePerWeight && (
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="setvpm"
              stroke="#82ca9d"
              connectNulls={true}
            />
          )}
          {!disabledSetWeightLine && (
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="bodyweight"
              stroke="#ca8284"
              connectNulls={true}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
      <div className="chart-spacer"></div>
    </div>
  );
};

export default Chart;
