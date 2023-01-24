import React, { useState } from "react";
import { FormEvent } from "react";
import { deliveryDetails } from "./Model";
import Calculator from "./components/Calculator";

const App: React.FC = () => {
  // State to store error message
  const [errorMessage, setErrorMessage] = useState<string>("");
  // State to store order details
  const [orderDetails, setOrderDetails] = useState<deliveryDetails>({
    cartValue: 0,
    deliveryDistance: 0,
    numberOfItems: 0,
    orderTime: "",
  });

  // State to calculate the delivery details
  const [deliveryCost, setDeliveryCost] = useState<number>(0);

  const calculateDeliveryCost = () => {
    let cost = 0;
    // Small order surcharge
    if (orderDetails.cartValue < 10) {
      cost += 10 - orderDetails.cartValue;
    }
    // Delivery distance cost
    cost += 2; // base cost
    if (orderDetails.deliveryDistance > 1000) {
      let additionalDistance = orderDetails.deliveryDistance - 1000;
      let additionalCost = Math.ceil(additionalDistance / 500) * 1;
      cost += additionalCost;
    }
    // Additional item surcharge
    if (orderDetails.numberOfItems > 4) {
      let additionalItemSurcharge = (orderDetails.numberOfItems - 4) * 0.5;
      cost += additionalItemSurcharge;
    }
    // Bulk item cost
    if (orderDetails.numberOfItems > 12) {
      cost += 1.2;
    }
    // Maximum delivery cost
    if (cost > 15) {
      cost = 15;
    }
    // Free delivery
    if (orderDetails.cartValue >= 100) {
      cost = 0;
    }

    cost = parseFloat(cost.toFixed(2));
    setDeliveryCost(cost);

    console.log(cost);
  };

  // Handle calculate button click

  const handleCalculateClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const error: string = validateOrderDetails(orderDetails);
    if (error) {
      setErrorMessage(error);
      return;
    }
    clearOrderDetails();
    calculateDeliveryCost();
  };

  // validate order details

  const validateOrderDetails = (order: deliveryDetails): string => {
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

  // Clear order details and error message

  const clearOrderDetails = () => {
    setOrderDetails({
      cartValue: 0,
      deliveryDistance: 0,
      numberOfItems: 0,
      orderTime: "",
    });
    setErrorMessage("");
  };

  return (
    <div>
      <Calculator
        orderDetails={orderDetails}
        errorMessage={errorMessage}
        setOrderDetails={setOrderDetails}
        handleCalculateClick={handleCalculateClick}
        clearOrderDetails={clearOrderDetails}
      />
    </div>
  );
};

export default App;
