import React, { FC } from "react";
import { Carousel } from "react-responsive-carousel";
import {
  DashboardPageCars,
  DashboardPageProps,
} from "templates/common/home/types";
import { CarCard } from "ui";
import styles from "./dashboardcarousel.module.scss";

function spliceIntoChunks(arr: DashboardPageCars[], chunkSize: number) {
  const res = [];
  while (arr.length > 0) {
    const chunk = arr.splice(0, chunkSize);
    res.push(chunk);
  }
  return res;
}

const DashboardCarousel: FC<DashboardPageProps> = ({ cars }) => (
  <Carousel
    autoPlay
    infiniteLoop
    stopOnHover
    interval={6000}
    showIndicators={false}
    showArrows={false}
    showStatus={false}
    showThumbs={false}
  >
    {spliceIntoChunks([...cars], 3).map((group) => (
      <div className={styles.dashboardCarouselItem}>
        {group.map(
          ({
            Nadwozie,
            RodzajPaliwa,
            IloscMiejsc,
            Zdjecia,
            Marka,
            Model,
            CenaZaDzien,
            IdSamochody,
          }) => (
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
          )
        )}
      </div>
    ))}
  </Carousel>
);

export default DashboardCarousel;
