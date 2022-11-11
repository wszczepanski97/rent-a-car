import { PhotoProps } from "ui/atoms/photo/photo.props";
import { CardParagraphProps } from "ui/molecules/card/components/cardparagraph/cardparagraph.props";
import { CardTitleProps } from "ui/molecules/card/components/cardtitle/cardtitle.props";

export type SolutionsCardProps = {
  photoProps: PhotoProps;
  paragraphProps: CardParagraphProps;
  titleProps: CardTitleProps;
};
