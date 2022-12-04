import { SidebarContext } from "contexts/sidebar.context";
import { WithoutFooterLayout } from "layouts/withoutfooter.layout";
import Head from "next/head";
import Carousel from "re-carousel";
import { useContext } from "react";
import { MyRentalsPageProps } from "templates/client/myrentals/myrentals.props";
import IndicatorDots from "templates/coordinator/mydepartment/ui/mydepartmentcarousel/indicatordots.component";
import KeyboardNavigator from "templates/coordinator/mydepartment/ui/mydepartmentcarousel/keyboardnavigator.component";
import { NextPageWithLayout } from "types/next";
import RentalSection from "./components/rentalsection/rentalsection.component";

const MyRentalsPage: NextPageWithLayout<MyRentalsPageProps> = ({
  futurerentals,
  pastrentals,
}) => {
  const { open } = useContext(SidebarContext);
  return (
    <>
      <Head>
        <title>Moje wypożyczenia</title>
      </Head>
      <div
        id="myRentalsCarousel"
        style={{
          height: open ? "100vh" : "calc(100vh - var(--navbar-height))",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Carousel widgets={[KeyboardNavigator, IndicatorDots]} duration={150}>
          <RentalSection title="Obecne wypożyczenia" rentals={futurerentals} />
          <RentalSection
            title="Przeszłe wypożyczenia"
            rentals={pastrentals}
            past
          />
        </Carousel>
      </div>
    </>
  );
};

MyRentalsPage.getLayout = WithoutFooterLayout;

export default MyRentalsPage;
