import type { AppProps } from "next/app";
import { Footer, Layout, Navbar } from "ui";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Layout>
      <Navbar />
      <Component {...pageProps} />
    </Layout>
    <Footer />
  </>
);

export default MyApp;
