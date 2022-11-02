import { CSSProperties, FC } from "react";
import { Heading, Link } from "ui";
import styles from "./cardbutton.module.scss";

const CardButton: FC<CardButtonProps> = (props) => {
  const buttonStyle =
    props.type === CardButtonType.CardButtonWithBG
      ? {
          backgroundColor: props.bgColor,
          border: 0,
        }
      : {
          color: props.color,
          border: `1px solid ${props.color}`,
          backgroundColor: "transparent",
        };
  return (
    <button
      className={styles.cardButton}
      style={{
        ...buttonStyle,
        ...props.style,
        pointerEvents: props.href ? "auto" : "none",
        cursor: props.href ? "pointer" : "none",
      }}
    >
      {props.href ? (
        <Link name={props.buttonText} href={props.href} color={props.color} />
      ) : (
        <Heading
          text={props.buttonText}
          as="h6"
          style={{ color: props.color }}
        />
      )}
    </button>
  );
};

export enum CardButtonType {
  CardButtonWithBG = "CardButtonWithBG",
  CardButtonWithoutBG = "CardButtonWithoutBG",
}

type CardButtonWithBGProps = {
  type: CardButtonType.CardButtonWithBG;
  buttonText: string;
  bgColor: string;
  color: string;
  href?: string;
  style?: CSSProperties;
};

type CardButtonWithoutBGProps = {
  type: CardButtonType.CardButtonWithoutBG;
  buttonText: string;
  color?: string;
  href?: string;
  style?: CSSProperties;
};

export type CardButtonProps = CardButtonWithBGProps | CardButtonWithoutBGProps;

export default CardButton;
