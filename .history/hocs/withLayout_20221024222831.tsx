import {
  SidebarContext,
  SidebarContextProvider,
} from "contexts/sidebar-context";
import { ReactElement, useContext } from "react";
import { AppPropsWithLayout } from "types/next";
import { Footer, Layout, Navbar, Sidebar } from "ui";

const DefaultLayout = (page: ReactElement) => {
  const { active } = useContext(SidebarContext);
  return (
    <SidebarContextProvider>
      <Main>
        <Sidebar />
        <Layout>
          <Navbar />
          {page}
        </Layout>
      </Main>
      <Footer />
    </SidebarContextProvider>
  );
};

const useLayout = ({ Component, pageProps }: AppPropsWithLayout) =>
  Component.getLayout
    ? Component.getLayout(<Component {...pageProps} />)
    : DefaultLayout(<Component {...pageProps} />);

export default useLayout;
