import SlideAnimation from "animations/slideanimation";
import { SidebarContextProvider } from "contexts/sidebar.context";
import type { ReactElement } from "react";
import Navbar from "ui/organisms/navbar/navbar.component";
import Sidebar from "ui/organisms/sidebar/sidebar.component";
import Layout from "ui/templates/layout";
import Main from "ui/templates/main";

export const WithoutFooterLayout = (page: ReactElement) => (
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
