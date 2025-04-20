import { useContext, useEffect, useState } from "react";
import Pizza from "../components/Pizza.jsx";
import Cart from "../components/Cart.jsx";
import { CartContext } from "../contexts.js";
import { createLazyFileRoute } from "@tanstack/react-router";

const intl = new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "USD",
})

const Order = () => {
  const [pizzaTypes, setPizzaTypes] = useState([])
  const [pizzaType, setPizzaType] = useState("pepperoni")
  const [pizzaSize, setPizzaSize] = useState("M")
  const [cart, setCart] = useContext(CartContext);
  const [loading, setLoading] = useState(true)

  async function checkout() {
    setLoading(true)
    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ cart })
    })

    setCart([])
    setLoading(false)
  }

  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find(pizza => pizza.id === pizzaType)
    price = intl.format(selectedPizza.sizes[pizzaSize])
  }

  async function fetchPizzaTypes() {
    const pizzaRes = await fetch("/api/pizzas")
    const pizzaJson = await pizzaRes.json()
    setPizzaTypes(pizzaJson)
    setLoading(false)
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          setCart([...cart, {pizza: selectedPizza, size: pizzaSize}])
        }}>
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type</label>
              <select
                name="pizza-type"
                value={pizzaType}
                onChange={(e) => setPizzaType(e.target.value)}
              >
                {pizzaTypes.map(pizza => (<option key={pizza.id} value={pizza.id}>
                  {pizza.name}
                </option>))}
              </select>
            </div>
            <div>
              <label htmlFor="pizza-size">Pizza Size</label>
              <div>
                <span>
                  <input
                    checked={pizzaSize === "S"}
                    type="radio"
                    name="pizza-size"
                    value="S"
                    id="pizza-s"
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="pizza-s">S</label>
                </span>
                <span>
                  <input
                    checked={pizzaSize === "M"}
                    type="radio"
                    name="pizza-size"
                    value="M"
                    id="pizza-m"
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="pizza-m">M</label>
                </span>
                <span>
                  <input
                    checked={pizzaSize === "L"}
                    type="radio"
                    name="pizza-size"
                    value="L"
                    id="pizza-l"
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="pizza-l">L</label>
                </span>
              </div>
            </div>
            <button type="submit">Add to Cart</button>
          </div>
          {loading ? <h1>Loading...</h1> : <div className="order-pizza">
            <Pizza
              name={selectedPizza.name}
              description={selectedPizza.description}
              image={selectedPizza.image}
            />
            <p>{price}</p>
          </div>}
        </form>
      </div>
      {loading ? <h2>Loading...</h2> : <Cart cart={cart} checkout={checkout} />}
    </div>
  );
}

export default Order

export const Route = createLazyFileRoute("/order")({
  component: Order
})
