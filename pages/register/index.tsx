import SlideAnimation from "animations/slideanimation";
import { SidebarContextProvider } from "contexts/sidebar.context";
import { ReactElement } from "react";
import RegisterSection from "templates/common/register/registersection";
import { NextPageWithLayout } from "types/next";
import Navbar from "ui/organisms/navbar/navbar.component";
import Sidebar from "ui/organisms/sidebar/sidebar.component";
import Layout from "ui/templates/layout";
import Main from "ui/templates/main";

const RegisterPage: NextPageWithLayout<undefined> = () => <RegisterSection />;

RegisterPage.getLayout = (page: ReactElement) => (
  <SidebarContextProvider>
    <Main>
      <SlideAnimation>
        <Sidebar />
        <Layout>
          <Navbar />
          {page}
        </Layout>
      </SlideAnimation>
    </Main>
  </SidebarContextProvider>
);
export default RegisterPage;
