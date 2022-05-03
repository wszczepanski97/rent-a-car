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
  CardDetailsProps,
  CardDetails,
} from "./ui";

const Card: FC<CardProps> = ({
  children,
  className,
  style,
  buttonProps,
  detailsProps,
  paragraphProps,
  photoProps,
  secondButtonProps,
  titleProps,
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
  ) : type === CardType.WITH_BUTTON ? (
    <div style={style} className={className}>
      {photoProps && <CardPhoto {...photoProps} />}
      {paragraphProps && <CardParagraph {...paragraphProps} />}
      {titleProps && <CardTitle {...titleProps} />}
      {buttonProps && <CardButton {...buttonProps} />}
    </div>
  ) : type === CardType.CAR_CARD ? (
    <div style={style} className={className}>
      {titleProps && <CardTitle {...titleProps} />}
      {photoProps && <CardPhoto {...photoProps} />}
      {paragraphProps && <CardParagraph {...paragraphProps} />}
      {detailsProps && <CardDetails {...detailsProps} />}
      {buttonProps && <CardButton {...buttonProps} />}
      {secondButtonProps && <CardButton {...secondButtonProps} />}
    </div>
  ) : (
    <div style={style} className={className}>
      {children}
    </div>
  );

export type CardProps = {
  className?: string;
  style?: CSSProperties;
  type?: CardType;
  buttonProps?: CardButtonProps;
  detailsProps?: CardDetailsProps;
  paragraphProps?: CardParagraphProps;
  photoProps?: PhotoProps;
  secondButtonProps?: CardButtonProps;
  titleProps?: CardTitleProps;
};

export enum CardType {
  DEFAULT = "DEFAULT",
  PHOTO_LAST = "PHOTO_LAST",
  PHOTO_SINGLE_COLUMN = "PHOTO_SINGLE_COLUMN",
  WITH_BUTTON = "WITH_BUTTON",
  CAR_CARD = "CAR_CARD",
  CUSTOM = "CUSTOM",
}

export {
  type CardParagraphProps,
  type CardTitleProps,
  type CardButtonProps,
  type CardDetailsProps,
};

export default Card;
