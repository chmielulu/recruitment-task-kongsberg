import { useEffect, useState } from "react";

export const useSelectedRowId = (authorId: string | undefined) => {
  const [selectedRowId, setSelectedRowId] = useState(-1);

  useEffect(() => {
    if (authorId === "") {
      setSelectedRowId(-1);
      return;
    }

    const id = +(authorId || -1);

    setSelectedRowId(id);
  }, [authorId]);

  return selectedRowId;
};
