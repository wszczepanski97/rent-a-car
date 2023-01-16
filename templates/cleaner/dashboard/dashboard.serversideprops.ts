import { unstable_getServerSession } from "next-auth/next";
import { GetServerSideProps } from "next/types";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { get } from "pages/api/wash";

export const dashboardServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  const data = await get(
    //@ts-ignore
    { ...context.req, query: { id: session?.user.id.toString() } },
    context.res
  );
  return {
    props: {
      session,
      services: data,
    },
  };
};
