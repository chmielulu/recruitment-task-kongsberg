import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";
import { BrowserRouter } from "react-router-dom";

test("it renders", () => {
  render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  );
  const headline = screen.getByText("Page not found");
  expect(headline).toBeInTheDocument();
});
