import React, { FC, useContext } from "react";
import { Carousel } from "react-responsive-carousel";
import { DashboardPageContext } from "templates/client/dashboard/contexts";
import { Cars } from "templates/common/types";
import { CarCard } from "ui";
import styles from "./dashboardcarousel.module.scss";

function spliceIntoChunks(arr: Cars[], chunkSize: number) {
  const res = [];
  while (arr.length > 0) {
    const chunk = arr.splice(0, chunkSize);
    res.push(chunk);
  }
  return res;
}

const DashboardCarousel: FC = () => {
  const cars = useContext(DashboardPageContext);
  return (
    <Carousel
      autoPlay
      infiniteLoop
      stopOnHover
      interval={6000}
      showIndicators={false}
      showArrows={false}
      showStatus={false}
      showThumbs={false}
      width={1050}
    >
      {spliceIntoChunks([...cars], 3).map((group) => (
        <div className={styles.dashboardCarouselItem}>
          {group.map(
            ({
              Nadwozie,
              RodzajPaliwa,
              IloscMiejsc,
              Zdjecie,
              Nazwa,
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
                  src: Zdjecie,
                  alt: Nazwa,
                }}
                paragraphProps={{
                  paragraphText: `Price: ${CenaZaDzien}`,
                }}
                titleProps={{ title: Nazwa }}
                carId={IdSamochody}
              />
            )
          )}
        </div>
      ))}
    </Carousel>
  );
};

export default DashboardCarousel;
