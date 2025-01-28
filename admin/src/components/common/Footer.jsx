import { Paper, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Paper
      sx={{
        boxShadow: "none !important",
        borderRadius: "12px",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "divider",
        py: "10px",
        mb: "20px",
        textAlign: "center",
      }}
    >
      <Typography> All
        Rights Reserved &copy;
        {new Date().getFullYear()}
      </Typography>
    </Paper>
  );
};

export default Footer;
