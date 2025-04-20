import './App.css'
import Order from "./components/Order.jsx";
import PizzaOfTheDay from "./components/PizzaOfTheDay.jsx";
import Header from "./components/Header.jsx";
import { CartContext } from "./contexts.js";
import { useState } from "react";

function App() {
  const cartHook = useState([])

  return (
    <div>
      <CartContext value={cartHook}>
        <Header />
        <Order />
        <PizzaOfTheDay />
      </CartContext>
    </div>
  )
}

export default App
