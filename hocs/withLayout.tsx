import type { ReactElement } from "react";
import { Footer, Layout, Navbar } from "ui";
import { AppPropsWithLayout } from "types/next";

const withDefaultLayout = (page: ReactElement) => (
  <>
    <Layout>
      <Navbar />
      <main>{page}</main>
    </Layout>
    <Footer />
  </>
);

export default function withLayout({
  Component,
  pageProps,
}: AppPropsWithLayout) {
  return Component.getLayout
    ? Component.getLayout(<Component {...pageProps} />)
    : withDefaultLayout(<Component {...pageProps} />);
}
