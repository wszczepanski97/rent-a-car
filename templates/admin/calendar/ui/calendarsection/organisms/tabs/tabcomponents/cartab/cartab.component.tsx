import { FC, useContext, useState } from "react";
import { Car } from "pages/coordinator/calendar";
import {
  TabButtonContainer,
  TabContainer,
  TabError,
  TabTitle,
} from "../../components";
import { AddEventContext } from "../../contexts/addevent.context";
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
import {
  removeItem,
  TabNextButtonType,
} from "../../components/tabnextbutton/tabnextbutton.component";

type CarTabProps = { cars: Car[] };

const CarTab: FC<CarTabProps> = ({ cars }) => {
  let availableCarGrid: GridComponent | null;
  const carSelected = (args: RowSelectEventArgs) => {
    setSelectedCar(args.data);
    setDisabled(false);
  };
  const carDeselected = () => {
    setDisabled(true);
  };
  const { currentTab, setSelectedCar } = useContext(AddEventContext);
  const [disabled, setDisabled] = useState(true);
  const customOnNextButtonClick = (element: GridComponent | null) => {
    if (
      element == null ||
      (element != null &&
        (element.getSelectedRecords() === undefined ||
          element.getSelectedRecords().length === 0))
    ) {
      document.getElementById("err2")!.innerText =
        "Żadne z aut nie zostało wybrane. Prosimy o wybranie auta.";
    } else {
      document.getElementById("err2")!.innerText = "";
      removeItem(currentTab);
      currentTab?.current?.enableTab(3, true);
      currentTab?.current?.enableTab(2, false);
    }
  };
  const getAvailableCars = () => {
    availableCarGrid!.dataSource = [...cars];
  };
  return (
    <TabContainer height={430}>
      <TabTitle title="Wybierz auto z listy poniżej" />
      <TabError index={2} />
      <GridComponent
        allowPaging
        allowFiltering
        allowSorting
        clipMode="EllipsisWithTooltip"
        filterSettings={{ type: "CheckBox" }}
        ref={(grid) => (availableCarGrid = grid)}
        width={1000}
        rowSelected={carSelected}
        rowDeselected={carDeselected}
        created={getAvailableCars}
        pageSettings={{ pageSize: 5 }}
        onChange={() => {
          console.log("change");
          setDisabled(false);
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
            field="CenaZaDzien"
            headerText="Cena za dzień"
            autoFit
          />
        </ColumnsDirective>
        <Inject services={[Page, Filter, Sort]} />
      </GridComponent>
      <TabButtonContainer
        type={TabNextButtonType.CUSTOM}
        disabled={disabled}
        errorMsg="Proszę wybrać klienta"
        index={2}
        customOnClick={() => customOnNextButtonClick(availableCarGrid)}
        setSelectedProperty={setSelectedCar}
      />
    </TabContainer>
  );
};

export default CarTab;
