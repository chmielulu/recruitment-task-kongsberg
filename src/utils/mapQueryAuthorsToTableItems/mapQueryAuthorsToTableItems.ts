import { IQueryAuthors } from "../../api";
import { ITableItem } from "../../components/Table/Table";
import ViewRoute from "../../routes/routes";
import { NavigateFunction } from "react-router-dom";

type Items = ReadonlyArray<"id" | "name" | "numberOfBooks">;

export function mapQueryAuthorsToTableItems(
  items: IQueryAuthors,
  navigate: NavigateFunction
): ITableItem<Items>[] {
  return items.map((item) => ({
    id: item.id,
    data: { ...item },
    onClick: () => {
      navigate(ViewRoute.GetAuthorBookRoute(item.id));
    },
    label: `See details of ${item.name}`,
  }));
}
