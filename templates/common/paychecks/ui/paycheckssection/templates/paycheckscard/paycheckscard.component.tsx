import { FC } from "react";
import { Card, CardType } from "ui";
import styles from "./paycheckscard.module.scss";
import { PaychecksCardTitle, PaychecksTable } from "./ui";

const PaychecksCard: FC = () => (
  <Card type={CardType.CUSTOM} className={styles.paychecksCard}>
    <PaychecksCardTitle />
    <PaychecksTable />
  </Card>
);

export default PaychecksCard;
