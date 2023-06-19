import { render, cleanup, screen } from "@testing-library/react";
import Breadcrumb, { IBreadcrumbItem } from "./Breadcrumb";
import { BrowserRouter } from "react-router-dom";

const breadcrumbItems: IBreadcrumbItem[] = [
  { name: "Lorem ipsum", link: "https://google.com" },
  { name: "Lorem ipsum 2", link: "https://facebook.com" },
];

const otherBreadcrumbItems: IBreadcrumbItem[] = [
  { name: "Ipsum lorem", link: "https://github.com" },
  { name: "Ipsum lorem 2", link: "https://linkedin.com" },
];

const testElement = (items: IBreadcrumbItem[] = breadcrumbItems) => (
  <BrowserRouter>
    <Breadcrumb items={items} />
  </BrowserRouter>
);
const getBreadcrumb = () => screen.getByTestId("breadcrumb");

test("it renders", () => {
  render(testElement());
  const breadcrumb = getBreadcrumb();
  expect(breadcrumb).toBeInTheDocument();
});

test("it renders props correctly", () => {
  render(testElement(breadcrumbItems));
  testBreadcrumbProps(breadcrumbItems);

  cleanup();

  render(testElement(otherBreadcrumbItems));
  testBreadcrumbProps(otherBreadcrumbItems);
});

const testBreadcrumbProps = (items: IBreadcrumbItem[]) => {
  const breadcrumb = getBreadcrumb();

  items.forEach(({ name, link: href }) => {
    const link = screen.getByText(name) as HTMLLinkElement;
    expect(breadcrumb).toContainElement(link);
    expect(link?.href).toContain(href);
  });
};
