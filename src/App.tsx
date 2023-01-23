import React, { useState } from "react";
import "./App.css";
import Pic from "./assets/yuhos.png";
import Calculator from "./components/Calculator";

const App = () => {
  const [deliveryCost, setDeliveryCost] = useState<number>(0);
  return (
    <div>
      <Calculator />
    </div>
  );
};

export default App;
