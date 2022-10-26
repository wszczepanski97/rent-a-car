import type { ReactElement } from "react";
import { AppPropsWithLayout } from "types/next";
import { Footer, Layout, Navbar, Sidebar } from "ui";

const withDefaultLayout = (page: ReactElement) => (
  <>
    <Sidebar />
    <Layout>
      <Navbar />
      <main style={display: grid;
    grid-template-columns: 1fr 15em;
    max-width: 100em;
    width: 90%;
    margin: 0 auto;}>{page}</main>
    </Layout>
    <Footer />
  </>
);

const withLayout = ({ Component, pageProps }: AppPropsWithLayout) =>
  Component.getLayout
    ? Component.getLayout(<Component {...pageProps} />)
    : withDefaultLayout(<Component {...pageProps} />);

export default withLayout;
