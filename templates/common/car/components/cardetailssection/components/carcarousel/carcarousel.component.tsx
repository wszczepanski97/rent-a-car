import { FC } from "react";
import { Carousel } from "react-responsive-carousel";
import styles from "./carcarousel.module.scss";
import { CarCarouselProps } from "./carcarousel.props";

const CarCarousel: FC<CarCarouselProps> = ({ photos }) => (
  <div className={styles.carCarouselWrapper}>
    <Carousel autoPlay showThumbs useKeyboardArrows infiniteLoop>
      {photos.split(";").map((photo, index) => (
        <div key={`car-carousel-photo-${index}`}>
          <img alt={photo} src={photo} />
        </div>
      ))}
    </Carousel>
  </div>
);

export default CarCarousel;
