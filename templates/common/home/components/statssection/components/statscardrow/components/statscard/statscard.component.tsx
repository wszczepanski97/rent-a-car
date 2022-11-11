import type { FC } from "react";
import Card from "ui/molecules/card";
import styles from "./statscard.module.scss";
import { StatsCardProps } from "./statscard.props";

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

export default StatsCard;
