import React from "react";
import { ChangeEvent, FormEvent } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { deliveryDetails } from "./../Model";

interface CalculatorProps {
  orderDetails: deliveryDetails; //  object that contains the details of the order
  errorMessage: string; // error message to be displayed if the form inputs are invalid
  setOrderDetails: React.Dispatch<React.SetStateAction<deliveryDetails>>; // callback function to update the order details
  handleCalculateClick: (e: FormEvent<HTMLFormElement>) => void; // callback function to handle the calculate button click event
  clearOrderDetails: () => void; // callback function to clear the form inputs
}

const Calculator: React.FC<CalculatorProps> = ({
  orderDetails,
  errorMessage,
  setOrderDetails,
  handleCalculateClick,
  clearOrderDetails,
}) => {
  return (
    <Paper elevation={4} sx={{ maxWidth: "500px", minHeight: "500px", m: 2 }}>
      <form autoComplete="off" onSubmit={(e) => handleCalculateClick(e)}>
        <Typography variant="h6" sx={{ color: "rgb(0, 157, 224, 1)" }}>
          Calculate Delivery Fee{" "}
        </Typography>

        <TextField
          placeholder=" € "
          type="number"
          name="cartValue"
          label="Cart Value"
          variant="outlined"
          fullWidth
          value={orderDetails.cartValue === 0 ? "" : orderDetails.cartValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setOrderDetails({ ...orderDetails, cartValue: +e.target.value })
          }
        />

        <TextField
          placeholder="Max 20000 meter"
          type="number"
          name="deliveryDistance"
          label="Delivery Distance"
          variant="outlined"
          fullWidth
          value={
            orderDetails.deliveryDistance === 0
              ? ""
              : orderDetails.deliveryDistance
          }
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            let val = +e.target.value;
            //Limiting the distance within 20km
            if (val < 20000) {
              setOrderDetails({
                ...orderDetails,
                deliveryDistance: val,
              });
            }
          }}
        />

        <TextField
          type="number"
          name="numberOfItems"
          label="Number of Items"
          variant="outlined"
          fullWidth
          value={
            orderDetails.numberOfItems === 0 ? "" : orderDetails.numberOfItems
          }
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setOrderDetails({ ...orderDetails, numberOfItems: +e.target.value })
          }
        />
        <TextField
          required
          type="date"
          name="OrderTime"
          variant="outlined"
          fullWidth
          value={orderDetails.orderTime}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setOrderDetails({ ...orderDetails, orderTime: e.target.value })
          }
        />

        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{ marginBottom: "10px", backgroundColor: "rgb(0, 157, 224, 1)" }}
          type="submit"
        >
          Calculate Price{" "}
        </Button>

        <Button
          variant="contained"
          size="small"
          fullWidth
          sx={{ marginBottom: "10px", backgroundColor: "rgb(0, 157, 224, 1)" }}
          onClick={clearOrderDetails}
        >
          {" "}
          Clear
        </Button>
      </form>

      {errorMessage && (
        <Typography padding={2} sx={{ color: "red", textAlign: "center" }}>
          {errorMessage}{" "}
        </Typography>
      )}
    </Paper>
  );
};

export default Calculator;
