import React, { FC } from "react";
import { motion } from "framer-motion";
import styles from "./Book.module.scss";
import cx from "classnames";

export interface IBookProps {
  coverImage: string;
  title: string;
  details: string[];
}

const Book: FC<IBookProps> = ({ details, title, coverImage }) => (
  <motion.div className={styles.wrapper} data-testid="book">
    <img src={coverImage} alt={title} className={styles.image} />
    <div className={styles.contentWrapper}>
      <h3 className={cx([styles.title, title.length > 80 && "longText"])}>
        {title}
      </h3>
      <ul className={styles.list}>
        {details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
    </div>
  </motion.div>
);

export default Book;
