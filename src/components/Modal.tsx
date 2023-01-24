import { Paper, Typography, Grow, Button } from "@mui/material";
import React from "react";

interface PropsdeliveryCost {
  deliveryCost: number;
}

const Modal: React.FC<PropsdeliveryCost> = ({ deliveryCost }) => {
  console.log(deliveryCost);
  return (
    <Grow in>
      <Paper
        elevation={4}
        sx={{
          height: "100px",
          maxWidth: "500px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          m: 2,
        }}
      >
        <Typography sx={{ padding: "10px", fontWeight: 600 }}>
          Deleivery Cost:{" "}
          <span style={{ color: "rgb(0, 157, 224, 1)" }}>
            {deliveryCost === 0 ? "" : `${deliveryCost} €`}
          </span>
        </Typography>
      </Paper>
    </Grow>
  );
};

export default Modal;
