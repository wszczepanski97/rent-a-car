import { FC } from "react";
import { Heading, Link } from "ui";
import styles from "./cardbutton.module.scss";

const CardButton: FC<CardButtonProps> = (props) => {
  return props.type === CardButtonType.CardButtonWithBG ? (
    <button
      className={styles.cardButton}
      style={{
        backgroundColor: props.bgColor,
        border: 0,
        pointerEvents: props.href ? "auto" : "none",
        cursor: props.href ? "pointer" : "none",
      }}
    >
      <Heading
        text={props.buttonText}
        as="h6"
        style={{
          color: props.textColor,
        }}
      />
    </button>
  ) : (
    <button
      className={styles.cardButton}
      style={{
        color: props.color,
        border: `1px solid ${props.color}`,
        backgroundColor: "transparent",
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
  textColor: string;
  href?: string;
};

type CardButtonWithoutBGProps = {
  type: CardButtonType.CardButtonWithoutBG;
  buttonText: string;
  color?: string;
  href?: string;
};

export type CardButtonProps = CardButtonWithBGProps | CardButtonWithoutBGProps;

export default CardButton;
