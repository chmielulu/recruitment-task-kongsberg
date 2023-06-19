import { useAPIQuery } from "../../hooks";

export interface IAuthor {
  id: number;
  name: string;
  numberOfBooks: number;
}

export type IQueryAuthors = IAuthor[];

export const useAuthors = () => {
  const { data, isLoading, isError } = useAPIQuery<IQueryAuthors>(
    "https://my-json-server.typicode.com/chmielulu/recruitment-task-db/authors",
    "authors"
  );

  if (data && !Array.isArray(data)) {
    return { data: null, isError: true, isLoading };
  }

  return { data, isLoading, isError };
};
