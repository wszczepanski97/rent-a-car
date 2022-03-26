import { StatsCard } from "./molecules";
import { CardRow } from "../../../../../../../common";
import styles from "./statscardrow.module.css";

const StatsCardRow = () => (
  <CardRow className={styles.statsCardRow_Container}>
    <StatsCard
      photoProps={{
        src: "/images/People.svg",
        alt: "People",
      }}
      paragraphProps={{ paragraphText: "People lend cars" }}
      titleProps={{ title: "300K" }}
    />
    <StatsCard
      photoProps={{
        src: "/images/LineChart.svg",
        alt: "LineChart",
      }}
      paragraphProps={{ paragraphText: "Happy Customers" }}
      titleProps={{ title: "92%" }}
    />
    <StatsCard
      photoProps={{
        src: "/images/Award.svg",
        alt: "Award",
      }}
      paragraphProps={{ paragraphText: "Award Winning" }}
      titleProps={{ title: "23" }}
    />
    <StatsCard
      photoProps={{
        src: "/images/Baggage.svg",
        alt: "Baggage",
      }}
      paragraphProps={{ paragraphText: "Car rentals" }}
      titleProps={{ title: "45" }}
    />
  </CardRow>
);

export default StatsCardRow;
