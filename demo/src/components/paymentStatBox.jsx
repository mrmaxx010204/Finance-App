import React from "react";
import { Box, Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";

const PaymentStatBox = ({ userId, loanId, name, emi, balance }) => {
  return (
    <Box
      mt="1rem"
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      p="0.55rem 1rem"
      flex="1 1 100%"
      borderRadius="0.55rem" 
      className=" text-gray-800 shadow-md"
    >
      {userId ? (
        <FlexBetween>
          <Typography className="">
            User ID :{" "}
            <span className="p-2 text-md underline decoration-auto font-bold">
              {userId}
            </span>
          </Typography>
        </FlexBetween>
      ) : (
        ""
      )}

      {loanId ? (
        <FlexBetween gap="1rem" className="">
          <Typography>
            Loan Id:{" "}
            <span className="p-2 text-md underline decoration-auto font-bold">
              {loanId}
            </span>
          </Typography>
        </FlexBetween>
      ) : (
        ""
      )}

      {name ? (
        <FlexBetween gap="1rem" className="">
          <Typography >
            Name:{" "}
            <span className="p-2 text-md underline decoration-auto font-bold uppercase pr-2">
              {name}
            </span>
          </Typography>
        </FlexBetween>
      ) : (
        ""
      )}

      {emi ? (
        <FlexBetween gap="1rem" className="">
          <Typography>
            Emi: Rs
            <span className="px-1 text-md decoration-auto font-bold pr-2">
              {Number(emi).toFixed(2)}
            </span>
          </Typography>
        </FlexBetween>
      ) : (
        ""
      )}

      {balance ? (
        <FlexBetween gap="1rem" className="">
          <Typography>
            Balance Amount: Rs
            <span className="px-1 text-md decoration-auto font-bold pr-2">
              {Number(balance).toFixed(2)}
            </span>
          </Typography>
        </FlexBetween>
      ) : (
        ""
      )}
    </Box>
  );
};

export default PaymentStatBox;
