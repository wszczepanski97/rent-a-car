import Link from "next/link";
import { FC } from "react";

const PageTitle: FC = () => (
  <Link href="/">
    <h3
      style={{
        color: "var(--light-text-color)",
        fontSize: 20,
        fontWeight: 600,
        margin: 0,
        cursor: "pointer",
      }}
    >
      Car Rental
    </h3>
  </Link>
);

export default PageTitle;
