import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { createContext } from "react";
import { UserRole } from "types/next-auth";
import { Login as LoginUI } from "ui";

export const RoleContext = createContext("klient");
const Login: NextPage<{ role: UserRole }> = ({ role }) => (
  <RoleContext.Provider value={role}>
    <LoginUI />
  </RoleContext.Provider>
);
export default Login;

export const getServerSideProps: GetServerSideProps<
  {},
  { role: string }
> = async (context) => {
  const {
    req,
    query: { role },
  } = context;
  const session = await getSession({ req });
  if (!session) {
    return {
      props: {
        role: role && typeof role === "string" ? role.toUpperCase() : undefined,
      },
    };
  }
  return {
    redirect: {
      destination: role && typeof role === "string" ? `${role}/dashboard` : "/",
      permanent: false,
    },
    props: {},
  };
};
