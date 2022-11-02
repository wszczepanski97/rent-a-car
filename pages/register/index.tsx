import SlideAnimation from "animations/slide.animation";
import { SidebarContextProvider } from "contexts/sidebar-context";
import { ReactElement } from "react";
import { RegisterSection } from "templates/common/register";
import { NextPageWithLayout } from "types/next";
import { Layout, Main, Navbar, Sidebar } from "ui";

const RegisterPage: NextPageWithLayout<undefined> = () => (
  <SlideAnimation>
    <RegisterSection />
  </SlideAnimation>
);

RegisterPage.getLayout = (page: ReactElement) => (
  <SidebarContextProvider>
    <Main>
      <Sidebar />
      <Layout>
        <Navbar />
        {page}
      </Layout>
    </Main>
  </SidebarContextProvider>
);
export default RegisterPage;
