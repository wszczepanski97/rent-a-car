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
import PriceForHourProperty from "./components/cardescriptionrow/components/priceforhourproperty";

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
      <PriceForHourProperty value={car?.CenaZaGodzine} />
      <AvailabilityProperty />
    </CarDescriptionRow>
  </article>
);

export default CarDescription;
