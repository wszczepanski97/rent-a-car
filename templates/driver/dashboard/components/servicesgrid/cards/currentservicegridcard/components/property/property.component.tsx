import React, { FC } from "react";
import styles from "./property.module.scss";

type PropertyProps = {
  name: string;
  value: string;
};

const Property: FC<PropertyProps> = ({ name, value }) => (
  <div className={styles.property}>
    <span>{name}</span>
    <p>{value}</p>
  </div>
);

export default Property;
