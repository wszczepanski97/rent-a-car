import { FC } from "react";
import { CarProps } from "templates/klient";
import { Card, CardType } from "ui";
import { CarDescription } from "..";
import { CarCarousel } from "../../organisms";
import styles from "./carcard.module.scss";
import { CarCardTitle } from "./ui";

const CarCard: FC<CarProps> = ({ car }) => (
  <Card type={CardType.CUSTOM} className={styles.carCard}>
    <CarCardTitle carName={`${car.Marka} ${car.Model}`} />
    <div className={styles.carCardInnerWrapper}>
      <CarCarousel photos={car.Zdjecia!} />
      <CarDescription car={car} />
    </div>
  </Card>
);

export default CarCard;
