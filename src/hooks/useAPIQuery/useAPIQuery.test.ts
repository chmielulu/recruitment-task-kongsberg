import { renderHook } from "@testing-library/react-hooks";
import { useAPIQuery } from "./useAPIQuery";

const data = {
  data: {
    authors: [
      { id: 1, name: "Liam", numberOfBooks: 2 },
      { id: 2, name: "Oliver", numberOfBooks: 2 },
      { id: 3, name: "Elijah", numberOfBooks: 2 },
      { id: 4, name: "James", numberOfBooks: 2 },
    ],
  },
};

describe("when data was retrieved", () => {
  beforeEach(() => {
    window.localStorage.clear();
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(data) })
    );
  });

  test("initial isError, data, isLoading", () => {
    const { result } = renderHook(() =>
      useAPIQuery("https://test.com/", "test")
    );

    expect(fetch).toBeCalledWith("https://test.com/", expect.anything());
    expect(result.current.isError).toEqual(false);
    expect(result.current.data).toEqual(null);
    expect(result.current.isLoading).toEqual(true);
  });

  test("it sets data to state and update isError, isLoading", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAPIQuery("https://test2.com/", "test")
    );

    await waitForNextUpdate();
    expect(result.current.isError).toEqual(false);
    expect(result.current.data).toEqual(data);
    expect(result.current.isLoading).toEqual(false);
  });
});

describe("when unable to connect to the server", () => {
  beforeEach(() => {
    window.localStorage.clear();
    // @ts-ignore
    global.fetch = jest.fn(() => Promise.reject(new Error("test error")));
  });

  test("initial isError, data, isLoading", () => {
    const { result } = renderHook(() =>
      useAPIQuery("https://test1.com/", "test")
    );

    expect(fetch).toBeCalledWith("https://test1.com/", expect.anything());
    expect(result.current.isError).toEqual(false);
    expect(result.current.data).toEqual(null);
    expect(result.current.isLoading).toEqual(true);
  });

  test("it sets isError to true", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAPIQuery("https://test2.com/", "test")
    );
    await waitForNextUpdate();
    expect(result.current.isError).toEqual(true);
    expect(result.current.data).toEqual(null);
    expect(result.current.isLoading).toEqual(false);
  });
});

describe("caching", () => {
  beforeEach(() => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(data) })
    );
    window.localStorage.clear();
  });

  const getData = async () => {
    const { waitFor, result } = renderHook(() =>
      useAPIQuery("https://test.com", "test", 1)
    );
    await waitFor(() => expect(result.current.data).not.toEqual(null));
    return result.current.data;
  };

  test("fetch only if data is not cached", async () => {
    await getData();
    await getData();
    await getData();
    await getData();
    await getData();
    await getData();
    await getData();

    expect(fetch).toBeCalledTimes(1);
  });

  test("data from cache is the same as from fetch", async () => {
    const firstData = await getData();
    const secondData = await getData();

    expect(firstData).toEqual(data);
    expect(secondData).toEqual(data);
  });

  test("if ttl time has elapsed then refetch new data", async () => {
    const waitForTimeout = () =>
      new Promise((res) => setTimeout(() => res(true), 1000));

    await getData();
    await getData();
    await getData();
    expect(fetch).toBeCalledTimes(1);

    await waitForTimeout();
    await getData();
    expect(fetch).toBeCalledTimes(2);
    await waitForTimeout();
    await getData();
    expect(fetch).toBeCalledTimes(3);
    await getData();
    await getData();
    await getData();
    await getData();
    await getData();
    expect(fetch).toBeCalledTimes(3);
  });
});
