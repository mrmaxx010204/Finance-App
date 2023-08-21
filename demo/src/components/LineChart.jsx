import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import axios from "axios";
import Select from "react-select";
import { Box } from "@mui/material";
import FlexBetween from "./FlexBetween";

const LineChart = () => {
  const [data, setData] = useState(null);
  const [chartType, setChartType] = useState("monthly");

  useEffect(() => {
    axios.get("/dashboard").then((response) => {
      setData(response.data.line_chart_data);
    });
  }, []);

  let chartData = [];

  if (data) {
    const monthlyData = data.monthly.map((item) => ({ x: item.x, y: item.y }));
    const yearlyData = data.yearly.map((item) => ({
      x: item.x.toString(),
      y: item.y,
    }));
    chartData = chartType === "monthly" ? monthlyData : yearlyData;
  }

  return (
    <div className="">
      <Box>
        <FlexBetween>
          <div
            className="mt-2 ml-4"
            style={{ textAlign: "center", marginBottom: "1rem" }}
          >
            <Select
              options={[
                { value: "monthly", label: "Monthly" },
                { value: "yearly", label: "Yearly" },
              ]}
              value={{
                value: chartType,
                label: chartType === "monthly" ? "Monthly" : "Yearly",
              }}
              onChange={(selectedOption) => setChartType(selectedOption.value)}
            />
          </div>
        </FlexBetween>
        <div style={{ height: "60vh" }}>
          <ResponsiveLine
            data={[{ id: "chart", data: chartData }]}
            theme={{
              fontFamily: "poppins, sans-serif",
              axis: {
                domain: {
                  line: {
                    stroke: "black",
                  },
                },
                legend: {
                  text: {
                    fill: "black",
                  },
                },
                ticks: {
                  line: {
                    stroke: "black",
                    strokeWidth: 1,
                  },
                  text: {
                    fill: "black",
                  },
                },
              },
              legends: {
                text: {
                  fill: "black",
                },
              },
              tooltip: {
                container: {
                  color: "black",
                },
              },
            }}
            margin={{ top: 30, right: 50, bottom: 50, left: 70 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            curve="monotoneX"
            axisTop={null}
            axisRight={null}
            enableAxes={true}
            axisBottom={{
              orient: "bottom",
              tickSize: 10,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Month",
              legendOffset: 44,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 10,
              tickPadding: 0,
              tickRotation: 0,
              legend: "Amount (in Rs)",
              legendOffset: -58,
              legendPosition: "middle",
            }}
            grid={null}
            enableGridX={false}
            enableGridY={false}
            colors={{ scheme: "category10" }}
            pointSize={8}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
          />
        </div>
      </Box>
    </div>
  );
};

export default LineChart;
