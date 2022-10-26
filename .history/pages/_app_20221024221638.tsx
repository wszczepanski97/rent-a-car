import { FullScreenContextProvider } from "contexts/full-screen-context";
import useLayout from "hocs/withLayout";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const App = (props: AppProps) => (
  <SessionProvider session={props.pageProps.session}>
    <FullScreenContextProvider>{useLayout(props)}</FullScreenContextProvider>
  </SessionProvider>
);

export default App;
