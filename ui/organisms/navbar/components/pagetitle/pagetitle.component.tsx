import { FC } from "react";
import Link from "ui/atoms/link";

const PageTitle: FC = () => (
  <Link
    href="/"
    as="h3"
    name="Car Rental"
    style={{
      color: "var(--light-text-color)",
      fontSize: 20,
      fontWeight: 600,
      margin: 0,
      cursor: "pointer",
    }}
  />
);

export default PageTitle;
