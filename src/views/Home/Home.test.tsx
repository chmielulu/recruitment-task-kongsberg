import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";

test("it renders", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const btn = screen.getByText("Open list of authors");
  expect(btn).toBeInTheDocument();
});
