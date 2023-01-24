import React from "react";
import woltImage from "./../assets/woltdeliverd.png";

import { AppBar, Box, Typography } from "@mui/material";

const Appbar: React.FC = () => {
  return (
    <AppBar
      position="static"
      color="inherit"
      sx={{
        borderRadius: 10,
        margin: "30px 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <Typography
        variant="h3"
        align="center"
        sx={{ color: "rgb(0, 157, 224, 1)", padding: "10px" }}
      >
        How much it costs ?
      </Typography>
      <Box sx={{ marginLeft: "15px" }}>
        <img src={woltImage} alt="icon" height="80" />
      </Box>
    </AppBar>
  );
};

export default Appbar;
