import React, { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
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

  // Handle calculate button click

  const handleCalculateClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const error: string = validateOrderDetails(orderDetails);
    if (error) {
      setErrorMessage(error);
      return;
    } else {
      clearOrderDetails();
      console.log(orderDetails);
    }
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
