import React from "react";
import { Routes, useNavigate, Route, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./ListOfAuthors.module.scss";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Table from "../../components/Table/Table";
import { useAuthors } from "../../api";
import AuthorBooks from "../AuthorBooks/AuthorBooks";
import { useSelectedRowId, useBreadcrumbItems } from "./hooks";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
import cx from "classnames";
import { mapQueryAuthorsToTableItems, getAuthorName } from "../../utils";

const ListOfAuthors = () => {
  const { data, isError, isLoading } = useAuthors();
  const params = useParams<{ "*": string }>();
  const selectedRowId = useSelectedRowId(params["*"]);
  const breadcrumbItems = useBreadcrumbItems(selectedRowId, data);
  const navigate = useNavigate();

  let loadingInfo: (() => React.ReactNode) | null = null;

  if (isLoading) loadingInfo = () => <LoadingIcon />;
  if (isError) loadingInfo = () => <div>Something went wrong...</div>;

  const authorId = params["*"]!;
  const tableHeaderItems = ["id", "name", "numberOfBooks"];

  return (
    <div data-testid="list-of-authors" className={styles.wrapper}>
      {loadingInfo?.()}
      {data ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cx([
            styles.contentWrapper,
            params["*"] !== "" && "fixedSize",
          ])}
        >
          <div className={styles.contentInnerWrapper}>
            <Breadcrumb items={breadcrumbItems} className={styles.breadcrumb} />
            <div className={styles.dataWrapper}>
              <Table
                headerItems={tableHeaderItems}
                items={mapQueryAuthorsToTableItems(data, navigate)}
                shrinkFirstColumn
                selectedRowId={selectedRowId}
                className={styles.table}
              />
              <Routes>
                <Route
                  path=":userId"
                  element={
                    <AuthorBooks
                      authorName={getAuthorName(data, selectedRowId)}
                      authorId={authorId}
                    />
                  }
                />
              </Routes>
            </div>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
};

export default ListOfAuthors;
