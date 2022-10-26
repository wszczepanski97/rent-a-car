import type { ReactElement } from "react";
import { AppPropsWithLayout } from "types/next";
import { Footer, Layout, Navbar, Sidebar } from "ui";

const withDefaultLayout = (page: ReactElement) => (
  <>
    <Layout>
      <Navbar />
      <Sidebar />
      <main>{page}</main>
    </Layout>
    <Footer />
  </>
);

const withLayout = ({ Component, pageProps }: AppPropsWithLayout) =>
  Component.getLayout
    ? Component.getLayout(<Component {...pageProps} />)
    : withDefaultLayout(<Component {...pageProps} />);

export default withLayout;
