import Link from "next/link";
import type { FC } from "react";
import type { CarPageProps } from "templates/common/car/types/car.props";
import Card from "ui/molecules/card";
import { CardType } from "ui/molecules/card/cardtype.enum";
import BackToPricingButton from "../backtopricingbutton/backtopricingbutton.component";
import CarCarousel from "../carcarousel";
import CarDescription from "../cardescription";
import styles from "./carcard.module.scss";
import CarCardTitle from "./components/carcardtitle";

const CarCard: FC<CarPageProps> = ({ car }) => (
  <Card type={CardType.CUSTOM} className={styles.carCard}>
    <CarCardTitle carName={`${car?.Marka} ${car?.Model}`} />
    <div className={styles.carCardInnerWrapper}>
      <CarCarousel photos={car?.Zdjecia!} />
      <CarDescription car={car} />
    </div>
    <div style={{ display: "flex", gap: 20, width: "100%", padding: "0 50px" }}>
      <Link href={`/client/rent/${car?.IdSamochody}`}>
        <button
          style={{
            padding: "10px 36px",
            width: "100%",
            height: "48px",
            background: "var(--secondary-color-1)",
            color: "var(--light-text-color)",
            border: " 1px solid var(--light-background-color)",
            cursor: "pointer",
          }}
        >
          <p>Zamów teraz</p>
        </button>
      </Link>
      <BackToPricingButton />
    </div>
  </Card>
);

export default CarCard;
