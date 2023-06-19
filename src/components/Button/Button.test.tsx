import { render, screen } from "@testing-library/react";
import Button from "./Button";

test("it renders", () => {
  render(<Button>Click me</Button>);
  const btn = screen.getByText("Click me");
  expect(btn).toBeInTheDocument();
});

test("it changes returning html element by passing as prop", () => {
  render(<Button>Hello</Button>);
  const btn = screen.getByText("Hello");
  expect(btn.nodeName).toEqual("BUTTON");

  render(<Button as="a">link</Button>);
  const link = screen.getByText("link");
  expect(link.nodeName).toEqual("A");

  render(<Button as="div">div</Button>);
  const div = screen.getByText("div");
  expect(div.nodeName).toEqual("DIV");
});
