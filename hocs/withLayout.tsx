import SlideAnimation from "animations/slideanimation";
import { SidebarContextProvider } from "contexts/sidebar.context";
import type { ReactElement } from "react";
import type { AppPropsWithLayout } from "types/next";
import Navbar from "ui/organisms/navbar/navbar.component";
import Sidebar from "ui/organisms/sidebar/sidebar.component";
import Footer from "ui/templates/footer";
import Layout from "ui/templates/layout";
import Main from "ui/templates/main";

const DefaultLayout = (page: ReactElement) => (
  <SidebarContextProvider>
    <Main>
      <Sidebar />
      <Layout>
        <SlideAnimation>
          <Navbar />
          {page}
        </SlideAnimation>
      </Layout>
      <Footer />
    </Main>
  </SidebarContextProvider>
);

const useLayout = ({ Component, pageProps }: AppPropsWithLayout) =>
  Component.getLayout
    ? Component.getLayout(<Component {...pageProps} />)
    : DefaultLayout(<Component {...pageProps} />);

export default useLayout;
