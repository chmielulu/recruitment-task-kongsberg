class Routes {
  static Home = "/";
  static ListOfAuthors = "/list-of-authors";
  static GetAuthorBookRoute = (authorId: number | string) => {
    return `${Routes.ListOfAuthors}/${authorId}`;
  };
}

export default Routes;
