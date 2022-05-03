import { FC } from "react";
import {
  Card,
  CardDetailsProps,
  CardParagraphProps,
  CardTitleProps,
  CardType,
  PhotoProps,
} from "ui";
import { CardButtonType } from "ui/common/molecules/card/ui/atoms/cardbutton/cardbutton.component";
import styles from "./carcard.module.scss";

const CarCard: FC<CarCardProps> = ({
  photoProps,
  detailsProps,
  paragraphProps,
  titleProps,
  carId,
}) => (
  <Card
    className={styles.carCard}
    photoProps={{
      ...photoProps,
      size: { height: "159", width: "230" },
    }}
    detailsProps={{
      ...detailsProps,
    }}
    paragraphProps={{
      ...paragraphProps,
      as: "p",
    }}
    titleProps={{
      ...titleProps,
      as: "h5",
    }}
    buttonProps={{
      type: CardButtonType.CardButtonWithBG,
      buttonText: "Lend",
      bgColor: "var(--login-button-background)",
      textColor: "var(--light-text-color)",
    }}
    secondButtonProps={{
      type: CardButtonType.CardButtonWithoutBG,
      buttonText: "Details",
      color: "var(--primary-color)",
      href: `/cars/${carId}`,
    }}
    type={CardType.CAR_CARD}
  />
);

type CarCardProps = {
  photoProps: PhotoProps;
  detailsProps: CardDetailsProps;
  paragraphProps: CardParagraphProps;
  titleProps: CardTitleProps;
  carId: number;
};

export default CarCard;
