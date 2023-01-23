import React, { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";

// this is interface
interface woltOrder {
  cartValue: number;
  deliveryDistance: number;
  numberOfItems: number;
}

const Calculator: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [order, setOrder] = useState<woltOrder>({
    cartValue: 0,
    deliveryDistance: 0,
    numberOfItems: 0,
  });

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    const selectedDateObject = new Date(e.target.value);
    const currentDate = new Date();
    if (selectedDateObject < currentDate) {
      setError("Selected date should be greater than or equal to today's date");
    } else {
      setError("");
    }
  };

  // clear
  const clearHandeler = () => {
    setOrder({
      cartValue: 0,
      deliveryDistance: 0,
      numberOfItems: 0,
    });
    setError("");
    setSelectedDate("");
  };

  // input validator function

  const validate = (order: woltOrder) => {
    if (!order.cartValue) {
      return "Invalid cart Value";
    }
    if (!order.deliveryDistance) {
      return "Invalid distance";
    }
    if (!order.numberOfItems) {
      return "Invalid number of Items";
    }
    return "";
  };

  // calculatin the deliverey price

  const handleCalculateClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error1: string = validate(order);

    console.log(error.length);

    if (error1 || error) {
      setError(error);
      return;
    } else {
      setError("");
      clearHandeler();

      console.log(order);
    }
  };

  // render function

  return (
    <Paper sx={{ maxWidth: "500px" }}>
      <form autoComplete="off" onSubmit={handleCalculateClick}>
        <Typography variant="h6">Calculate the delivery fee </Typography>
        <div>
          <TextField
            placeholder=" € "
            type="number"
            name="cartValue"
            label="Cart Value"
            variant="outlined"
            fullWidth
            value={order.cartValue === 0 ? "" : order.cartValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setOrder({ ...order, cartValue: +e.target.value })
            }
          />
        </div>

        <TextField
          placeholder="Meter"
          type="number"
          name="deliveryDistance"
          label="Delivery Distance"
          variant="outlined"
          fullWidth
          value={order.deliveryDistance === 0 ? "" : order.deliveryDistance}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setOrder({ ...order, deliveryDistance: +e.target.value })
          }
        />
        <TextField
          type="number"
          name="numberOfItems"
          label="Number of Items"
          variant="outlined"
          fullWidth
          value={order.numberOfItems === 0 ? "" : order.numberOfItems}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setOrder({ ...order, numberOfItems: +e.target.value })
          }
        />
        <TextField
          required
          type="date"
          name="OrderTime"
          variant="outlined"
          fullWidth
          onChange={handleDateChange}
          value={selectedDate}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{ marginBottom: "10px" }}
          type="submit"
        >
          Calculate Delipery Price{" "}
        </Button>

        <Button
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
          sx={{ marginBottom: "10px" }}
          onClick={clearHandeler}
        >
          {" "}
          Clear
        </Button>
      </form>
      {error && (
        <Typography padding={2} sx={{ color: "red", textAlign: "center" }}>
          {error}{" "}
        </Typography>
      )}
    </Paper>
  );
};

export default Calculator;
