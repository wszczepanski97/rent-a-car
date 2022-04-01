import { FC } from "react";
import {
  Card,
  CardPhotoProps,
  CardParagraphProps,
  CardTitleProps,
} from "../../../../../../../../../common";
import styles from "./statscard.module.scss";

const StatsCard: FC<StatsCardProps> = ({
  photoProps,
  paragraphProps,
  titleProps,
}) => (
  <Card
    className={styles.statsCard}
    photoProps={{
      ...photoProps,
      size: { height: "48", width: "48" },
    }}
    paragraphProps={{
      ...paragraphProps,
      as: "h5",
      style: { textTransform: "uppercase" },
    }}
    titleProps={{
      ...titleProps,
      as: "h2",
      style: { textTransform: "uppercase" },
    }}
  />
);

type StatsCardProps = {
  photoProps: CardPhotoProps;
  paragraphProps: CardParagraphProps;
  titleProps: CardTitleProps;
};

export default StatsCard;
