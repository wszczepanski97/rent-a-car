import { FullScreenContext } from "contexts/full-screen.context";
import { SidebarContext } from "contexts/sidebar.context";
import { FC, useContext } from "react";
import { CarPageProps } from "templates/common/car/types/car.props";
import RentCard from "./components/rentcard";

const RentSection: FC<CarPageProps> = ({ car, additionalRentOptions }) => {
  const { open } = useContext(SidebarContext);
  const {
    screen: { active },
  } = useContext(FullScreenContext);
  return (
    <section
      style={{
        height: open
          ? "100vh"
          : active
          ? "80vh"
          : "calc(100vh - var(--navbar-height))",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: open ? 80 : 0,
        width: "100%",
      }}
    >
      <RentCard car={car} additionalRentOptions={additionalRentOptions} />
    </section>
  );
};

export default RentSection;
