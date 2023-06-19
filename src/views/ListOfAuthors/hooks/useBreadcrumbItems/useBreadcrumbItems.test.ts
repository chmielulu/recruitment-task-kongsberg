import { renderHook } from "@testing-library/react-hooks";
import { useBreadcrumbItems } from "./useBreadcrumbItems";
import ViewRoute from "../../../../routes/routes";

test("it returns 2 items when no table row is selected", () => {
  const { result } = renderHook(() =>
    useBreadcrumbItems(-1, [{ id: 1, name: "test", numberOfBooks: 1 }])
  );

  expect(result.current).toEqual([
    { name: "Homepage", link: ViewRoute.Home },
    { name: "List of authors", link: ViewRoute.ListOfAuthors },
  ]);
});

describe("it returns 3 items when table row is selected", () => {
  test("selected first row", () => {
    const selectedRowId = 1;
    const data = [
      { id: 1, name: "test", numberOfBooks: 1 },
      { id: 2, name: "test 2", numberOfBooks: 1 },
    ];

    const { result } = renderHook(() =>
      useBreadcrumbItems(selectedRowId, data)
    );

    expect(result.current).toEqual([
      { name: "Homepage", link: ViewRoute.Home },
      { name: "List of authors", link: ViewRoute.ListOfAuthors },
      { name: "test", link: ViewRoute.GetAuthorBookRoute(1) },
    ]);
  });

  test("selected second row", () => {
    const selectedRowId = 2;
    const data = [
      { id: 1, name: "test", numberOfBooks: 1 },
      { id: 2, name: "test 2", numberOfBooks: 1 },
    ];

    const { result } = renderHook(() =>
      useBreadcrumbItems(selectedRowId, data)
    );

    expect(result.current).toEqual([
      { name: "Homepage", link: ViewRoute.Home },
      { name: "List of authors", link: ViewRoute.ListOfAuthors },
      { name: "test 2", link: ViewRoute.GetAuthorBookRoute(2) },
    ]);
  });
});
