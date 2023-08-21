import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import "../css/form.css";
import axios from "axios";

const AddLoansForm = () => {
  const { id } = useParams();
  const [userId, setUserId] = useState("");
  const [issuedDate, setIssuedDate] = useState("");
  const [amount, setAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [interest, setInterest] = useState("");
  const [emi, setEMI] = useState("");
  const [emiStartDate, setEmiStartDate] = useState("");
  const [processingCharge, setProcessingCharge] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setType(e.target.value);
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/loans/" + id).then((response) => {
      const { data } = response;
      setUserId(data.user_id);
      setIssuedDate(data.issuedDate);
      setAmount(data.amount);
      setTenure(data.tenure);
      setInterest(data.interest);
      setEMI(data.emi);
      setEmiStartDate(data.emiStartDate);
      setProcessingCharge(data.processing_charge);
      setType(data.type);
    });
  }, [id]);

  async function SaveLoan(ev) {
    ev.preventDefault();
    const loanData = {
      userId,
      issuedDate,
      amount,
      tenure,
      interest,
      emi,
      emiStartDate,
      processingCharge,
      type,
    };
    try {
      if (id) {
        await axios.put("/loans/" + id, { ...loanData }).then((response) => {
          alert(response.data.message);
          console.log(response);
          navigate("/loans");
        });
      } else {
        await axios.post("/loans/new", loanData).then((response) => {
          navigate("/loans");
          alert(response.data.message);
          console.log(response);
        });
      }
    } catch (e) {
      alert("Error!!!. Please try again later.  " + e.response.data.error);
      console.error(e);
    }
  }

  return (
    <Box m="5.5rem 2.5rem">
      {id ? (
        <h1 className=" pt-8 text-4xl text-center mb-8 uppercase font-bold font-poppins">
          Update Details
        </h1>
      ) : (
        <h1 className=" pt-8 text-4xl text-center mb-8 uppercase font-bold font-poppins">
          Add Loan
        </h1>
      )}

      <form onSubmit={SaveLoan}  className="flex flex-col gap-4 p-6 border rounded-lg shadow-md bg-white">
        <div className="flex items-center">
          <label className="w-1/3 text-gray-500">UserID:</label>
          <input
            type="number"
            placeholder="User ID"
            value={userId}
            onChange={(ev) => setUserId(ev.target.value)}
            className="w-2/3 py-2 px-3 border rounded-2xl"
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-gray-500">Loan Issued Date:</label>
          <input
            type="date"
            value={issuedDate}
            onChange={(ev) => setIssuedDate(ev.target.value)}
            className="w-3/3 py-2 px-3 border rounded-2xl text-gray-400"
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-gray-500">Amount:</label>
          <input
            type="number"
            placeholder={"Amount"}
            value={amount}
            onChange={(ev) => setAmount(ev.target.value)}
            className="w-2/3 py-2 px-3 border rounded-2xl"
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-gray-500">Tenure:</label>
          <input
            type="number"
            placeholder={"Tenure"}
            value={tenure}
            onChange={(ev) => setTenure(ev.target.value)}
            className="w-2/3 py-2 px-3 border rounded-2xl"
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-gray-500">Interest:</label>
          <input
            type="number"
            placeholder={"Rate of Interest"}
            value={interest}
            onChange={(ev) => setInterest(ev.target.value)}
            className="w-2/3 py-2 px-3 border rounded-2xl"
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-gray-500">Emi:</label>
          <input
            type="number"
            placeholder={"Enter EMI amount"}
            value={emi}
            onChange={(ev) => setEMI(ev.target.value)}
            className="w-2/3 py-2 px-3 border rounded-2xl"
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-gray-500">Emi Start Date:</label>
          <input
            type="date"
            value={emiStartDate}
            onChange={(ev) => setEmiStartDate(ev.target.value)}
            className="w-3/3 py-2 px-3 border rounded-2xl text-gray-400"
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-gray-500">Processing Charge:</label>
          <input
            type="number"
            placeholder={"Processing Charge"}
            value={processingCharge}
            onChange={(ev) => setProcessingCharge(ev.target.value)}
            className="w-2/3 py-2 px-3 border rounded-2xl"
          />
        </div>
        
        <div className="flex items-start p-0">
          <label className="w-1/3 text-gray-500">Select Type: </label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mx-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
          </svg>
          <div className="flex items-center">
            <input
              type="radio"
              value="monthly"
              checked={type === "monthly"}
              onChange={handleChange}
              className="mr-1"
            />
            <label className="text-gray-700">Monthly</label>
          </div>
          <div className="flex items-center ml-4">
            <input
              type="radio"
              value="weekly"
              checked={type === "weekly"}
              onChange={handleChange}
              className="mr-1"
            />
            <label className="text-gray-700">Weekly</label>
          </div>
        </div>

        <button className="addClient bg-blue-300 hover:bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md" style={{ marginTop: "10px" }}>
          {id ? "Update" : "Submit"}
        </button>
      </form>
    </Box>
  );
};

export default AddLoansForm;
