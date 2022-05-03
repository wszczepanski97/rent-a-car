import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { LoginSection, Role, RoleContext } from "templates/login";

const LoginPage: NextPage<Role> = ({ role }) => (
  <RoleContext.Provider value={role}>
    <LoginSection />
  </RoleContext.Provider>
);

const getRole: GetServerSideProps<{}, Role> = async (context) => {
  const {
    req,
    query: { role },
  } = context;
  const session = await getSession({ req });
  if (!session) {
    return {
      props: {
        role: role && typeof role === "string" ? role.toUpperCase() : null,
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

export const getServerSideProps = getRole;
export default LoginPage;
