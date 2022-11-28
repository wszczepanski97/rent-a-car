import classNames from "classnames";
import type { FC } from "react";
import Card from "ui/molecules/card";
import { CardType } from "ui/molecules/card/cardtype.enum";
import styles from "./solutionscard.module.scss";
import { SolutionsCardProps } from "./solutionscard.props";

const cx = classNames.bind(styles);

const SolutionsCard: FC<SolutionsCardProps> = ({
  photoProps,
  paragraphProps,
  titleProps,
}) => (
  <Card
    className={cx(
      styles.solutionsCard,
      "btn-text",
      "animate__animated",
      "animate__infinite",
      "animate__slower",
      "animate__delay-2s"
    )}
    photoProps={{
      ...photoProps,
      size: { height: "118", width: "180" },
    }}
    paragraphProps={{
      ...paragraphProps,
      as: "p",
    }}
    titleProps={{
      ...titleProps,
      as: "h5",
    }}
    type={CardType.PHOTO_LAST}
  />
);

export default SolutionsCard;
