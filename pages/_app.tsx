import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Footer, Layout, Navbar } from "ui";
import "../styles/globals.css";
import "font-awesome/css/font-awesome.css";
import "tempusdominus-bootstrap/build/css/tempusdominus-bootstrap.css";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Navbar />
        <Component {...pageProps} />
      </Layout>
      <Footer />
    </SessionProvider>
  );
};

export default MyApp;
