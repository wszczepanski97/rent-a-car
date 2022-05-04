import { FC } from "react";
import { CardRow } from "ui";

const CarsCardContainer: FC = ({ children }) => (
  <CardRow style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
    {children}
  </CardRow>
);

export default CarsCardContainer;
