import { ReactElement } from "react";

export const DashboardLayout = (page: ReactElement) => (
  <>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: "0 auto",
        background:
          "url(/images/Background.webp) no-repeat center center fixed",
        backgroundSize: "cover",
        boxShadow: "inset 0 0 0 2000px rgb(0 0 0 / 50%)",
        minHeight: "100vh",
      }}
    >
      {page}
    </div>
  </>
);
