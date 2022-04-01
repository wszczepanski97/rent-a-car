import "../styles/globals.css";
import type { AppProps } from "next/app";
import { PageWrapper, Footer, Navbar } from "../ui";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <PageWrapper>
        <Navbar />
        <Component {...pageProps} />
      </PageWrapper>
      <Footer />
    </>
  );
}

export default MyApp;
