import Link from "next/link";
import type { FC } from "react";
import type { CarProps } from "templates/client/car/types";
import CarDescriptionHeader from "templates/client/car/ui/cardetailssection/templates/cardescription/ui/atoms/cardescriptionheader/cardescriptionheader.component";
import BootCapacityProperty from "templates/client/car/ui/cardetailssection/templates/cardescription/ui/molecules/columnproperties/bootcapacityproperty/bootcapacityproperty.component";
import CarBodyProperty from "templates/client/car/ui/cardetailssection/templates/cardescription/ui/molecules/columnproperties/carbodyproperty/carbodyproperty.component";
import FuelTypeProperty from "templates/client/car/ui/cardetailssection/templates/cardescription/ui/molecules/columnproperties/fueltypeproperty/fueltypeproperty.component";
import NumberOfDoorsProperty from "templates/client/car/ui/cardetailssection/templates/cardescription/ui/molecules/columnproperties/numberofdoorsproperty/numberofdoorsproperty.component";
import NumberOfSeatsProperty from "templates/client/car/ui/cardetailssection/templates/cardescription/ui/molecules/columnproperties/numberofseatsproperty/numberofseatsproperty.component";
import OdometerProperty from "templates/client/car/ui/cardetailssection/templates/cardescription/ui/molecules/columnproperties/odometerproperty/odometerproperty.component";
import AvailabilityProperty from "templates/client/car/ui/cardetailssection/templates/cardescription/ui/molecules/rowproperties/availabilityproperty/availabilityproperty.component";
import CategoryProperty from "templates/client/car/ui/cardetailssection/templates/cardescription/ui/molecules/rowproperties/categoryproperty/categoryproperty.component";
import PriceForDayProperty from "templates/client/car/ui/cardetailssection/templates/cardescription/ui/molecules/rowproperties/pricefordayproperty/pricefordayproperty.component";
import CarDescriptionColumn from "templates/client/car/ui/cardetailssection/templates/cardescription/ui/organisms/cardescriptioncolumn/cardescriptioncolumn.component";
import CarDescriptionRow from "templates/client/car/ui/cardetailssection/templates/cardescription/ui/organisms/cardescriptionrow/cardescriptionrow.component";
import styles from "./cardescription.module.scss";

const CarDescription: FC<CarProps> = ({ car }) => (
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
