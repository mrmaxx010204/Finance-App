import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box } from "@mui/material";

const PieChart = ({ data }) => {
  return (
    <Box className="">
      <div style={{ height: "400px" }}>
        <ResponsivePie
          data={data}
          theme={{
            fontFamily: "Poppins, sans-serif",
            axis: {
              domain: {
                line: {
                  stroke: "black", // Change the stroke color for axis lines
                },
              },
              legend: {
                text: {
                  fill: "black", // Change the fill color for legend text
                },
              },
              ticks: {
                line: {
                  stroke: "black", // Change the stroke color for ticks
                  strokeWidth: 1,
                },
                text: {
                  fill: "black", // Change the fill color for tick labels
                },
              },
            },
            legends: {
              text: {
                fill: "black", // Change the fill color for legend items
              },
            },
            tooltip: {
              container: {
                color: "black", // Change the color for tooltip container
              },
            },
          }}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ scheme: "set2" }}
          radialLabelsSkipAngle={10}
          radialLabelsTextColor="#333333"
          radialLabelsLinkColor={{ from: "color" }}
          sliceLabelsSkipAngle={10}
          sliceLabelsTextColor="#333333"
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              translateY: 56,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </Box>
  );
};

export default PieChart;
