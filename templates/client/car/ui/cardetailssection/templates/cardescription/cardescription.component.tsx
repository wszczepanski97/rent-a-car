import Link from "next/link";
import { FC } from "react";
import { CarProps } from "templates/client";
import styles from "./cardescription.module.scss";
import {
  AvailabilityProperty,
  BootCapacityProperty,
  CarBodyProperty,
  CarDescriptionColumn,
  CarDescriptionHeader,
  CarDescriptionRow,
  CategoryProperty,
  FuelTypeProperty,
  NumberOfDoorsProperty,
  NumberOfSeatsProperty,
  OdometerProperty,
  PriceForDayProperty,
} from "./ui";

const CarDescription: FC<CarProps> = ({ car }) => (
  <article className={styles.carDescriptionWrapper}>
    <CarDescriptionHeader />
    <div className={styles.carDescriptionColumnContainer}>
      <CarDescriptionColumn>
        <OdometerProperty value={car.Przebieg} />
        <CarBodyProperty value={car.samochodyszczegoly.Nadwozie} />
        <FuelTypeProperty value={car.samochodyszczegoly.RodzajPaliwa} />
      </CarDescriptionColumn>
      <CarDescriptionColumn>
        <NumberOfSeatsProperty value={car.samochodyszczegoly.IloscMiejsc} />
        <NumberOfDoorsProperty value={car.samochodyszczegoly.IloscDrzwi} />
        <BootCapacityProperty
          value={car.samochodyszczegoly.PojemnoscBagaznika}
        />
      </CarDescriptionColumn>
    </div>
    <CarDescriptionRow>
      <CategoryProperty value={car.Kategoria} />
      <PriceForDayProperty value={car.CenaZaDzien} />
      <AvailabilityProperty available={true} />
    </CarDescriptionRow>
    <Link href={`/client/rent/${car.IdSamochody}`}>
      <button
        style={{
          padding: "10px 36px",
          width: "100%",
          height: "48px",
          background: "var(--secondary-color-1)",
          color: "var(--light-text-color)",
          border: " 1px solid var(--light-background-color)",
        }}
      >
        <p>Zamów teraz</p>
      </button>
    </Link>
  </article>
);

export default CarDescription;
