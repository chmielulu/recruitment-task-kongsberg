import { IQueryAuthors } from "../../api";

export const getAuthorName = (data: IQueryAuthors, selectedRowId: number) =>
  data.find(({ id }) => id === selectedRowId)?.name;
