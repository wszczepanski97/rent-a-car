import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import withLayout from "hocs/withLayout";
import "../styles/globals.css";
import { FullScreenContextProvider } from "contexts/full-screen-context";

const MyApp = (props: AppProps) => (
  <SessionProvider session={props.pageProps.session}>
    <FullScreenContextProvider>{withLayout(props)}</FullScreenContextProvider>
  </SessionProvider>
);

export default MyApp;
