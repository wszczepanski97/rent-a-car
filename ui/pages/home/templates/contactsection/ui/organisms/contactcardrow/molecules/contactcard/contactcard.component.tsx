import { FC } from "react";
import {
  Card,
  CardParagraphProps,
  CardPhotoProps,
  CardTitleProps,
} from "../../../../../../../../../common";
import { CardButtonProps } from "../../../../../../../../../common/molecules/card/ui/atoms/cardbutton/cardbutton.component";
import { CardType } from "../../../../../../../../../common/molecules/card/card.component";
import styles from "./contactcard.module.scss";

const ContactCard: FC<ContactCardProps> = ({
  blue = false,
  photoProps,
  titleProps,
  paragraphProps,
  buttonProps,
}) => {
  const color = blue ? "var(--light-text-color)" : "var(--text-color)";
  const backgroundColor = blue
    ? "var(--secondary-color-1)"
    : "var(--light-background-color)";
  const height = blue ? "369px" : "309px";
  const padding = blue ? "80px 40px" : "50px 40px";
  return (
    <Card
      className={styles.contactCard}
      style={{ backgroundColor, height, padding }}
      photoProps={{ size: { height: "72", width: "72" }, ...photoProps }}
      titleProps={{ ...titleProps, as: "h5", color }}
      paragraphProps={{ ...paragraphProps, as: "h6", color }}
      buttonProps={{
        ...buttonProps,
        color: blue ? "var(--light-text-color)" : undefined,
      }}
      type={CardType.WITH_BUTTON}
    />
  );
};

type ContactCardProps = {
  blue?: boolean;
  photoProps: CardPhotoProps;
  titleProps: CardTitleProps;
  paragraphProps: CardParagraphProps;
  buttonProps: CardButtonProps;
};

export default ContactCard;
