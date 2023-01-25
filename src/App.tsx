import React, { useState } from "react";
import { FormEvent } from "react";
import { deliveryDetails } from "./Model";
import Calculator from "./components/Calculator";
import Modal from "./components/Modal";
import Appbar from "./components/Appbar";
import { Container } from "@mui/material";

const App: React.FC = () => {
  // satte tp store the date
  const [orderDate, setOrderDate] = useState(new Date());
  // State to store error message
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [modalIsOn, setModalIsOn] = useState<boolean>(false);
  // State to store order details
  const [orderDetails, setOrderDetails] = useState<deliveryDetails>({
    cartValue: 0,
    deliveryDistance: 0,
    numberOfItems: 0,
  });

  // State to calculate the delivery details
  const [deliveryCost, setDeliveryCost] = useState<number>(0);

  const calculateDeliveryCost = (): void => {
    let cost: number = 0;
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

    //Rush hour delivery surcharge

    if (orderDate.getUTCDay() === 5) {
      //checks if it is friday
      const orderHour = orderDate.getUTCHours();
      if (orderHour >= 15 && orderHour <= 19) {
        cost *= 1.2;
        if (cost > 15) {
          cost = 15;
        }
      }
    }

    if (cost > 15) {
      // Maximum delivery cost
      cost = 15;
    }
    // Free delivery
    if (orderDetails.cartValue >= 100) {
      cost = 0;
    }
    cost = parseFloat(cost.toFixed(2));
    setDeliveryCost(cost as number);
  };

  // Handle calculate button click

  const handleCalculateClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const err: string = validateOrderDetails(orderDetails);
    if (err) {
      setErrorMessage(err as string);
      return;
    }
    clearOrderDetails();
    calculateDeliveryCost();
    setModalIsOn(true);
  };

  // validate order details

  const validateOrderDetails = (order: deliveryDetails): string => {
    if (!order.cartValue || order.cartValue < 0) {
      return "Invalid cart Value";
    }
    if (!order.deliveryDistance || order.deliveryDistance < 0) {
      return "Invalid distance";
    }
    if (!order.numberOfItems || order.numberOfItems < 0) {
      return "Invalid number of Items";
    }
    return "";
  };

  // Clear order details and error message

  const clearOrderDetails = (): void => {
    setOrderDetails({
      cartValue: 0,
      deliveryDistance: 0,
      numberOfItems: 0,
    });

    setErrorMessage("");
    setOrderDate(new Date());
    setDeliveryCost(0);
    setModalIsOn(false);
  };

  return (
    <Container maxWidth="lg">
      <Appbar />
      <Calculator
        orderDetails={orderDetails}
        errorMessage={errorMessage}
        setOrderDetails={setOrderDetails}
        handleCalculateClick={handleCalculateClick}
        clearOrderDetails={clearOrderDetails}
        orderDate={orderDate}
        setOrderDate={setOrderDate}
        setModalIsOn={setModalIsOn}
        setErrorMessage={setErrorMessage}
      />
      {modalIsOn && <Modal deliveryCost={deliveryCost} />}
    </Container>
  );
};

export default App;
