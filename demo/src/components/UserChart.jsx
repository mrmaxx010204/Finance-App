import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import axios from "axios";

const UserChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch user chart data from the backend
    axios.get("/dashboard").then((response) => {
      setChartData(response.data.user_chart_data);
    });
  }, []);

  return (
    <div style={{ height: "400px" }}>
      <ResponsiveLine
        data={[
          {
            id: "Number of Loans",
            data: chartData,
          },
        ]}
        theme={{
          fontFamily: "Poppins, sans-serif",
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
        margin={{ top: 50, right: 150, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Month",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Number of Loans",
          legendOffset: -40,
          legendPosition: "middle",
          tickValues: 5,
          tickFormat: (value) => Math.round(value),
        }}
        // colors={{ scheme: "nivo" }}
        colors={{ scheme: "category10" }}
        pointSize={10}
        grid={null}
        enableGridX={false}
        enableGridY={false}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default UserChart;
