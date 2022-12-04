import type { FC } from "react";

const RentalCardTitle: FC<{ title: string }> = ({ title }) => (
  <h2 style={{ textAlign: "center", color: "var(--text-color)" }}>{title}</h2>
);

export default RentalCardTitle;
