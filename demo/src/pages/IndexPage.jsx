import React from "react";
import { useEffect, useState } from "react";
import PieChart from "../components/PieChart";
import axios from "axios";
import "../css/dashboard.css";
import LineChart from "../components/LineChart";
import { Box } from "@mui/material";
import UserChart from "../components/UserChart";
import Heading from "../components/heading";

const IndexPage = () => {
  const [chartsData, setChartsData] = useState({
    pie_chart_data: [],
    line_chart_data: [],
  });
  useEffect(() => {
    // Fetch chart data from the backend
    axios.get("/dashboard").then((response) => {
      setChartsData({
        pie_chart_data: [
          {
            id: "Investment",
            label: "Investment",
            value: response.data.pie_chart_data.total_amount,
          },
          {
            id: "Return",
            label: "Return",
            value: response.data.pie_chart_data.total_return,
          },
          {
            id: "Expenses",
            label: "Expenses",
            value: response.data.pie_chart_data.total_expenses,
          },
        ],
        line_chart_data: response.data.line_chart_data,
      });
    });
  }, []);
  return (

    <div>
      <div className="flex items-center justify-center mt-20 pt-10 pb-4"><Heading title={"Loan Portfolio Overview"}/></div>
      <Box className="frontPage border rounded-lg shadow-md">
      <div className="grid">
        <div> 
          <h4 className="firstHeading text-2xl">Total loan disbursed in month or year</h4>
          <div className="m-8 p-8 border-2 border-black">
            <LineChart />
          </div>
        </div>

        <div>
        <h4 className="firstHeading text-2xl">Investment vs Return vs Expenses</h4>
          <div className="m-8 p-8 border-2 border-black">
            {chartsData.pie_chart_data && (
              <PieChart data={chartsData.pie_chart_data} />
            )}
          </div>
        </div>
        <div>
        <h4 className="firstHeading text-2xl">Loan issued per month</h4>
          <div className="m-8 p-8 border-2 border-black">
            <UserChart />
          </div>
        </div>
      </div>
    </Box>
    </div>
    
  );
};

export default IndexPage;


