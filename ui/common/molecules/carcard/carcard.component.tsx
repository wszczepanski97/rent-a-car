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
  withoutBtns,
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
    paragraphProps={
      paragraphProps && {
        ...paragraphProps,
        as: "p",
      }
    }
    titleProps={{
      ...titleProps,
      as: "h5",
    }}
    buttonProps={
      !withoutBtns
        ? {
            type: CardButtonType.CardButtonWithBG,
            buttonText: "Lend",
            bgColor: "var(--login-button-background)",
            color: "var(--light-text-color)",
            href: `klient/rent/${carId}`,
          }
        : undefined
    }
    secondButtonProps={
      !withoutBtns
        ? {
            type: CardButtonType.CardButtonWithoutBG,
            buttonText: "Details",
            color: "var(--primary-color)",
            href: `/cars/${carId}`,
          }
        : undefined
    }
    type={CardType.CAR_CARD}
  />
);

type CarCardProps = {
  carId?: number;
  detailsProps: CardDetailsProps;
  paragraphProps?: CardParagraphProps;
  photoProps: PhotoProps;
  titleProps: CardTitleProps;
  withoutBtns?: boolean;
};

export default CarCard;
