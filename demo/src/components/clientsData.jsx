import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Heading from "./heading";                      
import { Link } from "react-router-dom";
import DataGridCustomToolbar from "./DataGridCustomToolbar"
import "../css/datagrid.css"

const ClientData = () => {
  const [clients, setClients] = useState([]);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0,
  });

  useEffect(() => {
    axios
      .get("/clients")
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(clients);

  const columns = [
    {
      field: "id",
      headerName: "UserID",
      flex: 0.3,
      renderCell: (params) => (
        <Link to={`/clients/${params.value}`}>{params.value}</Link>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => (
        <Link to={`/clients/loans/${params.row.id}/${params.row.name}`}>{params.value}</Link>
      ),
    },
    {
      field: "aadhar_card",
      headerName: "Aadhar Number",
      flex: 0.4,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1.0,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Heading title="Client Data" subtitle="Managing list of clients"/>
      <Box mt="40px">
        <div className="datagrid-container">
        <DataGrid
          rows={clients} 
          columns={columns}
          pageSizeOptions={[20, 80, 100]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
        </div>
      </Box>
    </Box>
  );
};

export default ClientData;
