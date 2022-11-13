import Link from "next/link";
import type { FC } from "react";
import type { CarPageProps } from "templates/common/car/types/car.props";
import styles from "./cardescription.module.scss";
import CarDescriptionColumn from "./components/cardescriptioncolumn";
import BootCapacityProperty from "./components/cardescriptioncolumn/components/bootcapacityproperty";
import CarBodyProperty from "./components/cardescriptioncolumn/components/carbodyproperty";
import FuelTypeProperty from "./components/cardescriptioncolumn/components/fueltypeproperty";
import NumberOfDoorsProperty from "./components/cardescriptioncolumn/components/numberofdoorsproperty";
import NumberOfSeatsProperty from "./components/cardescriptioncolumn/components/numberofseatsproperty";
import OdometerProperty from "./components/cardescriptioncolumn/components/odometerproperty";
import CarDescriptionHeader from "./components/cardescriptionheader";
import CarDescriptionRow from "./components/cardescriptionrow";
import AvailabilityProperty from "./components/cardescriptionrow/components/availabilityproperty";
import CategoryProperty from "./components/cardescriptionrow/components/categoryproperty";
import PriceForDayProperty from "./components/cardescriptionrow/components/pricefordayproperty";

const CarDescription: FC<CarPageProps> = ({ car }) => (
  <article className={styles.carDescriptionWrapper}>
    <CarDescriptionHeader />
    <div className={styles.carDescriptionColumnContainer}>
      <CarDescriptionColumn>
        <OdometerProperty value={car?.Przebieg} />
        <CarBodyProperty value={car?.samochodyszczegoly.Nadwozie} />
        <FuelTypeProperty value={car?.samochodyszczegoly.RodzajPaliwa} />
      </CarDescriptionColumn>
      <CarDescriptionColumn>
        <NumberOfSeatsProperty value={car?.samochodyszczegoly.IloscMiejsc} />
        <NumberOfDoorsProperty value={car?.samochodyszczegoly.IloscDrzwi} />
        <BootCapacityProperty
          value={car?.samochodyszczegoly.PojemnoscBagaznika}
        />
      </CarDescriptionColumn>
    </div>
    <CarDescriptionRow>
      <CategoryProperty value={car?.Kategoria} />
      <PriceForDayProperty value={car?.CenaZaGodzine} />
      <AvailabilityProperty available={true} />
    </CarDescriptionRow>
    <Link href={`/client/rent/${car?.IdSamochody}`}>
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
