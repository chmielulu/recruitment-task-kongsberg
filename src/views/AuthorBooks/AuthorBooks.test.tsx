import AuthorBooks from "./AuthorBooks";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const renderAuthorBooks = () =>
  render(
    <BrowserRouter>
      <AuthorBooks authorId="1" authorName="Johny Rambo" />
    </BrowserRouter>
  );

test("it renders", () => {
  // @ts-ignore
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );

  renderAuthorBooks();

  const authorBooks = screen.getByTestId("author-books");
  expect(authorBooks).toBeInTheDocument();
});

test("it displays loading icon and after successful api fetch, author name and his books", async () => {
  // @ts-ignore
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: 1,
            authorId: 1,
            title: "Clean Code: A Handbook of Agile Software Craftsmanship",
            publicationDate: "2010-02-19",
            coverImage:
              "https://m.media-amazon.com/images/I/41xShlnTZTL._SX376_BO1,204,203,200_.jpg",
            numberOfPages: 464,
            publisher: "Pearson",
          },
          {
            id: 4,
            authorId: 1,
            title:
              "Agile Software Development, Principles, Patterns, and Practices",
            publicationDate: "2014-11-27",
            coverImage:
              "https://m.media-amazon.com/images/I/51GXv-sMBYL._SX258_BO1,204,203,200_QL70_ML2_.jpg",
            numberOfPages: 552,
            publisher: "Pearson",
          },
        ]),
    })
  );

  renderAuthorBooks();

  const authorBooks = screen.getByTestId("author-books");
  expect(authorBooks).toBeInTheDocument();

  const loadingIcon = screen.getByTestId("loading-icon");
  expect(loadingIcon).toBeInTheDocument();

  const headline = screen.getByText("Books by Johny Rambo");
  expect(authorBooks).toContainElement(headline);

  await screen.findByText(
    "Clean Code: A Handbook of Agile Software Craftsmanship"
  );
  const books = screen.getAllByTestId("book");
  books.forEach((book) => expect(authorBooks).toContainElement(book));

  expect(loadingIcon).not.toBeInTheDocument();
});

test("it displays error when data from the API is an empty array", async () => {
  // @ts-ignore
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );

  renderAuthorBooks();

  const authorBooks = screen.getByTestId("author-books");
  expect(authorBooks).toBeInTheDocument();

  const loadingIcon = screen.getByTestId("loading-icon");
  expect(loadingIcon).toBeInTheDocument();

  const err = await screen.findByText("We can't find the author with this ID");
  expect(authorBooks).toContainElement(err);
});

test("it displays error when cannot connect to the API", async () => {
  global.fetch = jest.fn(() => Promise.reject(new Error("test")));

  render(
    <BrowserRouter>
      <AuthorBooks authorId="1" authorName="Johny Rambo" />
    </BrowserRouter>
  );

  const authorBooks = screen.getByTestId("author-books");
  expect(authorBooks).toBeInTheDocument();

  const loadingIcon = screen.getByTestId("loading-icon");
  expect(loadingIcon).toBeInTheDocument();

  const err = await screen.findByText("Something went wrong...");
  expect(authorBooks).toContainElement(err);
});
