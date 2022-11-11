import type { FC } from "react";
import CardRow from "ui/molecules/cardrow";
import StatsCard from "./components/statscard";

const StatsCardRow: FC = () => (
  <CardRow>
    <StatsCard
      photoProps={{
        src: "/images/People.svg",
        alt: "People",
      }}
      paragraphProps={{ paragraphText: "WYPOŻYCZEŃ" }}
      titleProps={{ title: "300K" }}
    />
    <StatsCard
      photoProps={{
        src: "/images/LineChart.svg",
        alt: "LineChart",
      }}
      paragraphProps={{ paragraphText: "SATYSFAKCJI" }}
      titleProps={{ title: "92%" }}
    />
    <StatsCard
      photoProps={{
        src: "/images/Award.svg",
        alt: "Award",
      }}
      paragraphProps={{ paragraphText: "LAURY JAKOŚCI" }}
      titleProps={{ title: "23" }}
    />
    <StatsCard
      photoProps={{
        src: "/images/Baggage.svg",
        alt: "Baggage",
      }}
      paragraphProps={{ paragraphText: "ODDZIAŁÓW" }}
      titleProps={{ title: "45" }}
    />
  </CardRow>
);

export default StatsCardRow;
