import { renderHook } from "@testing-library/react-hooks";
import { useAuthors } from "./useAuthors";

test("if server didn't return an array, then isError is still true", async () => {
  // @ts-ignore
  global.fetch = jest.fn(() => Promise.resolve({ json: Promise.resolve({}) }));
  const { result, waitForNextUpdate } = renderHook(() => useAuthors());

  expect(result.current.data).toEqual(null);
  expect(result.current.isLoading).toEqual(true);
  expect(result.current.isError).toEqual(false);

  await waitForNextUpdate();

  expect(result.current.data).toEqual(null);
  expect(result.current.isLoading).toEqual(false);
  expect(result.current.isError).toEqual(true);
});

const data = [
  { id: 1, name: "Liam", numberOfBooks: 2 },
  { id: 2, name: "Oliver", numberOfBooks: 2 },
  { id: 3, name: "Elijah", numberOfBooks: 2 },
  { id: 4, name: "James", numberOfBooks: 2 },
];

describe("when data was retrieved", () => {
  beforeEach(() => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(data) })
    );
    window.localStorage.clear();
  });

  test("initial isError, data, isLoading", () => {
    const { result } = renderHook(() => useAuthors());

    expect(fetch).toBeCalledWith(
      "https://my-json-server.typicode.com/chmielulu/recruitment-task-db/authors",
      expect.anything()
    );
    expect(result.current.isError).toEqual(false);
    expect(result.current.data).toEqual(null);
    expect(result.current.isLoading).toEqual(true);
  });

  test("it sets data to state and update isError, isLoading", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuthors());

    await waitForNextUpdate();
    expect(result.current.isError).toEqual(false);
    expect(result.current.data).toEqual(data);
    expect(result.current.isLoading).toEqual(false);
  });
});

describe("when unable to connect to the server", () => {
  beforeEach(() => {
    // @ts-ignore
    global.fetch = jest.fn(() => Promise.reject(new Error("test error")));
    window.localStorage.clear();
  });

  test("initial isError, data, isLoading", () => {
    const { result } = renderHook(() => useAuthors());

    expect(fetch).toBeCalledWith(
      "https://my-json-server.typicode.com/chmielulu/recruitment-task-db/authors",
      expect.anything()
    );
    expect(result.current.isError).toEqual(false);
    expect(result.current.data).toEqual(null);
    expect(result.current.isLoading).toEqual(true);
  });

  test("it sets isError to true", async () => {
    const { result, waitFor } = renderHook(() => useAuthors());
    await waitFor(() => expect(result.current.isLoading).toEqual(false));
    expect(result.current.isError).toEqual(true);
    expect(result.current.data).toEqual(null);
    expect(result.current.isLoading).toEqual(false);
  });
});
