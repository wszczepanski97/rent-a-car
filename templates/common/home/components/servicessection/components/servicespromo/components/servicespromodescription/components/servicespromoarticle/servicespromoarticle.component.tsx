import type { FC } from "react";
import Article from "ui/molecules/article";

const ServicesPromoArticle: FC = () => (
  <Article
    titleProps={{
      title: `Najbardziej zaufany`,
      lowerCase: true,
      as: "h2",
    }}
    paragraphProps={{
      paragraphText: `Większość kalendarzy jest przeznaczona dla zespołów. 
      Slate jest przeznaczony dla freelancerów, którzy chcą prostego sposobu na zaplanowanie swojego grafiku.`,
      as: "p",
    }}
    style={{
      maxWidth: "333px",
    }}
  />
);

export default ServicesPromoArticle;
