import type { ReactElement } from "react";
import { Footer, Layout, Navbar } from "ui";

const withDefaultLayout = (page: ReactElement) => (
  <>
    <Layout>
      <Navbar />
      <main>{page}</main>
    </Layout>
    <Footer />
  </>
);

const withLayout = ({ Component, pageProps }) =>
  Component.getLayout
    ? Component.getLayout(<Component {...pageProps} />)
    : withDefaultLayout(<Component {...pageProps} />);
export default withLayout;
