import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Heading from "./heading";
import { Link } from "react-router-dom";
import "../css/datagrid.css";

const LoanData = () => {
  const [loans, setLoans] = useState([]);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0,
  });

  useEffect(() => {
    axios
      .get("/loans")
      .then((response) => {
        setLoans(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "LoanID",
      flex: 0.4,
      renderCell: (params) => (
        <Link to={`/loans/${params.value}`}>{params.value}</Link>
      ),
    },
    {
      field: "user_id",
      headerName: "UserID",
      flex: 0.4,
    },
    {
      field: "issuedDate",
      headerName: "Issued Date",
      flex: 0.5,
    },
    {
      field: "amount",
      headerName: "Amount (Rs)",
      flex: 0.5,
      renderCell: (params) => `${Number(params.value).toFixed(2)}`,
    },
    {
      field: "tenure",
      headerName: "Tenure",
      flex: 0.3,
    },
    {
      field: "interest",
      headerName: "Interest (%)",
      flex: 0.4,
    },
    {
      field: "emi",
      headerName: "EMI (Rs)",
      flex: 0.4,
      renderCell: (params) => `${Number(params.value).toFixed(2)}`,
    },
    {
      field: "emi_start_date",
      headerName: "Emi Start Date",
      flex: 0.5,
    },
    {
      field: "processing_charge",
      headerName: "Processing Charge (Rs)",
      flex: 0.6,
      renderCell: (params) => `${Number(params.value).toFixed(2)}`,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 0.4,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Heading title="Loans Data" subtitle="Managing loan details." />
      <Box mt="40px">
        <div className="datagrid-container">
          <DataGrid
            rows={loans}
            columns={columns}
            paginationModel={paginationModel}
            pageSizeOptions={[20, 50, 100]}
            onPaginationModelChange={setPaginationModel}
          />
        </div>
      </Box>
    </Box>
  );
};

export default LoanData;
