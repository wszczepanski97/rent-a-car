import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Footer, Navbar } from "../ui/common";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
