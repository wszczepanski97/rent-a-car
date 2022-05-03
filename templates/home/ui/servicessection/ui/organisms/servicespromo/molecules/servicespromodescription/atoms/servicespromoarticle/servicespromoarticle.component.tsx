import { FC } from "react";
import { Article } from "ui";

const ServicesPromoArticle: FC = () => (
  <Article
    titleProps={{
      title: `Most trusted in
      our field`,
      lowerCase: true,
      as: "h2",
    }}
    paragraphProps={{
      paragraphText: `Most calendars are designed for teams. Slate
        is designed for freelancers who want a
        simple way to plan their schedule.`,
      as: "p",
    }}
    style={{
      maxWidth: "333px",
    }}
  />
);

export default ServicesPromoArticle;
