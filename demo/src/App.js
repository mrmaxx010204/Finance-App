import "./App.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import IndexPage from "./pages/IndexPage";
import ClientsPage from "./pages/ClientsPage";
import LoansPage from "./pages/LoansPage";
import PaymentInfoPage from "./pages/PaymentPage";
import ExpensesPage from "./pages/ExpensesPage";
import AddClient from "./components/addClientForm";
import AddLoansForm from "./components/addLoansForm";
import AddPayment from "./components/addPaymentForm";
import PaymentDetailsPage from "./pages/PaymentDetailsPage";
import ClientLoanDetailsPage from "./pages/ClientLoanDetailsPage";
import AddExpenses from "./components/addExpensesForm";

axios.defaults.baseURL = "http://127.0.0.1:5000/";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/clients/new" element={<AddClient />} />
        <Route path="/clients/:id" element={<AddClient />} />
        <Route
          path="/clients/loans/:id/:name"
          element={<ClientLoanDetailsPage />}
        />
        <Route path="/loans" element={<LoansPage />} />
        <Route path="/loans/new" element={<AddLoansForm />} />
        <Route path="/loans/:id" element={<AddLoansForm />} />
        <Route path="/payments" element={<PaymentInfoPage />} />
        <Route path="/payments/new" element={<AddPayment />} />
        <Route path="/payments/:id" element={<AddPayment />} />
        <Route
          path="/payments/details/:user_id/:loan_id"
          element={<PaymentDetailsPage />}
        />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/expenses/new" element={<AddExpenses />} />
        <Route path="/expenses/:id" element={<AddExpenses />} />
      </Route>
    </Routes>
  );
}

export default App;
