import { WithoutFooterLayout } from "layouts/withoutfooter.layout";
import { NextPage } from "next";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarDetailsSection from "templates/common/car/components/cardetailssection";
import { NextPageWithLayout } from "types/next";
import { CarPageProps } from "./types/car.props";

const CarPage: NextPageWithLayout<CarPageProps> = ({ car }) => (
  <CarDetailsSection car={car} />
);

CarPage.getLayout = WithoutFooterLayout;

export default CarPage;
