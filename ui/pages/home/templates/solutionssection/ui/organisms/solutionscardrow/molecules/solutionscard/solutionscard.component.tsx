import {
  Card,
  CardPhotoProps,
  CardParagraphProps,
  CardTitleProps,
} from "../../../../../../../../../common";
import { CardType } from "../../../../../../../../../common/molecules/card/card.component";
import styles from "./solutionscard.module.css";

const SolutionsCard = ({
  photoProps,
  paragraphProps,
  titleProps,
}: SolutionsCardProps) => (
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
  photoProps: CardPhotoProps;
  paragraphProps: CardParagraphProps;
  titleProps: CardTitleProps;
};

export default SolutionsCard;
