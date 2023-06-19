import { camelCaseToNormalText } from "./camelCaseToNormalText";

test("it returns expected value", () => {
  const test1 = camelCaseToNormalText("loremIpsum");
  expect(test1).toEqual("Lorem ipsum");

  const test2 = camelCaseToNormalText("booksList");
  expect(test2).toEqual("Books list");

  const test3 = camelCaseToNormalText("authorId");
  expect(test3).toEqual("Author id");

  const test4 = camelCaseToNormalText(" loremIpsum ");
  expect(test4).toEqual("Lorem ipsum");

  const test5 = camelCaseToNormalText(" authorId ");
  expect(test5).toEqual("Author id");
});
