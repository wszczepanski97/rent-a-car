import { SidebarContext } from "contexts/sidebar.context";
import { WithoutFooterLayout } from "layouts/withoutfooter.layout";
import Head from "next/head";
import Carousel from "re-carousel";
import { useContext, useState } from "react";
import { MyRentalsPageProps } from "templates/client/myrentals/myrentals.props";
import IndicatorDots from "templates/coordinator/mydepartment/ui/mydepartmentcarousel/indicatordots.component";
import KeyboardNavigator from "templates/coordinator/mydepartment/ui/mydepartmentcarousel/keyboardnavigator.component";
import { NextPageWithLayout } from "types/next";
import Modal from "./components/modal/modal.component";
import RentalSection from "./components/rentalsection/rentalsection.component";

const MyRentalsPage: NextPageWithLayout<MyRentalsPageProps> = ({
  futurerentals,
  pastrentals,
}) => {
  const { open } = useContext(SidebarContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteRentDetails, setDeleteRentDetails] = useState<{
    IdWypozyczenia: number;
    IdUslugi: number;
  } | null>(null);
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
          <RentalSection
            title="Obecne wypożyczenia"
            rentals={futurerentals}
            setModalOpen={setModalOpen}
            setDeleteRentDetails={setDeleteRentDetails}
          />
          <RentalSection
            title="Przeszłe wypożyczenia"
            rentals={pastrentals}
            setModalOpen={setModalOpen}
            past
          />
        </Carousel>
        {modalOpen && (
          <Modal
            setModalOpen={setModalOpen}
            deleteRentDetails={deleteRentDetails}
          />
        )}
      </div>
    </>
  );
};

MyRentalsPage.getLayout = WithoutFooterLayout;

export default MyRentalsPage;
