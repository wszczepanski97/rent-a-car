import { FC } from "react";
import {
  Card,
  CardParagraphProps,
  CardTitleProps,
  CardType,
  PhotoProps,
} from "ui";
import styles from "./solutionscard.module.scss";

const SolutionsCard: FC<SolutionsCardProps> = ({
  photoProps,
  paragraphProps,
  titleProps,
}) => (
  <Card
    className={styles.solutionsCard}
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
