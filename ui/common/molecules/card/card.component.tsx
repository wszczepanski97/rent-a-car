import { CSSProperties } from "react";
import {
  CardPhoto,
  CardPhotoProps,
  CardParagraph,
  CardParagraphProps,
  CardTitle,
  CardTitleProps,
} from "./atoms";
import CardButton, {
  CardButtonProps,
} from "./atoms/cardbutton/cardbutton.component";

export enum CardType {
  DEFAULT = "default",
  PHOTO_LAST = "PHOTO_LAST",
  PHOTO_SINGLE_COLUMN = "PHOTO_SINGLE_COLUMN",
  WITH_BUTTON = "withbutton",
}

const Card = ({
  className,
  style,
  photoProps,
  titleProps,
  paragraphProps,
  buttonProps,
  type = CardType.DEFAULT,
}: CardProps) =>
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
  photoProps?: CardPhotoProps;
  titleProps?: CardTitleProps;
  paragraphProps?: CardParagraphProps;
  buttonProps?: CardButtonProps;
  type?: CardType;
};

export default Card;
export { type CardPhotoProps, type CardParagraphProps, type CardTitleProps };
