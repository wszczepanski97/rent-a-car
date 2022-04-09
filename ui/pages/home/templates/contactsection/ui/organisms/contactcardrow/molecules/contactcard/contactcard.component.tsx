import { FC } from "react";
import {
  Card,
  CardParagraphProps,
  CardTitleProps,
  CardButtonProps,
  CardType,
  PhotoProps,
} from "ui";
import styles from "./contactcard.module.scss";

const ContactCard: FC<ContactCardProps> = ({
  blue = false,
  photoProps,
  titleProps,
  paragraphProps,
  buttonProps,
}) => {
  const color = blue ? "var(--light-text-color)" : "var(--text-color)";
  const cardStyles = {
    backgroundColor: blue
      ? "var(--secondary-color-1)"
      : "var(--light-background-color)",
    height: blue ? "369px" : "309px",
    padding: blue ? "80px 40px" : "50px 40px",
  };
  return (
    <Card
      className={styles.contactCard}
      style={cardStyles}
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
  photoProps: PhotoProps;
  titleProps: CardTitleProps;
  paragraphProps: CardParagraphProps;
  buttonProps: CardButtonProps;
};

export default ContactCard;
