import { useAPIQuery } from "../../hooks";

export interface IBook {
  id: number;
  authorId: number;
  title: string;
  coverImage: string;
  publicationDate: string | null;
  numberOfPages: number | null;
  publisher: string | null;
}

export type IQueryAuthorBooks = IBook[];

export const useAuthorBooks = (authorId: number) => {
  const { data, isLoading, isError } = useAPIQuery<IQueryAuthorBooks>(
    `https://my-json-server.typicode.com/chmielulu/recruitment-task-db/books?authorId=${authorId}`
  );

  if (!isLoading && !Array.isArray(data)) {
    return { data: null, isError: true, isLoading: false };
  }

  return { data, isError, isLoading };
};
