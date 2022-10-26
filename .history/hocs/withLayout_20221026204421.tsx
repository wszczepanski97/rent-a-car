import { SidebarContextProvider } from "contexts/sidebar-context";
import { ReactElement } from "react";
import { AppPropsWithLayout } from "types/next";
import { Footer, Layout, Main, Navbar, Sidebar } from "ui";
import SidebarActivationButton from "ui/common/organisms/sidebaractivationbutton/sidebaractivationbutton";

const DefaultLayout = (page: ReactElement) => (
  <SidebarContextProvider>
    <Sidebar />
    <Main>
      <SidebarActivationButton />
      <Layout>
        <Navbar />
        {page}
      </Layout>
    </Main>
    <Footer />
  </SidebarContextProvider>
);

const useLayout = ({ Component, pageProps }: AppPropsWithLayout) =>
  Component.getLayout
    ? Component.getLayout(<Component {...pageProps} />)
    : DefaultLayout(<Component {...pageProps} />);

export default useLayout;
