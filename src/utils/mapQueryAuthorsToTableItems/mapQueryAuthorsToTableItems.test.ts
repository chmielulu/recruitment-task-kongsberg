import { mapQueryAuthorsToTableItems } from "./mapQueryAuthorsToTableItems";
import { IQueryAuthors } from "../../api";
import { To } from "react-router-dom";
import Routes from "../../routes/routes";

test("it returns correct array", () => {
  const testAuthors: IQueryAuthors = [
    { id: 1, name: "Liam", numberOfBooks: 2 },
    { id: 2, name: "Oliver", numberOfBooks: 2 },
    { id: 3, name: "Elijah", numberOfBooks: 2 },
    { id: 4, name: "James", numberOfBooks: 2 },
  ];

  let onClickResult: To | number = "";
  const mockNavigate = (route: To | number) => (onClickResult = route);

  const result = mapQueryAuthorsToTableItems(testAuthors, mockNavigate);
  result.forEach((tableItem, i) => {
    expect(tableItem.id).toEqual(testAuthors[i].id);
    expect(tableItem.label).toEqual(`See details of ${testAuthors[i].name}`);

    tableItem.onClick!();
    expect(onClickResult).toEqual(Routes.GetAuthorBookRoute(tableItem.id));

    Object.entries(tableItem.data).forEach(([key, value]) => {
      // @ts-ignore
      expect(value).toEqual(testAuthors[i][key]);
    });
  });
});
