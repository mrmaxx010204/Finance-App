import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Heading from "./heading";
import { Link } from "react-router-dom";
import "../css/datagrid.css"

const PaymentData = () => {
  const [payments, setPayments] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0,
  });

  useEffect(() => {
    axios
      .get("/payments")
      .then((response) => {
        setPayments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(payments);

  const columns = [
    {
      field: "loan_id",
      headerName: "Loan ID",
      flex: 0.3,
      renderCell: (params) => (
        <Link to={`/payments/${params.value}`}>{params.value}</Link>
      ),
    },
    {
      field: "user_id",
      headerName: "User ID",
      flex: 0.3,
      renderCell: (params) => (
        <Link to={`/payments/details/${params.value}/${params.row.loan_id}`}>{params.value}</Link>
      ),
    },
    {
      field: "no_of_emi_paid",
      headerName: "No of Emi's Paid",
      flex: 0.5,
    },
    {
      field: "no_of_emi_left",
      headerName: "No of Emi's Remaining",
      flex: 0.5,
    },
    {
      field: "last_payment_date",
      headerName: "Last Payment Date",
      flex: 0.4,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Heading title="Payment's Data" subtitle="Managing payment details" />
      <Box mt="40px">
        <div className="datagrid-container">
          <DataGrid
            rows={payments}
            getRowId={(row) => row.loan_id}
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

export default PaymentData;
