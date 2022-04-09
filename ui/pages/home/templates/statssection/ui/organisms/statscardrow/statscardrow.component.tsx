import { FC } from "react";
import { CardRow } from "ui";
import { StatsCard } from "./molecules";

const StatsCardRow: FC = () => (
  <CardRow>
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
