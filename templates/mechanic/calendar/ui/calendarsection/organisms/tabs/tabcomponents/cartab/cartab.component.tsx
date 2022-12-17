import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Inject,
  Page,
  RowSelectEventArgs,
  Sort,
} from "@syncfusion/ej2-react-grids";
import { Car } from "pages/cleaner/calendar";
import { FC, memo, useContext, useRef, useState } from "react";
import {
  TabButtonContainer,
  TabContainer,
  TabError,
  TabTitle,
} from "../../components";
import {
  removeItem,
  TabNextButtonType,
} from "../../components/tabnextbutton/tabnextbutton.component";
import { AddEventContext } from "../../contexts/addevent.context";

type CarTabProps = { cars: Car[] };

const CarTab: FC<CarTabProps> = memo(({ cars }) => {
  let availableCarGrid: GridComponent | null;
  const carSelected = useRef<Car>();
  const { currentTab, setSelectedCar } = useContext(AddEventContext);
  const [disabled, setDisabled] = useState(true);
  const onCarSelected = (args: RowSelectEventArgs) => {
    carSelected.current = args.data as Car;
    setDisabled(false);
  };
  const customOnNextButtonClick = (element: GridComponent | null) => {
    const errorElement = document.getElementById("err2");
    if (element === null) {
      if (errorElement) {
        errorElement.innerText =
          "Żadne z aut nie zostało wybrane. Prosimy o wybranie auta.";
      }
    } else {
      if (errorElement) {
        errorElement.innerText = "";
      }
      removeItem(currentTab);
      setSelectedCar(carSelected.current);
      currentTab?.current?.enableTab(1, true);
      currentTab?.current?.enableTab(0, false);
    }
  };
  const getAvailableCars = () => {
    if (availableCarGrid) {
      availableCarGrid.dataSource = [...cars];
    }
  };
  return (
    <TabContainer>
      <TabTitle title="Wybierz auto do mycia" />
      <TabError index={2} />
      <GridComponent
        allowPaging
        allowFiltering
        allowSorting
        clipMode="EllipsisWithTooltip"
        filterSettings={{ type: "CheckBox" }}
        ref={(grid) => (availableCarGrid = grid)}
        width={1000}
        rowSelected={onCarSelected}
        created={getAvailableCars}
        pageSettings={{ pageSize: 5 }}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="IdSamochody"
            headerText="Id"
            type="number"
            autoFit
          />
          <ColumnDirective field="Marka" headerText="Marka" autoFit />
          <ColumnDirective field="Model" headerText="Model" autoFit />
          <ColumnDirective
            field="NumerRejestracyjny"
            headerText="Numer rejestracyjny"
            autoFit
          />
          <ColumnDirective field="NumerVIN" headerText="Numer VIN" autoFit />
          <ColumnDirective field="Kategoria" headerText="Kategoria" autoFit />
          <ColumnDirective field="Przebieg" headerText="Przebieg" autoFit />
        </ColumnsDirective>
        <Inject services={[Page, Filter, Sort]} />
      </GridComponent>
      <TabButtonContainer
        type={TabNextButtonType.CUSTOM}
        disabled={disabled}
        errorMsg="Proszę wybrać samochód"
        index={1}
        customOnClick={() => customOnNextButtonClick(availableCarGrid)}
        onBackClick={() => undefined}
      />
    </TabContainer>
  );
});

CarTab.displayName = "CarTab";

export default CarTab;
