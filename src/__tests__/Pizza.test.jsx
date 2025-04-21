import { render, cleanup } from "@testing-library/react"
import { expect, test, afterEach } from  "vitest"
import Pizza from "../components/Pizza.jsx"

afterEach(cleanup);

test("Alt text renders on Pizza Image", () => {
  const name = "My Pizza"
  const src = "https://picsum.com/200"
  const screen = render(
    <Pizza name={name} image={src} description="My description" />
  )

  const img = screen.getByRole("img")
  expect(img.src).toBe(src)
  expect(img.alt).toBe(name)
})

test("Default image renders if none provided", () => {
  const screen = render(
    <Pizza name="My Pizza" description="My description" />
  )

  const img = screen.getByRole("img")
  expect(img.src).not.toBe("");
})
