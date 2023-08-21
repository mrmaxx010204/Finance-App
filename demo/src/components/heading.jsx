import { Typography, Box } from "@mui/material";
import React from "react";

const Heading = ({ title, subtitle }) => {
  return (
    <Box>
      <Typography
        variant="h3"
        // fontWeight="bold"
        sx={{ fontFamily: 'Poppins, sans-serif', mb: "0.2rem" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" sx={{ fontFamily: 'Poppins, sans-serif' }}>
        {subtitle}
      </Typography>
    </Box>
  );
};


export default Heading;