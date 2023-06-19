import React from "react";
import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";
import Routes from "../../routes/routes";

const Logo = () => (
  <Link to={Routes.Home} className={styles.wrapper}>
    <h1>Recruitment Task</h1>
  </Link>
);

export default Logo;
