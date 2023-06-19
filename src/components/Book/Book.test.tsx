import { render, screen, cleanup } from "@testing-library/react";
import Book, { IBookProps } from "./Book";

const bookProps: IBookProps = {
  title: "Lorem ipsum",
  coverImage: "https://picsum.photos/200/300",
  details: [
    "Lorem ipsum: dolor sit amet",
    "Lorem ipsum 2: dolor sit amet",
    "Lorem ipsum 3: dolor sit amet",
  ],
};

const otherBookProps: IBookProps = {
  title: "Lorem ipsum 2",
  coverImage: "https://picsum.photos/300/400",
  details: [
    "Lorem ipsumasdet",
    "asdad: dolor sit amet",
    "Loremasd ipsasdaasdr sit amet",
  ],
};

const testElement = (props = bookProps) => <Book {...props} />;
const getBook = () => screen.getByTestId("book");

test("it renders", () => {
  render(testElement());

  const book = getBook();
  expect(book).toBeInTheDocument();
});

test("it renders props correctly", () => {
  render(testElement(bookProps));
  checkAllChildren(bookProps);

  cleanup();

  render(testElement(otherBookProps));
  checkAllChildren(otherBookProps);
});

const checkAllChildren = (bookProps: IBookProps) => {
  const book = getBook();
  const headline = screen.getByText(bookProps.title);
  // eslint-disable-next-line testing-library/no-node-access
  const img = document.querySelector("img") as HTMLImageElement;

  expect(book).toContainElement(headline);
  expect(book).toContainElement(img);

  expect(img.src).toEqual(bookProps.coverImage);
  expect(img.alt).toEqual(bookProps.title);

  bookProps.details.forEach((detail) => {
    const detailEl = screen.getByText(detail);
    expect(book).toContainElement(detailEl);
  });
};
