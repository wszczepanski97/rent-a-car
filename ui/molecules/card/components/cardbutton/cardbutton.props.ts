import { CSSProperties } from "react";
import { CardButtonType } from "./cardbuttontype.enum";

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
