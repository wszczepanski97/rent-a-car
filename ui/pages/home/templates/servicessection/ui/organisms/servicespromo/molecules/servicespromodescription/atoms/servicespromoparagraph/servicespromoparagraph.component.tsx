import { FC } from "react";
import { Card, CardType } from "../../../../../../../../../../../common";

const ServicesPromoParagraph: FC = () => (
  <>
    <Card
      photoProps={{
        src: "/images/PeopleBlueSmall.svg",
        alt: "PeopleBlueSmall",
        size: { height: "32", width: "32" },
      }}
      titleProps={{
        title: `the quick fox jumps over the lazy 
      dog`,
        as: "h5",
        color: "var(--light-text-color)",
      }}
      paragraphProps={{
        paragraphText: `Things on a very small scale`,
        as: "h6",
        color: "var(--light-text-color)",
      }}
      type={CardType.PHOTO_SINGLE_COLUMN}
      style={{ gap: "20px" }}
    />
    <Card
      photoProps={{
        src: "/images/Speedometer.svg",
        alt: "Speedometer",
        size: { height: "32", width: "32" },
      }}
      titleProps={{
        title: `the quick fox jumps over the lazy 
    dog`,
        as: "h5",
        color: "var(--light-text-color)",
      }}
      paragraphProps={{
        paragraphText: `Things on a very small scale`,
        as: "h6",
        color: "var(--light-text-color)",
      }}
      type={CardType.PHOTO_SINGLE_COLUMN}
      style={{ gap: "20px" }}
    />
  </>
);

export default ServicesPromoParagraph;
