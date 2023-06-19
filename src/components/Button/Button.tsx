import React from "react";
import styles from "./Button.module.scss";
import cx from "classnames";
import type { Link } from "react-router-dom";

interface IButtonProps<T extends React.ElementType | typeof Link> {
  as?: T;
  children: string;
}

function Button<T extends React.ElementType | typeof Link = "button">({
  as,
  className,
  children,
  ...restProps
}: IButtonProps<T> &
  Omit<React.ComponentPropsWithRef<T>, keyof IButtonProps<T>>) {
  const Component = as || "button";
  return (
    <Component className={cx([styles.wrapper, className])} {...restProps}>
      {children}
    </Component>
  );
}

export default Button;
