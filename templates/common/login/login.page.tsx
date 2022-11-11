import { WithoutFooterLayout } from "layouts/withoutfooter.layout";
import LoginSection from "templates/common/login/components/loginsection";
import { NextPageWithLayout } from "types/next";

const LoginPage: NextPageWithLayout<undefined> = () => <LoginSection />;

LoginPage.getLayout = WithoutFooterLayout;
export default LoginPage;
