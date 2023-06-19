import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";
import Routes from "../../routes/routes";

const NotFound = () => (
  <div className={styles.wrapper}>
    <h2 className={styles.headline}>Page not found</h2>
    <p className={styles.paragraph}>
      We can't find this page. <Link to={Routes.Home}>Go to homepage</Link>
    </p>
  </div>
);

export default NotFound;
