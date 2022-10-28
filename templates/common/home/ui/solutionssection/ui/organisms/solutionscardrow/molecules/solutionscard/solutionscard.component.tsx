import classNames from "classnames";
import { FC } from "react";
import {
  Card,
  CardParagraphProps,
  CardTitleProps,
  CardType,
  PhotoProps,
} from "ui";
import styles from "./solutionscard.module.scss";

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
      // "animate__pulse",
      "animate__infinite",
      "animate__slower",
      "animate__delay-2s"
    )}
    photoProps={{
      ...photoProps,
      size: { height: "159", width: "230" },
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

type SolutionsCardProps = {
  photoProps: PhotoProps;
  paragraphProps: CardParagraphProps;
  titleProps: CardTitleProps;
};

export default SolutionsCard;
