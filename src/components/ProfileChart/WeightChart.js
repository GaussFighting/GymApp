import React, { useEffect } from "react";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WeightChart = () => {
  const { loading, results } = useFetchResults({
    countWeights: true,
  });

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
      <h4 className="my-4 ">Weight Chart</h4>
      <div className="pb-4">
        <ResponsiveContainer width="100%" height={624}>
          <LineChart
            width={1500}
            height={300}
            data={bodyWeightArr.slice(0, 254)}>
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
              unit=" kg "
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
