import { FC, useContext } from "react";
import { Carousel } from "react-responsive-carousel";
import { DashboardPageContext } from "templates/client/dashboard/context/dashboard.context";
import CarCard from "ui/molecules/carcard";
import { spliceIntoChunks } from "./dashboardcarousel.helper";
import styles from "./dashboardcarousel.module.scss";

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
      {spliceIntoChunks([...cars], 3).map((group, index) => (
        <div
          className={styles.dashboardCarouselItem}
          key={`dashboard-carousel-item-${index}`}
        >
          {group.map(
            (
              {
                Nadwozie,
                RodzajPaliwa,
                IloscMiejsc,
                Zdjecie,
                Nazwa,
                CenaZaGodzine,
                IdSamochody,
              },
              cardIndex
            ) => (
              <CarCard
                key={`dashboard-carousel-item-${index}-carcard-${cardIndex}`}
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
                  paragraphText: `Price: ${CenaZaGodzine}`,
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
