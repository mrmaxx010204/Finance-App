import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import "../css/form.css";
import axios from "axios";

const AddClient = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [aadharCard, setAadharCard] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/clients/" + id).then((response) => {
      const { data } = response;
      setName(data.name);
      setPhoneNo(data.phone_number);
      setAadharCard(data.aadhar_card);
      setAddress(data.address);
    });
  }, [id]);

  async function SaveClient(ev) {
    ev.preventDefault();
    const clientData = {
      name,
      phoneNo,
      aadharCard,
      address,
    };
    try {
      if (id) {
        await axios
          .put("/clients/" + id, { ...clientData })
          .then((response) => {
            alert(response.data.message);
            console.log(response);
            navigate("/clients");
          });
      } else {
        await axios.post("/clients/new", clientData).then((response) => {
          navigate("/clients");
          alert(response.data.message);
          console.log(response);
          navigate("/clients");
        });
      }
    } catch (e) {
      alert("Error!!!. Please try again later.  " + e.response.data.error);
      console.error(e);
    }
  }

  return (

    <Box m="10rem 2.5rem">
      <div className="mt-30">
        {id ? (
          <h1 className=" pt-8 text-4xl text-center mb-8 uppercase font-bold font-poppins">
            Update Details
          </h1>
        ) : (
          <h1 className=" pt-8 text-4xl text-center mb-8 uppercase font-bold font-poppins">
            Add Client
          </h1>
        )}
      </div>
      <form onSubmit={SaveClient} className="flex flex-col gap-4 p-6 border rounded-lg shadow-md bg-white">
        
          <div className="flex flex-col gap-4 w-full mb-1">
            <div className="flex items-center">
              <label className="w-1/3 text-gray-500">Name:</label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                className="w-2/3 py-2 px-3 border rounded-2xl"
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/3 text-gray-500">Phone Number:</label>
              <input
                type="text"
                placeholder="Phone number"
                value={phoneNo}
                onChange={(ev) => setPhoneNo(ev.target.value)}
                className="w-2/3 py-2 px-3 border rounded-2xl"
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/3 text-gray-500">Aadhar Card Number:</label>
              <input
                type="number"
                placeholder="Aadhar Card"
                value={aadharCard}
                onChange={(ev) => setAadharCard(ev.target.value)}
                className="w-2/3 py-2 px-3 border rounded-2xl"
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/3 text-gray-500">Address:</label>
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(ev) => setAddress(ev.target.value)}
                className="w-2/3 py-2 px-3 border rounded-2xl"
              />
            </div>
          </div>
        
        
          <button className="addClient bg-blue-300 hover:bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md" style={{ marginTop: "10px" }}>
            {id ? "Update" : "Submit"}
          </button>
        
      </form>
    </Box>
  );
};

export default AddClient;
