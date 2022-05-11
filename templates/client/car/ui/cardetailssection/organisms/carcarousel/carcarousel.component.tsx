import React, { FC } from "react";
import { Carousel } from "react-responsive-carousel";
import styles from "./carcarousel.module.scss";

type CarCarouselProps = {
  photos: string;
};

const CarCarousel: FC<CarCarouselProps> = ({ photos }) => (
  <div className={styles.carCarouselWrapper}>
    <Carousel autoPlay showThumbs useKeyboardArrows infiniteLoop>
      {photos.split(";").map((photo) => (
        <div>
          <img alt={photo} src={photo} />
        </div>
      ))}
    </Carousel>
  </div>
);

export default CarCarousel;
