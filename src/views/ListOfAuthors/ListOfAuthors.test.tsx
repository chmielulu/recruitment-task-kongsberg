import { render, screen } from "@testing-library/react";
import ListOfAuthors from "./ListOfAuthors";
import { BrowserRouter } from "react-router-dom";

const renderListOfAuthors = () =>
  render(
    <BrowserRouter>
      <ListOfAuthors />
    </BrowserRouter>
  );

test("it renders", () => {
  //@ts-ignore
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );

  renderListOfAuthors();

  const listOfAuthors = screen.getByTestId("list-of-authors");
  expect(listOfAuthors).toBeInTheDocument();
});

test("it displays loading icon and when the data is successfully fetched, it displays table", async () => {
  //@ts-ignore
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: 1,
            name: "Johny Rambo",
            numberOfBooks: 1,
          },
        ]),
    })
  );

  renderListOfAuthors();

  const listOfAuthors = screen.getByTestId("list-of-authors");
  expect(listOfAuthors).toBeInTheDocument();

  const loadingIcon = screen.getByTestId("loading-icon");
  expect(listOfAuthors).toContainElement(loadingIcon);

  const table = await screen.findByTestId("table");
  expect(listOfAuthors).toContainElement(table);
  expect(loadingIcon).not.toBeInTheDocument();
});

describe("it displays loading icon and when there is an error with API, it displays error info", () => {
  test("when cannot connect to the API", async () => {
    //@ts-ignore
    global.fetch = jest.fn(() => Promise.reject(new Error()));

    renderListOfAuthors();

    const listOfAuthors = screen.getByTestId("list-of-authors");
    expect(listOfAuthors).toBeInTheDocument();

    const loadingIcon = screen.getByTestId("loading-icon");
    expect(listOfAuthors).toContainElement(loadingIcon);

    const err = await screen.findByText("Something went wrong...");
    expect(listOfAuthors).toContainElement(err);
    expect(loadingIcon).not.toBeInTheDocument();
  });

  test("when API does not return an array", async () => {
    //@ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: Promise.resolve({}) })
    );

    renderListOfAuthors();

    const listOfAuthors = screen.getByTestId("list-of-authors");
    expect(listOfAuthors).toBeInTheDocument();

    const loadingIcon = screen.getByTestId("loading-icon");
    expect(listOfAuthors).toContainElement(loadingIcon);

    const err = await screen.findByText("Something went wrong...");
    expect(listOfAuthors).toContainElement(err);
    expect(loadingIcon).not.toBeInTheDocument();
  });
});
