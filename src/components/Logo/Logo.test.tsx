import { render, screen } from "@testing-library/react";
import Logo from "./Logo";
import { BrowserRouter } from "react-router-dom";

test("it renders", () => {
  render(
    <BrowserRouter>
      <Logo />
    </BrowserRouter>
  );
  const logo = screen.getByText("Recruitment Task");
  expect(logo).toBeInTheDocument();
});
