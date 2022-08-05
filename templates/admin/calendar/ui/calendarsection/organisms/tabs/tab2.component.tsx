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
import { FC } from "react";

type Tab2Props = {
  filteredCars: Object[];
  goStepBack(): void;
  onClick(element: GridComponent | null): void;
};

export const Tab2: FC<Tab2Props> = ({ filteredCars, goStepBack, onClick }) => {
  // const [disabled, setDisabled] = useState(true);
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
      <h4 className="e-textlabel">Wybierz auto z listy poniżej </h4>
      <GridComponent
        allowPaging
        allowFiltering
        allowSorting
        clipMode="EllipsisWithTooltip"
        filterSettings={{ type: "CheckBox" }}
        ref={(grid) => (availableCarGrid = grid)}
        width={1000}
        rowSelected={carSelected}
        created={availableCars}
        pageSettings={{ pageSize: 5 }}
        // onChange={() => {
        //   console.log("change");
        //   setDisabled(false);
        // }}
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
      <br />
      <div
        className="btn-container"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 10,
        }}
      >
        <button
          id="selectCar"
          className="e-btn"
          onClick={() => customOnNextButtonClick(availableCarGrid)}
          style={{ backgroundColor: "#5aad73", border: 0 }}
          // disabled={disabled}
        >
          Przejdź dalej
        </button>
        <button
          id="goToSearch"
          className="e-btn"
          onClick={goStepBack}
          style={{ backgroundColor: "#ff5757", border: 0 }}
        >
          Wróć
        </button>
      </div>
      <span id="err2" />
    </div>
  );
};
