import { PhotoProps } from "ui/atoms/photo/photo.props";
import { CardDetailsProps } from "../card/components/carddetails/carddetails.props";
import { CardParagraphProps } from "../card/components/cardparagraph/cardparagraph.props";
import { CardTitleProps } from "../card/components/cardtitle/cardtitle.props";

export type CarCardProps = {
  carId?: number;
  detailsProps: CardDetailsProps;
  paragraphProps?: CardParagraphProps;
  photoProps: PhotoProps;
  titleProps: CardTitleProps;
  withoutBtns?: boolean;
};
