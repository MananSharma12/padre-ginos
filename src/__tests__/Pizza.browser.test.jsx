import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import Pizza from "../components/Pizza.jsx";

test("Alt text renders on Pizza Image", async () => {
  const name = "My Pizza";
  const src = "https://picsum.photos/200";
  const screen = render(
    <Pizza name={name} image={src} description="My description" />
  );

  const img = await screen.getByRole("img");
  await expect.element(img).toBeInTheDocument()
  await expect.element(img).toHaveAttribute("src", src)
  await expect.element(img).toBeInTheDocument("alt", name)
});
