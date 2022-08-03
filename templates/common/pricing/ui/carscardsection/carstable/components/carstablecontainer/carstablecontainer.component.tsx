import React, { FC } from "react";
import { TableProps } from "react-table";
import styles from "../../carstable.module.scss";

const CarsTableContainer: FC<TableProps> = ({ children, ...rest }) => (
  <table className={styles.carsCard_Table} {...rest}>
    {children}
  </table>
);

export default CarsTableContainer;
