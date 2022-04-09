import { CSSProperties, FC } from "react";
import { PhotoProps } from "ui";
import {
  CardPhoto,
  CardParagraph,
  CardParagraphProps,
  CardTitle,
  CardTitleProps,
  CardButton,
  CardButtonProps,
} from "./ui";

const Card: FC<CardProps> = ({
  className,
  style,
  photoProps,
  titleProps,
  paragraphProps,
  buttonProps,
  type = CardType.DEFAULT,
}) =>
  type === CardType.DEFAULT ? (
    <div style={style} className={className}>
      {photoProps && <CardPhoto {...photoProps} />}
      {titleProps && <CardTitle {...titleProps} />}
      {paragraphProps && <CardParagraph {...paragraphProps} />}
    </div>
  ) : type === CardType.PHOTO_LAST ? (
    <div style={style} className={className}>
      {titleProps && <CardTitle {...titleProps} />}
      {paragraphProps && <CardParagraph {...paragraphProps} />}
      {photoProps && <CardPhoto {...photoProps} />}
    </div>
  ) : type === CardType.PHOTO_SINGLE_COLUMN ? (
    <div style={{ display: "flex", ...style }} className={className}>
      {photoProps && <CardPhoto {...photoProps} />}
      <div>
        {titleProps && <CardTitle {...titleProps} />}
        {paragraphProps && <CardParagraph {...paragraphProps} />}
      </div>
    </div>
  ) : (
    <div style={style} className={className}>
      {photoProps && <CardPhoto {...photoProps} />}
      {paragraphProps && <CardParagraph {...paragraphProps} />}
      {titleProps && <CardTitle {...titleProps} />}
      {buttonProps && <CardButton {...buttonProps} />}
    </div>
  );

export type CardProps = {
  className?: string;
  style?: CSSProperties;
  photoProps?: PhotoProps;
  titleProps?: CardTitleProps;
  paragraphProps?: CardParagraphProps;
  buttonProps?: CardButtonProps;
  type?: CardType;
};

export enum CardType {
  DEFAULT = "DEFAULT",
  PHOTO_LAST = "PHOTO_LAST",
  PHOTO_SINGLE_COLUMN = "PHOTO_SINGLE_COLUMN",
  WITH_BUTTON = "WITH_BUTTON",
}

export { type CardParagraphProps, type CardTitleProps, type CardButtonProps };

export default Card;
