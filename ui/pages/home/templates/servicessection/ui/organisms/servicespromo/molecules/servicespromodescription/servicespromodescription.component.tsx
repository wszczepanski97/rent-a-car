import { ServicesPromoArticle } from "./atoms";
import ServicesPromoParagraph from "./atoms/servicespromoparagraph/servicespromoparagraph.component";

const ServicesPromoDescription = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}
  >
    <ServicesPromoArticle />
    <ServicesPromoParagraph />
  </div>
);

export default ServicesPromoDescription;
