import { FullScreenContext } from "contexts/full-screen-context";
import { ServicesContext } from "pages/mechanic/dashboard";
import { FC, useContext } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { PaychecksSection } from "templates/common/paychecks";
import "../../../../../node_modules/react-grid-layout/css/styles.css";
import "../../../../../node_modules/react-resizable/css/styles.css";
import ServicesSection from "../servicessection/servicessection.component";
const ResponsiveGridLayout = WidthProvider(Responsive);

const Root: FC = ({ children }) => {
  const { screen } = useContext(FullScreenContext);
  return (
    <div
      style={{
        minHeight: screen.active
          ? "calc(100vh - 20px)"
          : "calc(100vh - var(--navbar-height) - 10px)",
        padding: 6,
        backgroundColor: "#e7e7e7",
        borderRadius: 10,
        margin: screen.active ? 10 : "0 10px 10px 10px",
      }}
    >
      {children}
    </div>
  );
};

export const ServicesGrid: FC = () => {
  const {
    services: {
      availableservices,
      currentservice,
      futureservices,
      pastservices,
      paychecks,
    },
  } = useContext(ServicesContext);
  const { screen } = useContext(FullScreenContext);
  const layout = {
    lg: [
      {
        i: "current-services",
        x: 0,
        y: 0,
        w: 1,
        h: screen.active ? 5 : 3,
        isResizable: false,
      },
      {
        i: "future-services",
        x: 1,
        y: 0,
        w: 2,
        h: screen.active ? 5 : 4,
        isResizable: false,
      },
      {
        i: "available-services",
        x: 1,
        y: 1,
        w: 2,
        h: screen.active ? 5 : 4,
        isResizable: false,
      },
      {
        i: "past-services",
        x: 3,
        y: 0,
        w: 1,
        h: screen.active ? 10 : 8,
        isResizable: false,
      },
      {
        i: "paychecks",
        x: 0,
        y: 1,
        w: 1,
        h: 5,
        isResizable: false,
      },
    ],
  };
  return (
    <Root>
      <h2 style={{ textAlign: "center", margin: 5 }}>Panel mechanika</h2>
      <ResponsiveGridLayout
        layouts={layout}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 4 }}
        rowHeight={80}
        width={screen.active ? 1920 : 1000}
      >
        <div key="current-services">
          <ServicesSection
            services={currentservice}
            title="Obecna naprawa"
            statement="Nie masz żadnych trwających napraw"
            single
          />
        </div>
        <div key="future-services">
          <ServicesSection
            services={futureservices}
            title="Przyszłe naprawy"
            statement="Nie masz żadnych przyszłych napraw"
            actionsbuttons
          />
        </div>
        <div key="available-services">
          <ServicesSection
            services={availableservices}
            statement="Brak dostępnych napraw do podjęcia"
            title="Dostępne naprawy"
          />
        </div>
        <div key="past-services">
          <ServicesSection
            services={pastservices}
            title="Wcześniejsze/zakończone naprawy"
            statement="Nie naprawiłeś jeszcze żadnego auta"
            rowsPerPage={5}
          />
        </div>
        <div key="paychecks">
          <PaychecksSection />
        </div>
      </ResponsiveGridLayout>
    </Root>
  );
};

export default ServicesGrid;
