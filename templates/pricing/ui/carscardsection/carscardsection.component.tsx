import { FC } from "react";
import { Cars } from "templates/pricing/types";
import { CarCard } from "./molecules";
import { CarsCardSectionContainer } from "./organisms";

const CarsCardSection: FC<{ cars: Cars[] }> = ({ cars }) => (
  <CarsCardSectionContainer>
    {cars.map(
      ({
        CenaZaDzien,
        IdSamochody,
        IloscMiejsc,
        Marka,
        Model,
        Nadwozie,
        RodzajPaliwa,
        Zdjecia,
      }) => (
        <>
          <CarCard
            detailsProps={{
              carBody: Nadwozie,
              fuelType: RodzajPaliwa,
              numberOfSeats: IloscMiejsc,
            }}
            photoProps={{
              src: Zdjecia?.split(";")[0] || "",
              alt: `${Marka} ${Model}`,
            }}
            paragraphProps={{
              paragraphText: `Price: ${CenaZaDzien}`,
            }}
            titleProps={{ title: `${Marka} ${Model}` }}
            carId={IdSamochody}
          />
        </>
      )
    )}
  </CarsCardSectionContainer>
);

export default CarsCardSection;
