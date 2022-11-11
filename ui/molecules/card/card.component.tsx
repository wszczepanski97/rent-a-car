import { FC } from "react";
import { CardProps } from "ui/molecules/card/card.props";
import { CardType } from "ui/molecules/card/cardtype.enum";
import CardButton from "./components/cardbutton/cardbutton.component";
import CardDetails from "./components/carddetails/carddetails.component";
import CardParagraph from "./components/cardparagraph/cardparagraph.component";
import CardPhoto from "./components/cardphoto/cardphoto.component";
import CardTitle from "./components/cardtitle/cardtitle.component";

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

export default Card;
