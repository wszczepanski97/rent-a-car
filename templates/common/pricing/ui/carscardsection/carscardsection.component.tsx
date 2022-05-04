import { FC } from "react";
import { Cars } from "templates/common";
import { CarCard } from "ui";
import { CarsCardSectionContainer } from "./organisms";

const CarsCardSection: FC<{ cars: Cars[] }> = ({ cars }) => (
  <section>
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
  </section>
);

export default CarsCardSection;
