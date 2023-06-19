import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("it renders", () => {
  render(<Footer />);
  const footer = screen.getByTestId("footer");
  expect(footer).toBeInTheDocument();
});
