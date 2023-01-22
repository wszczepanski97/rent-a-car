import { FC } from "react";
import { RentalSectionProps } from "templates/client/myrentals/components/rentalsection/rentalsection.props";
import ServicesGridCardInfo from "templates/driver/dashboard/components/servicesgrid/components/servicesgridcard/components/servicesgridcardinfo/servicesgridcardinfo.component";
import Link from "ui/atoms/link";
import Card from "ui/molecules/card";
import { CardType } from "ui/molecules/card/cardtype.enum";
import RentalCardTitle from "./components/rentalcardtitle";
import RentalTable from "./components/rentaltable";
import styles from "./rentalcard.module.scss";

const RentalCard: FC<RentalSectionProps> = ({
  rentals,
  title,
  past,
  setModalOpen,
  setDeleteRentDetails,
}) => (
  <Card
    type={CardType.CUSTOM}
    className={styles.rentalCard}
    style={{ marginBottom: 50 }}
  >
    <RentalCardTitle title={title} />
    {rentals.length > 0 ? (
      <RentalTable
        rentals={rentals}
        past={past}
        setModalOpen={setModalOpen}
        setDeleteRentDetails={setDeleteRentDetails}
      />
    ) : (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 100,
        }}
      >
        {past ? (
          <ServicesGridCardInfo statement="Nie wypożyczyłeś jeszcze żadnego auta!" />
        ) : (
          <ServicesGridCardInfo statement="W tym momencie nie masz żadnych aktywnych wypożyczeń!" />
        )}
        <h5>
          Jeżeli chcesz wypożyczyć auto przejdź pod ten{" "}
          <Link
            href="/client/rent"
            name="link"
            color="red"
            as="span"
            style={{ cursor: "pointer" }}
          >
            link
          </Link>
          <br />
          lub skorzystaj z zakładki <u>"Wypożycz auto"</u> z menu.
        </h5>
      </div>
    )}
  </Card>
);

export default RentalCard;
