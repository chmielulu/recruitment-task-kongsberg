import { renderHook } from "@testing-library/react-hooks";
import { useSelectedRowId } from "./useSelectedRowId";

test("it sets selectedRowId to -1 when authorId is empty", () => {
  const authorId = "";
  const { result } = renderHook(() => useSelectedRowId(authorId));
  expect(result.current).toEqual(-1);
});

describe("it sets selectedRowId to authorId when authorId is not empty", () => {
  test("authorId: 1", () => {
    const authorId = "1";
    const { result } = renderHook(() => useSelectedRowId(authorId));
    expect(result.current).toEqual(1);
  });

  test("authorId: 2", () => {
    const authorId = "2";
    const { result } = renderHook(() => useSelectedRowId(authorId));
    expect(result.current).toEqual(2);
  });

  test("authorId: 3", () => {
    const authorId = "3";
    const { result } = renderHook(() => useSelectedRowId(authorId));
    expect(result.current).toEqual(3);
  });
});
