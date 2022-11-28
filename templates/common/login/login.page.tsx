import { WithoutFooterLayout } from "layouts/withoutfooter.layout";
import Head from "next/head";
import LoginSection from "templates/common/login/components/loginsection";
import { NextPageWithLayout } from "types/next";

const LoginPage: NextPageWithLayout<undefined> = () => (
  <>
    <Head>
      <title>Logowanie</title>
    </Head>
    <LoginSection />
  </>
);

LoginPage.getLayout = WithoutFooterLayout;
export default LoginPage;
