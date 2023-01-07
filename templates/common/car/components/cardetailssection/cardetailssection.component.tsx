import { SidebarContext } from "contexts/sidebar.context";
import { FC, useContext } from "react";
import { CarPageProps } from "templates/common/car/types/car.props";
import CarCard from "./components/carcard";

const CarDetailsSection: FC<Pick<CarPageProps, "car">> = ({ car }) => {
  const { open } = useContext(SidebarContext);
  return (
    <section
      style={{
        height: open ? "100vh" : "calc(100vh - var(--navbar-height))",
        paddingTop: open ? 50 : 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <CarCard car={car} />
    </section>
  );
};

export default CarDetailsSection;
