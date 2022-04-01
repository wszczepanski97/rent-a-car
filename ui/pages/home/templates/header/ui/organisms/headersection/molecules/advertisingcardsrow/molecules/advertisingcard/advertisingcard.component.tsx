import { FC } from "react";
import {
  Card,
  CardParagraphProps,
  CardTitleProps,
} from "../../../../../../../../../../../common";
import styles from "./advertisingcard.module.scss";

const AdvertisingCard: FC<AdvertisingCardProps> = ({
  blue = false,
  titleProps,
  paragraphProps,
}: AdvertisingCardProps) => {
  const color = blue ? "var(--light-text-color)" : undefined;
  const backgroundColor = blue
    ? "var(--secondary-color-1)"
    : "var(--light-background-color)";
  const src = blue
    ? "/images/SettingsIconWhite.svg"
    : "/images/SettingsIconBlue.svg";
  const paddingRight = blue ? "0" : "40";
  return (
    <Card
      className={styles.advertisingCard}
      style={{ backgroundColor, paddingRight }}
      photoProps={{
        src,
        alt: "SettingsIcon",
        size: { height: "48", width: "48" },
      }}
      titleProps={{ ...titleProps, color }}
      paragraphProps={{ ...paragraphProps, color }}
    />
  );
};

type AdvertisingCardProps = {
  blue?: boolean;
  titleProps: CardTitleProps;
  paragraphProps: CardParagraphProps;
};

export default AdvertisingCard;
