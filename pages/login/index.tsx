import { NextPageContext, NextPage } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getCsrfToken,
  getProviders,
  getSession,
  LiteralUnion,
} from "next-auth/react";
import { createContext } from "react";
import { Login as LoginUI } from "ui";

export type SessionDataProps = {
  session: undefined;
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  csrfToken: string | undefined;
};

export const CsrfContext = createContext<string | undefined>(undefined);

const Login: NextPage<SessionDataProps> = (sessionData) => (
  <CsrfContext.Provider value={sessionData.csrfToken}>
    <LoginUI {...sessionData} />
  </CsrfContext.Provider>
);
export default Login;

export async function getServerSideProps(context: NextPageContext) {
  const { req, res } = context;
  const session = await getSession({ req });
  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }

  return {
    props: {
      session: null,
      providers: await getProviders(),
      csrfToken: await getCsrfToken(context),
    },
  };
}
