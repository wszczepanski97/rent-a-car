import { CSSProperties } from "react";
import { PhotoProps } from "ui/atoms/photo/photo.props";
import { CardType } from "./cardtype.enum";
import { CardButtonProps } from "./components/cardbutton/cardbutton.props";
import { CardDetailsProps } from "./components/carddetails/carddetails.props";
import { CardParagraphProps } from "./components/cardparagraph/cardparagraph.props";
import { CardTitleProps } from "./components/cardtitle/cardtitle.props";

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
