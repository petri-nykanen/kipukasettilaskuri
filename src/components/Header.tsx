import Typography from "@mui/material/Typography";
import React from "react";

const Header = () => {
  return (
    <Typography
      fontWeight={"bold"}
      variant="h3"
      sx={{
        textAlign: "center",
        width: "100%",
        mt: "2%",
        textShadow: "1px 1px 1px black",
        color: "orange"
      }}
    >
      Kipukasettilaskuri
    </Typography>
  );
};

export default Header;
