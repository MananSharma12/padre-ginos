import './App.css'
import Pizza from "./components/Pizza.jsx";

function App() {
  return (
    <div>
      <h1>Padre Gino's - Order Now</h1>
      <Pizza name="Pepperoni" description="Pepperonim Cheese"/>
      <Pizza name="Hawaiian" description="Ham and Pineapple"/>
      <Pizza name="Americano" description="French fries, Hot dogs"/>
    </div>
  )
}

export default App
