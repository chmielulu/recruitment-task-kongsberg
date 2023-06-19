import { renderHook } from "@testing-library/react-hooks";
import { useAuthorBooks } from "./useAuthorBooks";

beforeEach(() => {
  window.localStorage.clear();
});

test("if server didn't return an array, then isError is still true", async () => {
  // @ts-ignore
  global.fetch = jest.fn(() => Promise.resolve({ json: Promise.resolve({}) }));
  const { result, waitFor } = renderHook(() => useAuthorBooks(1));

  expect(result.current.data).toEqual(null);
  expect(result.current.isLoading).toEqual(true);
  expect(result.current.isError).toEqual(false);

  await waitFor(() => expect(result.current.isLoading).toEqual(false));

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
  });

  test("initial isError, data, isLoading", () => {
    const { result } = renderHook(() => useAuthorBooks(1));

    expect(fetch).toBeCalledWith(
      "https://my-json-server.typicode.com/chmielulu/recruitment-task-db/books?authorId=1",
      expect.anything()
    );
    expect(result.current.isError).toEqual(false);
    expect(result.current.data).toEqual(null);
    expect(result.current.isLoading).toEqual(true);
  });

  test("it sets data to state and update isError, isLoading", async () => {
    const { result, waitFor } = renderHook(() => useAuthorBooks(1));

    await waitFor(() => expect(result.current.data).not.toEqual(null));
    expect(result.current.isError).toEqual(false);
    expect(result.current.data).toEqual(data);
    expect(result.current.isLoading).toEqual(false);
  });
});

describe("when unable to connect to the server", () => {
  beforeEach(() => {
    // @ts-ignore
    global.fetch = jest.fn(() => Promise.reject(new Error("test error")));
  });

  test("initial isError, data, isLoading", () => {
    const { result } = renderHook(() => useAuthorBooks(1));

    expect(fetch).toBeCalledWith(
      "https://my-json-server.typicode.com/chmielulu/recruitment-task-db/books?authorId=1",
      expect.anything()
    );
    expect(result.current.isError).toEqual(false);
    expect(result.current.data).toEqual(null);
    expect(result.current.isLoading).toEqual(true);
  });

  test("it sets isError to true", async () => {
    const { result, waitFor } = renderHook(() => useAuthorBooks(1));
    await waitFor(() => expect(result.current.isLoading).toEqual(false));
    expect(result.current.isError).toEqual(true);
    expect(result.current.data).toEqual(null);
    expect(result.current.isLoading).toEqual(false);
  });
});
