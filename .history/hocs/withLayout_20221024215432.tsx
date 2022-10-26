import type { ReactElement } from "react";
import { AppPropsWithLayout } from "types/next";
import { Footer, Layout, Navbar, Sidebar } from "ui";

const withDefaultLayout = (page: ReactElement) => (
  <>
    <main
      style={{
        display: "grid",
        gridTemplateColumns: "15em 1fr",
        maxWidth: "100em",
        width: "90%",
        margin: "0 auto",
      }}
    >
      <Sidebar />
      <Layout>
        <Navbar />
        {page}
      </Layout>
    </main>
    <Footer />
  </>
);

const withLayout = ({ Component, pageProps }: AppPropsWithLayout) =>
  Component.getLayout
    ? Component.getLayout(<Component {...pageProps} />)
    : withDefaultLayout(<Component {...pageProps} />);

export default withLayout;
