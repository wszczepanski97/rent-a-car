import { WithoutFooterLayout } from "layouts/withoutfooter.layout";
import Head from "next/head";
import { NextPageWithLayout } from "types/next";
import RegisterSection from "./components/registersection";

const RegisterPage: NextPageWithLayout<undefined> = () => (
  <>
    <Head>
      <title>Rejestracja</title>
    </Head>
    <RegisterSection />;
  </>
);

RegisterPage.getLayout = WithoutFooterLayout;
export default RegisterPage;
