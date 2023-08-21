import React from "react";
import { Link } from "react-router-dom";
import LoanData from "../components/loansData";
import '../css/pagesLayout.css';

export default function LoansPage() {
  return (
    <div className="pagesLayout">
      <div>
        <LoanData />
      </div>
      <div className="text-center pb-3">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/loans/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Add Loans
        </Link>
      </div>
    </div>
  );
}
