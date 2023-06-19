import { getAuthorName } from "./getAuthorName";
import { IQueryAuthors } from "../../api";

test("it returns author name", () => {
  const testAuthors: IQueryAuthors = [
    { id: 1, name: "Liam", numberOfBooks: 2 },
    { id: 2, name: "Oliver", numberOfBooks: 2 },
    { id: 3, name: "Elijah", numberOfBooks: 2 },
    { id: 4, name: "James", numberOfBooks: 2 },
  ];

  const liam = getAuthorName(testAuthors, 1);
  expect(liam).toEqual("Liam");

  const oliver = getAuthorName(testAuthors, 2);
  expect(oliver).toEqual("Oliver");

  const elijah = getAuthorName(testAuthors, 3);
  expect(elijah).toEqual("Elijah");

  const james = getAuthorName(testAuthors, 4);
  expect(james).toEqual("James");
});
