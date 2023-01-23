import React, { useState } from "react";
import { ChangeEvent, SyntheticEvent } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";

// this is interface
interface woltOrder {
  cartValue: number;
  deliveryDistance: number;
  numberOfItems: number;
  OrderTime: Date;
}

const Calculator: React.FC = () => {
  const [deliveryCost, setDeliveryCost] = useState<number>(0);
  const [order, setOrder] = useState<woltOrder>({
    cartValue: 0,
    deliveryDistance: 0,
    numberOfItems: 0,
    OrderTime: new Date(),
  });

  return (
    <Paper>
      <form>
        <Typography variant="h6">Calculate the delivery fee </Typography>
        <TextField
          type="number"
          name="cartValue"
          label="Cart Value"
          variant="outlined"
          fullWidth
          value={order.cartValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setOrder({ ...order, cartValue: e.target.valueAsNumber })
          }
        />

        <TextField
          type="number"
          name="deliveryDistance"
          label="Delivery Distance"
          variant="outlined"
          fullWidth
          value={order.deliveryDistance}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setOrder({ ...order, deliveryDistance: e.target.valueAsNumber })
          }
        />
        <TextField
          type="number"
          name="numberOfItems"
          label="Number of Items"
          variant="outlined"
          fullWidth
          value={order.numberOfItems}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setOrder({ ...order, deliveryDistance: e.target.valueAsNumber })
          }
        />
        <TextField
          type="datetime-local"
          name="OrderTime"
          label="Order Time"
          variant="outlined"
          fullWidth
          value={order.OrderTime}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setOrder({ ...order, OrderTime: e.target.valueAsDate })
          }
        />
      </form>
    </Paper>
  );
};

export default Calculator;
