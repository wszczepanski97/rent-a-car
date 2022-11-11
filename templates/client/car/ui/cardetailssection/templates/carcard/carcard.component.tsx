import type { FC } from "react";
import type { CarProps } from "templates/client/car/types/index";
import Card from "ui/molecules/card";
import { CardType } from "ui/molecules/card/cardtype.enum";
import CarCarousel from "../../organisms/carcarousel/carcarousel.component";
import CarDescription from "../cardescription/cardescription.component";
import styles from "./carcard.module.scss";
import CarCardTitle from "./ui/atoms/carcardtitle/carcardtitle.component";

const CarCard: FC<CarProps> = ({ car }) => (
  <Card type={CardType.CUSTOM} className={styles.carCard}>
    <CarCardTitle carName={`${car?.Marka} ${car?.Model}`} />
    <div className={styles.carCardInnerWrapper}>
      <CarCarousel photos={car?.Zdjecia!} />
      <CarDescription car={car} />
    </div>
  </Card>
);

export default CarCard;
