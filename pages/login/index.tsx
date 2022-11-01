import SlideAnimation from "animations/slide.animation";
import { SidebarContextProvider } from "contexts/sidebar-context";
import { ReactElement } from "react";
import { LoginSection } from "templates/common";
import { NextPageWithLayout } from "types/next";
import { Layout, Main, Navbar, Sidebar } from "ui";

const LoginPage: NextPageWithLayout<undefined> = () => (
  <SlideAnimation>
    <LoginSection />
  </SlideAnimation>
);

LoginPage.getLayout = (page: ReactElement) => (
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
export default LoginPage;
