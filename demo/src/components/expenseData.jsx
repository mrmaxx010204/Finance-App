import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Heading from "./heading";
import { Link } from "react-router-dom";
import "../css/datagrid.css"

const ExpenseData = () => {
  const [expenses, setExpenses] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0,
  });

  useEffect(() => {
    axios
      .get("/expenses")
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
      renderCell: (params) => (
        <Link to={`/expenses/${params.value}`}>{params.value}</Link>
      ),
    },
    {
      field: "expense_name",
      headerName: "Title",
      flex: 0.3,
    },
    {
      field: "expense_amount",
      headerName: "Amount",
      flex: 0.5,
      renderCell: (params) => `${Number(params.value).toFixed(2)}`,
    },
    {
      field: "expense_date",
      headerName: "Date (YYYY-MM-DD)",
      flex: 0.4,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Heading title="Expense's Data" subtitle="Managing expense details" />
      <Box mt="40px">
        <div className="datagrid-container">
          <DataGrid
            rows={expenses}
            columns={columns}
            pageSizeOptions={[20, 50, 100]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </div>
      </Box>
    </Box>
  );
};

export default ExpenseData;
