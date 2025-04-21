import { renderHook, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";

import { usePizzaOfTheDay } from "../hooks/usePizzaOfTheDay.js";

const fetchMocker = createFetchMock(vi)
fetchMocker.enableMocks()

const testPizza = {
  id: "calabrese",
  name: "The Calabrese Pizza",
  category: "Supreme",
  description: "Pizza from Italy",
  image: "/public/pizzas/calabrese.webp",
}

test("gives null when first called", async () => {
  fetch.mockResponseOnce(JSON.stringify(testPizza))
  const { result} = renderHook(() => usePizzaOfTheDay())
  expect(result.current).toBeUndefined()
})

test("To call the API and give back the pizza of the day", async () => {
  fetch.mockResponseOnce(JSON.stringify(testPizza))
  const {result} = renderHook(() => usePizzaOfTheDay())
  await waitFor(() =>
    expect(result.current).toEqual(testPizza)
  )
  expect(fetchMocker).toBeCalledWith("/api/pizza-of-the-day")
})
