import { WithoutFooterLayout } from "layouts/withoutfooter.layout";
import Head from "next/head";
import { NextPageWithLayout } from "types/next";
import RegisterSection from "./components/registersection";
import { RegisterPageProps } from "./register.props";

const RegisterPage: NextPageWithLayout<RegisterPageProps> = (props) => (
  <>
    <Head>
      <title>Rejestracja</title>
    </Head>
    <RegisterSection {...props} />
  </>
);

RegisterPage.getLayout = WithoutFooterLayout;
export default RegisterPage;
