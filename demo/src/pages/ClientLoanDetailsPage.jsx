import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Heading from "../components/heading";
import { useParams } from "react-router-dom";
import PaymentStatBox from "../components/paymentStatBox";
import "../css/datagrid.css";

const ClientLoanDetailsPage = () => {
  const { id, name } = useParams();
  const [loans, setLoans] = useState([]);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0,
  });

  useEffect(() => {
    axios
      .get(`/clients/loans/${id}`)
      .then((response) => {
        setLoans(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const columns = [
    {
      field: "loan_id",
      headerName: "Loan ID",
      flex: 0.4,
    },
    {
      field: "issued_date",
      headerName: "Issued Date(YYYY-MM-DD)",
      flex: 0.6,
    },
    {
      field: "amount",
      headerName: " Loan Amount (Rs)",
      flex: 0.5,
      renderCell: (params) => `${Number(params.value).toFixed(2)}`,
    },
    {
      field: "tenure",
      headerName: "Tenure",
      flex: 0.4,
    },
    {
      field: "total",
      headerName: "Total Amount(Rs)",
      flex: 0.6,
      renderCell: (params) => `${Number(params.value).toFixed(2)}`,
    },
    {
      field: "emi",
      headerName: "EMI (Rs)",
      flex: 0.4,
      renderCell: (params) => `${Number(params.value).toFixed(2)}`,
    },
    {
      field: "balance",
      headerName: "Balance (RS)",
      flex: 0.5,
      renderCell: (params) => `${Number(params.value).toFixed(2)}`,
    },
    {
      field: "no_of_emi_left",
      headerName: "EMI Reamining",
      flex: 0.4,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 0.3,
    },
  ];

  return (
    <Box m="0.8rem 2.5rem">
      <Heading title="Client Loans" subtitle="Managing client loan details." />
      <PaymentStatBox userId={id} name={name}/>
      <Box mt="1rem">
        <div className="datagrid-container">
          <DataGrid
            rows={loans}
            getRowId={(row) => row.loan_id}
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

export default ClientLoanDetailsPage;
