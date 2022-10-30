import { FC } from "react";
import { Heading } from "ui";

const PageTitle: FC = () => (
  <Heading
    style={{
      color: "var(--light-text-color)",
      fontSize: 20,
      fontWeight: 600,
      margin: 0,
    }}
    text="Car Rental"
  />
);

export default PageTitle;
