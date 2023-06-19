import React, { FC } from "react";
import { motion } from "framer-motion";
import { useAuthorBooks } from "../../api";
import Book from "../../components/Book/Book";
import styles from "./AuthorBooks.module.scss";
import cx from "classnames";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
import { AnimatePresence } from "framer-motion";
import { useScrollToHeadline } from "./hooks/useScrollToHeadline";

interface IAuthorBooksProps {
  authorName?: string;
  authorId: string;
}

const AuthorBooks: FC<IAuthorBooksProps> = ({ authorId, authorName }) => {
  const { data, isLoading, isError } = useAuthorBooks(+authorId);
  const { ref, scrollToHeadline } = useScrollToHeadline();

  let loadingInfo: React.ReactNode | null;
  let isData = data && data.length > 0;

  if (isLoading) loadingInfo = <LoadingIcon />;
  else if (isError) loadingInfo = <>Something went wrong...</>;
  else if (!isData) loadingInfo = <>We can't find the author with this ID</>;
  else loadingInfo = null;

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      data-testid="author-books"
    >
      <h2 className={cx([styles.headline])} ref={ref}>
        Books by {authorName}
      </h2>
      {loadingInfo}
      <AnimatePresence onExitComplete={scrollToHeadline}>
        {isData && (
          <motion.div
            className={styles.booksWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {data!.map((book) => (
              <Book
                key={book.id}
                coverImage={book.coverImage}
                title={book.title}
                details={[
                  `Publication date: ${book.publicationDate}`,
                  `Number of pages: ${book.numberOfPages}`,
                  `Publisher: ${book.publisher}`,
                ]}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AuthorBooks;
