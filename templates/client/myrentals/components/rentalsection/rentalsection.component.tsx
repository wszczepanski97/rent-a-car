import { SidebarContext } from "contexts/sidebar.context";
import { FC, useContext } from "react";
import { RentalSectionProps } from "templates/client/myrentals/components/rentalsection/rentalsection.props";
import RentalCard from "./components/rentalcard";

const RentalSection: FC<RentalSectionProps> = ({
  rentals,
  title,
  setModalOpen,
  setDeleteRentDetails,
  past = false,
}) => {
  const { open } = useContext(SidebarContext);
  return (
    <section
      data-carousel={title}
      style={{
        paddingTop: open ? 90 : 0,
      }}
    >
      <RentalCard
        rentals={rentals}
        title={title}
        past={past}
        setModalOpen={setModalOpen}
        setDeleteRentDetails={setDeleteRentDetails}
      />
    </section>
  );
};

export default RentalSection;
