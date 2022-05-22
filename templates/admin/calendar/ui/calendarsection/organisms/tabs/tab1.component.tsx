import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  RowSelectEventArgs,
} from "@syncfusion/ej2-react-grids";
import { FC } from "react";
import { UslugaType } from "../add-event2.component";

type Tab1Props = {
  filteredCars: Object[];
  serviceType: UslugaType | undefined;
  goStepBack(): void;
  onClick(element: GridComponent | null): void;
};

export const Tab1: FC<Tab1Props> = ({
  filteredCars,
  serviceType,
  goStepBack,
  onClick,
}) => {
  console.log(serviceType);
  let availableCarGrid: GridComponent | null;
  let selectedCar: any;
  const carSelected = (args: RowSelectEventArgs) => {
    selectedCar = args.data;
  };
  const availableCars = () => {
    availableCarGrid!.dataSource = filteredCars;
  };
  return (
    <div>
      <div className="wizard-title">Wybierz auto z listy poniżej </div>
      <GridComponent
        ref={(grid) => (availableCarGrid = grid)}
        width="100%"
        rowSelected={carSelected}
        created={availableCars}
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
      </GridComponent>
      <br />
      <div className="btn-container">
        <button id="goToSearch" className="e-btn" onClick={goStepBack}>
          Back
        </button>
        <button
          id="selectCar"
          className="e-btn"
          onClick={() => onClick(availableCarGrid)}
        >
          Continue
        </button>
      </div>
      <span id="err2" />
    </div>
  );
};
