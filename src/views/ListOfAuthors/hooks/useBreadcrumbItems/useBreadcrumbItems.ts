import { IBreadcrumbProps } from "../../../../components/Breadcrumb/Breadcrumb";
import ViewRoute from "../../../../routes/routes";
import { useEffect, useState } from "react";
import { IQueryAuthors } from "../../../../api";
import Routes from "../../../../routes/routes";

const initialBreadcrumbItems: IBreadcrumbProps["items"] = [
  { name: "Homepage", link: ViewRoute.Home },
  { name: "List of authors", link: ViewRoute.ListOfAuthors },
];

export const useBreadcrumbItems = (
  selectedRowId: number,
  data: IQueryAuthors | null
) => {
  const [breadcrumbItems, setBreadcrumbItems] = useState(
    initialBreadcrumbItems
  );

  useEffect(() => {
    if (selectedRowId === -1) {
      setBreadcrumbItems(initialBreadcrumbItems);
      return;
    }

    if (data && selectedRowId !== -1) {
      const name = data.find(({ id }) => id === selectedRowId)?.name;

      if (!name) return;

      setBreadcrumbItems([
        ...initialBreadcrumbItems,
        {
          name,
          link: Routes.GetAuthorBookRoute(selectedRowId),
        },
      ]);
    }
  }, [selectedRowId, data]);

  return breadcrumbItems;
};
