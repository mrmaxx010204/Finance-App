import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import axios from "axios";
import "../css/form.css";

const AddPayment = () => {
  const { id } = useParams();
  const [loanId, setLoanId] = useState("");
  const [userId, setUserId] = useState("");
  const [noOfEmiPaid, setNoOfEmiPaid] = useState("");
  const [noOfEmiLeft, setNoOfEmiLeft] = useState("");
  const [lastPaymentDate, setLastPaymentDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/payments/" + id).then((response) => {
      const { data } = response;
      setLoanId(data.loan_id);
      setUserId(data.user_id);
      setNoOfEmiPaid(data.no_of_emi_paid);
      setNoOfEmiLeft(data.no_of_emi_remaining);
      setLastPaymentDate(data.last_payment_date);
    });
  }, [id]);

  async function SavePaymentsInfo(ev) {
    ev.preventDefault();
    const paymentData = {
      loanId,
      userId,
      noOfEmiPaid,
      noOfEmiLeft,
      lastPaymentDate,
    };
    try {
      if (id) {
        await axios
          .put("/payments/" + id, { ...paymentData })
          .then((response) => {
            alert(response.data.message);
            console.log(response);
            navigate("/payments");
          });
      } else {
        await axios.post("/payments/new", paymentData).then((response) => {
          navigate("/payments");
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
    <Box m="9rem 2.5rem">
      <div className="mt-20">
        {id ? (
          <h1 className=" pt-6 text-4xl text-center mb-8 uppercase font-bold font-poppins">
            Update Details
          </h1>
        ) : (
          <h1 className=" pt-8 text-4xl text-center mb-8 uppercase font-bold font-poppins">
            Add Payment Details
          </h1>
        )}
      </div>
      <form onSubmit={SavePaymentsInfo} className="flex flex-col gap-4 p-6 border rounded-lg shadow-md bg-white">
        <div className="flex items-center">
          <label className="w-1/3 text-gray-500">LoanID:</label>
          <input
            type="number"
            placeholder="Loan ID"
            value={loanId}
            onChange={(ev) => setLoanId(ev.target.value)}
            className="w-2/3 py-2 px-3 border rounded-2xl"
          />
        </div>
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
          <label className="w-1/3 text-gray-500">Number of EMI's Paid:</label>
          <input
            type="number"
            placeholder="No of Emi's Paid"
            value={noOfEmiPaid}
            onChange={(ev) => setNoOfEmiPaid(ev.target.value)}
            className="w-2/3 py-2 px-3 border rounded-2xl"
          />
        </div>
        <div className="flex items-start">
          <label className="w-1/3 text-gray-500">Last Payment Date:</label>
          <input
            type="date"
            value={lastPaymentDate}
            onChange={(ev) => setLastPaymentDate(ev.target.value)}
            className="w-3/3 py-2 px-3 border rounded-2xl text-gray-400"
          />
        </div>
        <button className="addPayment bg-blue-300 hover:bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md" style={{ marginTop: "10px" }}>
          {id ? "Update" : "Submit"}
        </button>
      </form>

    </Box>
  );
};

export default AddPayment;
