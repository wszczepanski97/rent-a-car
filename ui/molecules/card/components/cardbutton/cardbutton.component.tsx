import { FC } from "react";
import Heading from "ui/atoms/heading";
import Link from "ui/atoms/link";
import styles from "./cardbutton.module.scss";
import { CardButtonProps } from "./cardbutton.props";
import { CardButtonType } from "./cardbuttontype.enum";

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
        cursor: props.href ? "pointer" : "default",
        padding: props.href ? 0 : "10px 20px",
      }}
    >
      {props.href ? (
        <Link
          name={props.buttonText}
          href={props.href}
          color={props.color}
          style={{
            height: "100%",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
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

export default CardButton;
