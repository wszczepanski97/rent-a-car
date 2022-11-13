import type { FC } from "react";
import Card from "ui/molecules/card";
import { CardType } from "ui/molecules/card/cardtype.enum";
import { CardButtonType } from "ui/molecules/card/components/cardbutton/cardbuttontype.enum";
import styles from "./carcard.module.scss";
import { CarCardProps } from "./carcard.props";

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
            buttonText: "Wypożycz",
            bgColor: "var(--login-button-background)",
            color: "var(--light-text-color)",
            href: `/client/rent/${carId}`,
          }
        : undefined
    }
    secondButtonProps={
      !withoutBtns
        ? {
            type: CardButtonType.CardButtonWithoutBG,
            buttonText: "Szczegóły",
            color: "var(--primary-color)",
            href: `/car/${carId}`,
          }
        : undefined
    }
    type={CardType.CAR_CARD}
  />
);

export default CarCard;
