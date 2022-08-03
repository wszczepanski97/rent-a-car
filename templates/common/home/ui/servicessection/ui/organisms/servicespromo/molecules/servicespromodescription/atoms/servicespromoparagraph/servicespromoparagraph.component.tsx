import { FC } from "react";
import { Card, CardType } from "ui";

const ServicesPromoParagraph: FC = () => (
  <>
    <Card
      photoProps={{
        src: "/images/PeopleBlueSmall.svg",
        alt: "PeopleBlueSmall",
        size: { height: "32", width: "32" },
      }}
      titleProps={{
        title: `szybki lis przeskakuje nad leniwym psem`,
        as: "h5",
        color: "var(--light-text-color)",
      }}
      paragraphProps={{
        paragraphText: `Rzeczy na bardzo małą skalę`,
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
        title: `szybki lis przeskakuje nad leniwym psem`,
        as: "h5",
        color: "var(--light-text-color)",
      }}
      paragraphProps={{
        paragraphText: `Rzeczy na bardzo małą skalę`,
        as: "h6",
        color: "var(--light-text-color)",
      }}
      type={CardType.PHOTO_SINGLE_COLUMN}
      style={{ gap: "20px" }}
    />
  </>
);

export default ServicesPromoParagraph;
