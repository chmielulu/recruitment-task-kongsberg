import React from "react";
import styles from "./Table.module.scss";
import cx from "classnames";
import { camelCaseToNormalText } from "../../utils";

export interface ITableProps<T extends ReadonlyArray<string>> {
  headerItems: T;
  className?: string;
  items: ITableItem<T>[];
  shrinkFirstColumn?: boolean;
  selectedRowId?: any;
}

export interface ITableItem<T extends ReadonlyArray<string> | never> {
  id: any;
  onClick?: () => void;
  label?: string;
  data: {
    [K in T extends ReadonlyArray<infer U> ? U : never]?: string | number;
  };
}

function Table({
  items,
  headerItems,
  className,
  shrinkFirstColumn,
  selectedRowId,
}: ITableProps<ReadonlyArray<string>>) {
  return (
    <div
      className={cx([styles.overflowContainer, className])}
      data-testid="table"
    >
      <div
        className={cx([
          styles.wrapper,
          shrinkFirstColumn && "shrinkFirstColumn",
        ])}
      >
        <div className={styles.header}>
          {headerItems.map((item) => (
            <div key={item} className={styles.headerItem}>
              {camelCaseToNormalText(item)}
            </div>
          ))}
        </div>
        {items.map(({ id, onClick, data, label }) => (
          <Row
            headerItems={headerItems}
            key={id}
            data={data}
            onClick={onClick}
            isSelected={selectedRowId === id}
            label={label}
            data-testid={`row-${id}`}
          />
        ))}
      </div>
    </div>
  );
}

interface ITableRowProps<T extends ReadonlyArray<string>>
  extends Omit<ITableItem<T>, "id"> {
  headerItems: T;
  isSelected?: boolean;
  label?: string;
}

function Row({
  onClick,
  data,
  headerItems,
  isSelected,
  label,
  ...restProps
}: ITableRowProps<ReadonlyArray<string>>) {
  const handleClick = () => !isSelected && onClick?.();

  return (
    <div
      className={cx([
        styles.row,
        onClick && "isClickable",
        isSelected && "isSelected",
      ])}
      onClick={handleClick}
      aria-label={label}
      {...restProps}
    >
      {headerItems.map((item) => (
        <div key={item} className={styles.rowItem}>
          {data[item]}
        </div>
      ))}
    </div>
  );
}

export default Table;
