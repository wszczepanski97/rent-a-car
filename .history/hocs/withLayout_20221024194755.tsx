import type { ReactElement } from "react";
import { AppPropsWithLayout } from "types/next";
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

export default function withLayout({
  Component,
  pageProps,
}: AppPropsWithLayout) {
  console.log(Component.getLayout);
  return Component.getLayout
    ? Component.getLayout(<Component {...pageProps} />)
    : withDefaultLayout(<Component {...pageProps} />);
}
