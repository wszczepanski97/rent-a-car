import * as React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
} from "@syncfusion/ej2-react-grids";
import {
  carMileageValidationRule,
  nameValidationRule,
  priceForDayValidationRule,
  requiredFieldRule,
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
import { CarsContext } from "pages/coordinator/dashboard";

const DeptCarsSectionTable = () => {
  let gridInstance: GridComponent;
  const { cars } = useContext(CarsContext);
  const allCarBodies = [...new Set(cars.map((car) => car.Nadwozie))].map(
    (Nazwa, index) => ({ index, Nazwa })
  );
  const allCarCategories = [...new Set(cars.map((car) => car.Kategoria))].map(
    (Nazwa, index) => ({ index, Nazwa })
  );
  const allTypesOfFuel = [...new Set(cars.map((car) => car.RodzajPaliwa))].map(
    (Nazwa, index) => ({ index, Nazwa })
  );
  const allBootCapacities = [
    ...new Set(cars.map((car) => car.PojemnoscBagaznika)),
  ].map((Nazwa, index) => ({ index, Nazwa }));
  const allNumberOfDoors = [...new Set(cars.map((car) => car.IloscDrzwi))].map(
    (Nazwa, index) => ({ index, Nazwa })
  );
  const allNumberOfPlaces = [
    ...new Set(cars.map((car) => car.IloscMiejsc)),
  ].map((Nazwa, index) => ({ index, Nazwa }));

  return cars ? (
    <div className="control-pane">
      <div className="control-section">
        <GridComponent
          actionBegin={(args) => actionBegin(args, "car")}
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
              field="IdSamochody"
              headerText="Id Samochodu"
              visible={false}
            ></ColumnDirective>
            <ColumnDirective
              field="Marka"
              headerText="Marka"
              defaultValue="fiat"
              validationRules={nameValidationRule}
            ></ColumnDirective>
            <ColumnDirective
              field="Model"
              headerText="Model"
              defaultValue="punto"
              validationRules={nameValidationRule}
            ></ColumnDirective>
            <ColumnDirective
              field="NumerRejestracyjny"
              headerText="Numer rejestracyjny"
              defaultValue="CA23232"
              validationRules={vehicleRegistrationNumberValidationRule}
            ></ColumnDirective>
            <ColumnDirective
              field="NumerVIN"
              headerText="Numer VIN"
              defaultValue="fdfdfdfdfdfdfdfd7"
              validationRules={VINNumberValidationRule}
            ></ColumnDirective>
            <ColumnDirective
              field="CzyUmyty"
              headerText="Umyty?"
              editType="dropdownedit"
              defaultValue="TAK"
              edit={editparams}
              validationRules={requiredFieldRule}
            ></ColumnDirective>
            <ColumnDirective
              field="CzyUszkodzony"
              headerText="Uszkodzony?"
              editType="dropdownedit"
              defaultValue="NIE"
              edit={editparams}
              validationRules={requiredFieldRule}
            ></ColumnDirective>
            <ColumnDirective
              field="Nadwozie"
              dataSource={allCarBodies}
              headerText="Nadwozie"
              edit={editparams}
              editType="dropdownedit"
              defaultValue="COMBI"
              validationRules={requiredFieldRule}
            ></ColumnDirective>
            <ColumnDirective
              field="Kategoria"
              dataSource={allCarCategories}
              headerText="Kategoria"
              edit={editparams}
              editType="dropdownedit"
              defaultValue="P"
              validationRules={requiredFieldRule}
            ></ColumnDirective>
            <ColumnDirective
              field="RodzajPaliwa"
              dataSource={allTypesOfFuel}
              headerText="Rodzaj paliwa"
              defaultValue="BENZYNA"
              edit={editparams}
              editType="dropdownedit"
              validationRules={requiredFieldRule}
            ></ColumnDirective>
            <ColumnDirective
              field="PojemnoscBagaznika"
              dataSource={allBootCapacities}
              headerText="Pojemność bagażnika"
              defaultValue="350L"
              edit={editparams}
              editType="dropdownedit"
              validationRules={requiredFieldRule}
            ></ColumnDirective>
            <ColumnDirective
              field="IloscDrzwi"
              dataSource={allNumberOfDoors}
              headerText="Ilość drzwi"
              defaultValue="5"
              edit={editparams}
              editType="dropdownedit"
              validationRules={requiredFieldRule}
            ></ColumnDirective>
            <ColumnDirective
              field="IloscMiejsc"
              dataSource={allNumberOfPlaces}
              headerText="Ilość miejsc"
              edit={editparams}
              defaultValue="5"
              editType="dropdownedit"
              validationRules={requiredFieldRule}
            ></ColumnDirective>
            <ColumnDirective
              field="Przebieg"
              headerText="Przebieg"
              editType="numericedit"
              defaultValue="0"
              validationRules={carMileageValidationRule}
            ></ColumnDirective>
            <ColumnDirective
              field="CenaZaGodzine"
              headerText="Cena za dzień"
              editType="numericedit"
              defaultValue="100"
              validationRules={priceForDayValidationRule}
            ></ColumnDirective>
          </ColumnsDirective>
          <Inject services={defaultInjectServices} />
        </GridComponent>
      </div>
    </div>
  ) : null;
};

export default DeptCarsSectionTable;
