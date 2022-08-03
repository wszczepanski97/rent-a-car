import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import withLayout from "hocs/withLayout";
import "../styles/globals.css";

const MyApp = (props: AppProps) => (
  <SessionProvider session={props.pageProps.session}>
    {withLayout(props)}
  </SessionProvider>
);

export default MyApp;
