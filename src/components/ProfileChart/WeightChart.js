import React from "react";
import useFetchResults from "../../hooks/useFetchResults";
import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WeightChart = () => {
  const { results } = useFetchResults({
    countWeights: true,
  });

  const format = "YYYY-MM-DD";

  const bodyWeightArr = results.map((el) => {
    let dataArr = [];
    dataArr = {
      name: moment(el.date).format(format),
      bodyWeight: el.bodyWeight,
    };
    return dataArr;
  });

  return (
    <div>
      <h4 className="my-3">WeightChart</h4>
      <div>
        <ResponsiveContainer width="100%" height={624}>
          <LineChart width={1500} height={300} data={bodyWeightArr}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              padding={{ left: 30, right: 30 }}
              reversed={true}
              angle={90}
              tickMargin={50}
              height={100}
              interval={"preserveStartEnd"}
            />
            <YAxis
              yAxisId="left"
              tickCount={8}
              interval="preserveStartEnd"
              domain={(element) => {
                return [
                  75,
                  Math.round((element[1] * 1.1).toFixed(0) / 100) * 100,
                ];
              }}
            />
            <Tooltip />
            <Line
              index="1"
              yAxisId="left"
              dataKey="bodyWeight"
              stroke="#232f34"
              activeDot={{ r: 8 }}
              connectNulls={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="spacer"></div>
    </div>
  );
};

export default WeightChart;
