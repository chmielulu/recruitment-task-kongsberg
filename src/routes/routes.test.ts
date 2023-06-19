import Routes from "./routes";

test("routes are correct", () => {
  expect(Routes.Home).toEqual("/");
  expect(Routes.ListOfAuthors).toEqual("/list-of-authors");
  expect(Routes.GetAuthorBookRoute(1)).toEqual("/list-of-authors/1");
  expect(Routes.GetAuthorBookRoute(2)).toEqual("/list-of-authors/2");
  expect(Routes.GetAuthorBookRoute(3)).toEqual("/list-of-authors/3");
});
