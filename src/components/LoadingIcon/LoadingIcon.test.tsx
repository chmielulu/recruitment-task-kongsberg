import { render, screen } from "@testing-library/react";
import LoadingIcon from "./LoadingIcon";

test("it renders", () => {
  render(<LoadingIcon />);
  const loadingIcon = screen.getByTestId("loading-icon");
  expect(loadingIcon).toBeInTheDocument();
});
