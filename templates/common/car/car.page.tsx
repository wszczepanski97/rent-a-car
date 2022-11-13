import { NextPage } from "next";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarDetailsSection from "templates/common/car/components/cardetailssection";
import { CarPageProps } from "./types/car.props";

const CarPage: NextPage<CarPageProps> = ({ car }) => (
  <CarDetailsSection car={car} />
);

export default CarPage;
