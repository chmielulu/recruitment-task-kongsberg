import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Table, { ITableProps } from "./Table";

let testVariable = "test";

const firstTableHeaderItems = ["id", "hello", "ipsum"] as const;
const firstTableProps: ITableProps<typeof firstTableHeaderItems> = {
  headerItems: firstTableHeaderItems,
  items: [
    {
      id: 1,
      label: "See the details",
      data: { id: 1, hello: "world", ipsum: "lorem" },
      onClick: () => {
        testVariable = "lorem";
      },
    },
    {
      id: 2,
      label: "See the details",
      data: { id: 2, hello: "world", ipsum: "lorem" },
    },
    {
      id: 3,
      label: "See the details",
      data: { id: 3, hello: "world", ipsum: "lorem" },
      onClick: () => {
        testVariable = "ipsum";
      },
    },
    {
      id: 4,
      label: "See the details 4",
      data: { id: 4, hello: "world", ipsum: "lorem" },
    },
  ],
};

const secondTableHeaderItems = ["test1", "test2", "test3"] as const;
const secondTableProps: ITableProps<typeof secondTableHeaderItems> = {
  headerItems: secondTableHeaderItems,
  items: [
    {
      id: 1,
      label: "See the details",
      data: { test1: 1, test2: "world", test3: "lorem" },
      onClick: () => {
        testVariable = "1";
      },
    },
    {
      id: 2,
      label: "See the details",
      data: { test1: 2, test2: "world", test3: "lorem" },
    },
    {
      id: 3,
      label: "See the details",
      data: { test1: 3, test2: "world", test3: "lorem" },
      onClick: () => {
        testVariable = "2";
      },
    },
    {
      id: 4,
      label: "See the details 4",
      data: { test1: 4, test2: "world", test3: "lorem" },
    },
  ],
};

test("it renders", () => {
  render(<Table {...firstTableProps} />);
  const table = screen.getByTestId("table");
  expect(table).toBeInTheDocument();
});

const testTableProps = (
  props: ITableProps<any>,
  { testVariableAfterClick }: { testVariableAfterClick: [string, string] }
) => {
  render(<Table {...props} />);
  const table = screen.getByTestId("table");

  // Check if onClick works
  expect(testVariable).toEqual("test");
  const firstRow = screen.getByTestId("row-1");
  expect(table).toContainElement(firstRow);
  userEvent.click(firstRow);
  expect(testVariable).toEqual(testVariableAfterClick[0]);

  const thirdRow = screen.getByTestId("row-3");
  expect(table).toContainElement(thirdRow);
  userEvent.click(thirdRow);
  expect(testVariable).toEqual(testVariableAfterClick[1]);

  // Check if header renders
  props.headerItems.forEach((headerItem: string) => {
    const item = screen.getByText(new RegExp(headerItem, "i"));
    expect(item).toBeInTheDocument();
  });

  // Check if table rows contain expected data
  props.items.forEach((item) => {
    const row = screen.getByTestId(`row-${item.id}`);

    Object.values(item.data).forEach((value, index) => {
      // eslint-disable-next-line testing-library/no-node-access
      expect(row.children[index].textContent).toEqual(`${value}`);
    });
  });
};

test("it renders props correctly", () => {
  testTableProps(firstTableProps, {
    testVariableAfterClick: ["lorem", "ipsum"],
  });
  cleanup();
  testVariable = "test";
  testTableProps(secondTableProps, { testVariableAfterClick: ["1", "2"] });
});
