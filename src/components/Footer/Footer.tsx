import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => (
  <footer className={styles.wrapper} data-testid="footer">
    <span>
      The application was written by{" "}
      <a href="https://github.com/chmielulu" target="_blank" rel="noreferrer">
        Jakub Chmielewski
      </a>
    </span>
  </footer>
);

export default Footer;
