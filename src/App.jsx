import './App.css'
import Pizza from "./components/Pizza.jsx";
import Order from "./components/Order.jsx";
import PizzaOfTheDay from "./components/PizzaOfTheDay.jsx";

function App() {
  return (
    <div>
      <h1 className="logo">Padre Gino's - Order Now</h1>
      <Order />
      <PizzaOfTheDay />
    </div>
  )
}

export default App
