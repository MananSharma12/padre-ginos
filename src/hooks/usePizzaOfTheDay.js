import { useState, useEffect } from "react";

export const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(undefined);

  async function fetchPizzaOfTheDay() {
    const res = await fetch("/api/pizza-of-the-day");
    const json = await res.json();
    setPizzaOfTheDay(json);
  }

  useEffect(() => {
    fetchPizzaOfTheDay();
  }, [])

  return pizzaOfTheDay;
}