import { WithoutFooterLayout } from "layouts/withoutfooter.layout";
import { NextPageWithLayout } from "types/next";
import RegisterSection from "./components/registersection";

const RegisterPage: NextPageWithLayout<undefined> = () => <RegisterSection />;

RegisterPage.getLayout = WithoutFooterLayout;
export default RegisterPage;
