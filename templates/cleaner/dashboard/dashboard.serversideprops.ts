import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next/types";
import { get } from "pages/api/wash";

export const dashboardServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
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
