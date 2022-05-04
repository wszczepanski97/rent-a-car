import { FC } from "react";
import styles from "./carcardtitle.module.scss";

type CarCardTitleProps = {
  carName: string;
};

const CarCardTitle: FC<CarCardTitleProps> = ({ carName }) =>
  carName.length > 30 ? (
    <h2 className={styles.carCardTitle}>{carName}</h2>
  ) : (
    <h1>{carName}</h1>
  );

export default CarCardTitle;
