import { SidebarContextProvider } from "contexts/sidebar-context";
import { ReactElement } from "react";
import { AppPropsWithLayout } from "types/next";
import { Footer, Layout, Main, Navbar, Sidebar } from "ui";

const DefaultLayout = (page: ReactElement) => (
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

const useLayout = ({ Component, pageProps }: AppPropsWithLayout) =>
  Component.getLayout
    ? Component.getLayout(<Component {...pageProps} />)
    : DefaultLayout(<Component {...pageProps} />);

export default useLayout;
