import { FullScreenContextProvider } from "contexts/full-screen.context";
import { LazyMotion } from "framer-motion";
import useLayout from "hocs/withLayout";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";

// Framer Motion dynamic loader -> reduces JS size
const loadFeatures = () =>
  import("../animations/domanimation").then((res) => res.default);

const App = (props: AppProps) => (
  <SessionProvider session={props.pageProps.session}>
    <FullScreenContextProvider>
      <LazyMotion features={loadFeatures}>{useLayout(props)}</LazyMotion>
    </FullScreenContextProvider>
  </SessionProvider>
);

export default App;
