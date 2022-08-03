import * as React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
} from "@syncfusion/ej2-react-grids";
import {
  nameValidationRule,
  vehicleRegistrationNumberValidationRule,
  VINNumberValidationRule,
} from "./validations";
import { useContext } from "react";
import {
  actionBegin,
  commands,
  defaultGridProps,
  defaultInjectServices,
  editparams,
  toolbarClick,
} from "../../../gridutils";
import { CarsContext } from "pages/coordinator/mydepartment";

const DeptCarsSectionTable = () => {
  let gridInstance: GridComponent;
  const { cars, allCarBodies } = useContext(CarsContext);
  console.log(allCarBodies);
  return cars ? (
    <div className="control-pane">
      <div className="control-section">
        <GridComponent
          actionBegin={(args) => actionBegin(args, "cars")}
          {...defaultGridProps}
          dataSource={cars}
          // @ts-ignore
          ref={(grid) => (gridInstance = grid)}
          toolbarClick={(args) => toolbarClick(args, gridInstance)}
        >
          <ColumnsDirective>
            <ColumnDirective
              headerText="Operations"
              commands={commands}
              width="130"
            ></ColumnDirective>
            <ColumnDirective
              field="Marka"
              headerText="Marka"
              validationRules={nameValidationRule}
            ></ColumnDirective>
            <ColumnDirective
              field="Model"
              headerText="Model"
              validationRules={nameValidationRule}
            ></ColumnDirective>
            <ColumnDirective
              field="NumerRejestracyjny"
              headerText="Numer rejestracyjny"
              validationRules={vehicleRegistrationNumberValidationRule}
            ></ColumnDirective>
            <ColumnDirective
              field="NumerVIN"
              headerText="Numer VIN"
              validationRules={VINNumberValidationRule}
            ></ColumnDirective>
            <ColumnDirective
              field="CzyUmyty"
              headerText="Umyty?"
              editType="dropdownedit"
              edit={editparams}
            ></ColumnDirective>
            <ColumnDirective
              field="CzyUszkodzony"
              headerText="Uszkodzony?"
              editType="dropdownedit"
              edit={editparams}
            ></ColumnDirective>
            <ColumnDirective
              field="carBody.IdNadwozie"
              foreignKeyValue="Nazwa"
              foreignKeyField="IdNadwozie"
              dataSource={allCarBodies}
              headerText="Nadwozie"
              edit={editparams}
              editType="dropdownedit"
            ></ColumnDirective>
            <ColumnDirective
              field="Kategoria"
              headerText="Kategoria"
              autoFit
            ></ColumnDirective>
            <ColumnDirective
              field="RodzajPaliwa"
              headerText="Rodzaj paliwa"
              autoFit
            ></ColumnDirective>
            <ColumnDirective
              field="PojemnoscBagaznika"
              headerText="Pojemnosc bagażnika"
              autoFit
            ></ColumnDirective>
            <ColumnDirective
              field="IloscDrzwi"
              headerText="Ilość drzwi"
            ></ColumnDirective>
            <ColumnDirective
              field="IloscMiejsc"
              headerText="Ilość miejsc"
            ></ColumnDirective>
            <ColumnDirective
              field="Przebieg"
              headerText="Przebieg"
            ></ColumnDirective>
            <ColumnDirective
              field="CenaZaDzien"
              headerText="Cena za dzień"
            ></ColumnDirective>
          </ColumnsDirective>
          <Inject services={defaultInjectServices} />
        </GridComponent>
      </div>
    </div>
  ) : null;
};

export default DeptCarsSectionTable;
