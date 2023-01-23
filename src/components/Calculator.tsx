import React, { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { textAlign } from "@mui/system";

// this is interface
interface woltOrder {
  cartValue: number;
  deliveryDistance: number;
  numberOfItems: number;
  OrderTime: Date;
}

const Calculator: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [deliveryCost, setDeliveryCost] = useState<number>(0);
  const [order, setOrder] = useState<woltOrder>({
    cartValue: 0,
    deliveryDistance: 0,
    numberOfItems: 0,
    OrderTime: new Date(),
  });

  // setiitng the oreder state from input

  const handelInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setOrder({ ...order, [name]: +value });
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
    const error: string = validate(order);
    console.log(error);
    if (error) {
      setError(error);
      return;
    }
    setError("");
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
            onChange={handelInputChange}
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
          onChange={handelInputChange}
        />
        <TextField
          type="number"
          name="numberOfItems"
          label="Number of Items"
          variant="outlined"
          fullWidth
          value={order.numberOfItems === 0 ? "" : order.numberOfItems}
          onChange={handelInputChange}
        />
        <TextField
          type="date"
          name="OrderTime"
          label="Order Time"
          variant="outlined"
          fullWidth
          value={order.OrderTime}
          onChange={handelInputChange}
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
          // onClick={clearHandeler}
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
