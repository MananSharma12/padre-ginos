import { useState } from "react";

import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { CartContext } from "../contexts.js";

import Header from "../components/Header.jsx";
import PizzaOfTheDay from "../components/PizzaOfTheDay.jsx";

export const Route = createRootRoute({
  component: () => {
    const cartHook = useState([])
    return (
      <div>
        <CartContext value={cartHook}>
          <Header />
          <Outlet />
          <PizzaOfTheDay />
        </CartContext>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </div>
    );
  },
})