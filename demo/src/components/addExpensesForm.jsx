import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import axios from "axios";
import "../css/form.css";

const AddExpenses = () => {
  const { id } = useParams();
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/expenses/" + id).then((response) => {
      const { data } = response;
      setExpenseName(data.expense_name);
      setExpenseAmount(data.expense_amount);
      setExpenseDate(data.expense_date);
    });
  }, [id]);

  async function SaveExpenses(ev) {
    ev.preventDefault();
    const paymentData = {
      expenseName,
      expenseAmount,
      expenseDate,
    };
    try {
      if (id) {
        await axios
          .put("/expenses/" + id, { ...paymentData })
          .then((response) => {
            alert(response.data.message);
            console.log(response);
            navigate("/expenses");
          });
      } else {
        await axios.post("/expenses/new", paymentData).then((response) => {
          navigate("/expenses");
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
            Add Expense Details
          </h1>
        )}
      </div>
      <form onSubmit={SaveExpenses} className="flex flex-col gap-4 p-6 border rounded-lg shadow-md bg-white">
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 text-xl">Expense Name:</label>
          <input
            type="text"
            placeholder="Name"
            value={expenseName}
            onChange={(ev) => setExpenseName(ev.target.value)}
            className="py-2 px-3 border rounded-2xl"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 text-xl">Expense Amount:</label>
          <input
            type="number"
            placeholder="Amount"
            value={expenseAmount}
            onChange={(ev) => setExpenseAmount(ev.target.value)}
            className="py-2 px-3 border rounded-2xl"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 text-xl">Expense Date:</label>
          <input
            type="date"
            value={expenseDate}
            onChange={(ev) => setExpenseDate(ev.target.value)}
            className="py-2 px-3 border rounded-2xl text-gray-400"
          />
        </div>
        <button className="addExpenses bg-blue-300 hover:bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md" style={{ marginTop: "10px" }}>
          {id ? "Update" : "Submit"}
        </button>
      </form>

    </Box>
  );
};

export default AddExpenses;
