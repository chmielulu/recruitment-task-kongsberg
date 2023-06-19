import { render, screen } from "@testing-library/react";
import Root from "./Root";

test("it renders", () => {
  render(<Root />);
  const root = screen.getByTestId("root");
  expect(root).toBeInTheDocument();
});
