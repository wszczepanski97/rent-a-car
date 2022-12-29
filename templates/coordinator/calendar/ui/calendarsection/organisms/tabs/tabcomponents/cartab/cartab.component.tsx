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
import { Car } from "pages/api/coordinator/calendar";
import { FC, memo, useContext, useRef, useState } from "react";
import { UslugaType } from "../../../add-event.component";
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
  const {
    currentTab,
    selectedService,
    selectedCar,
    setSelectedCar,
    setSelectedClient,
    setSelectedService,
  } = useContext(AddEventContext);
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
      if (selectedService === UslugaType.WYPOŻYCZENIE) {
        currentTab?.current?.enableTab(3, true);
        currentTab?.current?.enableTab(2, false);
      } else {
        currentTab?.current?.enableTab(2, true);
        currentTab?.current?.enableTab(1, false);
      }
    }
  };
  const getAvailableCars = () => {
    if (availableCarGrid) {
      availableCarGrid.dataSource = [...cars];
    }
  };
  const selectedRowIndex = cars.findIndex(
    (car) => car.IdSamochody === selectedCar?.IdSamochody
  );
  return (
    <TabContainer height={500}>
      <TabTitle title="Wybierz auto z listy poniżej" />
      <TabError index={2} />
      <GridComponent
        allowPaging
        allowFiltering
        allowSorting
        clipMode="EllipsisWithTooltip"
        filterSettings={{ type: "CheckBox" }}
        ref={(grid) => (availableCarGrid = grid)}
        selectedRowIndex={
          selectedRowIndex === -1
            ? undefined
            : selectedRowIndex > 5
            ? selectedRowIndex - 5
            : selectedRowIndex
        }
        width={1000}
        rowSelected={onCarSelected}
        created={getAvailableCars}
        pageSettings={{
          pageSize: 5,
          currentPage:
            selectedRowIndex === -1 ? 1 : Math.floor(selectedRowIndex / 5) + 1,
        }}
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
          <ColumnDirective
            field="CenaZaGodzine"
            headerText="Cena za godzinę"
            autoFit
          />
        </ColumnsDirective>
        <Inject services={[Page, Filter, Sort]} />
      </GridComponent>
      <TabButtonContainer
        type={TabNextButtonType.CUSTOM}
        disabled={disabled}
        errorMsg="Proszę wybrać klienta"
        index={selectedService === UslugaType.WYPOŻYCZENIE ? 2 : 1}
        customOnClick={() => customOnNextButtonClick(availableCarGrid)}
        onBackClick={() => {
          if (selectedService === UslugaType.WYPOŻYCZENIE) {
            setSelectedClient(undefined);
          } else {
            setSelectedService(undefined);
          }
        }}
      />
    </TabContainer>
  );
});

CarTab.displayName = "CarTab";

export default CarTab;
