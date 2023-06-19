import React, { FC } from "react";
import styles from "./Breadcrumb.module.scss";
import cx from "classnames";
import { Link } from "react-router-dom";

export interface IBreadcrumbItem {
  name: string;
  link: string;
}
export interface IBreadcrumbProps {
  items: IBreadcrumbItem[];
  className?: string;
}

const Breadcrumb: FC<IBreadcrumbProps> = ({ items, className }) => (
  <ul className={cx([styles.wrapper, className])} data-testid="breadcrumb">
    {items.map(({ name, link }) => (
      <li key={name} className={styles.item}>
        <Link to={link} className={styles.link}>
          {name}
        </Link>
      </li>
    ))}
  </ul>
);

export default Breadcrumb;
