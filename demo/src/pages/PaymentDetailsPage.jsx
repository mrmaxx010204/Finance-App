import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Heading from "../components/heading";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import PaymentStatBox from "../components/paymentStatBox";

const PaymentDetailsPage = () => {
  const { user_id, loan_id } = useParams();
  const [paymentInfo, setPaymentInfo] = useState([]);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  useEffect(() => {
    axios
      .get(`/payments/details/${user_id}/${loan_id}`)
      .then((response) => {
        setPaymentInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user_id, loan_id]);

  const emiDates = paymentInfo.emi_dates;
  const [rows, setRows] = useState(emiDates)


  const handleStatusChange = (date) => {
    // Find the row by date and update the status
    const updatedRows = emiDates.map(row => {
      if (row.date === date) {
        return { ...row, status: 'paid' };
      }
      return row;
    });

  
    //Find the updated item before sending the PUT request
    const updatedItem = updatedRows.find(row => row.date === date);
    if (updatedItem) {
      axios.put(`/update_status/${loan_id}/${user_id}/${updatedItem.date}`, { status: 'paid' })
        .then(response => {
          console.log('Status updated successfully:', response.data);
          setRows(updatedRows);
        })
        .catch(error => {
          console.error('Error updating status:', error);
        });
    } else {
      console.error('Error: Updated item not found.');
    }
  };

  const columns = [
    {
      field: "date",
      headerName: "EMI Date (YYYY-MM-DD)",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: 'edit',
      headerName: 'Change Status',
      flex: 0.6,
      renderCell: (params) => (
        <button className="p-1 m-2 px-5 decoration-inherit rounded-xl" onClick={() => handleStatusChange(params.row.date)}>Change</button>
      ),
    },
  ];

  return (
    <Box m="0.8rem 2.5rem">
      <Heading
        title="EMI Details"
        subtitle="Managing EMI's and Payment details."
      />
      <PaymentStatBox
        userId={user_id}
        loanId={loan_id}
        name={paymentInfo.client_name}
        emi={paymentInfo.emi}
        balance={paymentInfo.balance_amount}
      />
      <Box mt="1rem">
        <div className="datagrid-container">
          <DataGrid
            rows={emiDates ? emiDates : ""}
            getRowId={(row) => row.date}
            columns={columns}
            checkboxSelection={false}
            pageSizeOptions={[10, 20, 50]}
            pagination
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </div>
      </Box>
    </Box>
  );
};

export default PaymentDetailsPage;
