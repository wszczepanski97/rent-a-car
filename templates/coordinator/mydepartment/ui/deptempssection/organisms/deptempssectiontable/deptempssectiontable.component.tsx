import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { EmployeesContext } from "pages/coordinator/dashboard";
import { useContext } from "react";
import {
  actionBegin,
  commands,
  defaultGridProps,
  defaultInjectServices,
  editparams,
  toolbarClick,
} from "../../../gridutils";
import {
  drivingLicenseNumberValidationRule,
  emailValidationRule,
  endOfContractValidationRule,
  IDNumberValidationRule,
  nameValidationRule,
  peselNumberValidationRule,
  phoneNumberValidationRule,
} from "./validations";

const DeptEmpsSectionTable = () => {
  let gridInstance: GridComponent;
  const { allDepartments, allJobPositions, allLocations, employees } =
    useContext(EmployeesContext);

  return employees ? (
    <div className="control-pane">
      <div className="control-section">
        <GridComponent
          actionBegin={(args) => actionBegin(args, "employee")}
          {...defaultGridProps}
          dataSource={employees}
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
              field="uzytkownicy.Imie"
              headerText="Imię"
              validationRules={nameValidationRule}
              autoFit
            ></ColumnDirective>
            <ColumnDirective
              field="uzytkownicy.Nazwisko"
              headerText="Nazwisko"
              validationRules={nameValidationRule}
              autoFit
            ></ColumnDirective>
            <ColumnDirective
              field="uzytkownicy.Email"
              headerText="Email"
              validationRules={emailValidationRule}
            ></ColumnDirective>
            <ColumnDirective
              field="uzytkownicy.NumerDowodu"
              headerText="Numer Dowodu"
              validationRules={IDNumberValidationRule}
              autoFit
            ></ColumnDirective>
            <ColumnDirective
              field="uzytkownicy.NumerPrawaJazdy"
              headerText="Numer Prawa Jazdy"
              validationRules={drivingLicenseNumberValidationRule}
              autoFit
            ></ColumnDirective>
            <ColumnDirective
              field="uzytkownicy.NumerTelefonu"
              headerText="Numer Telefonu"
              validationRules={phoneNumberValidationRule}
              autoFit
            ></ColumnDirective>
            <ColumnDirective
              field="uzytkownicy.Pesel"
              headerText="Pesel"
              validationRules={peselNumberValidationRule}
            ></ColumnDirective>
            <ColumnDirective
              field="lokalizacje.IdLokalizacje"
              foreignKeyValue="Nazwa"
              foreignKeyField="IdLokalizacje"
              dataSource={allLocations!}
              headerText="Lokalizacja"
              edit={editparams}
              editType="dropdownedit"
            ></ColumnDirective>
            <ColumnDirective
              field="stanowiska.IdStanowiska"
              foreignKeyValue="Nazwa"
              foreignKeyField="IdStanowiska"
              dataSource={allJobPositions!}
              headerText="Stanowisko"
              edit={editparams}
              editType="dropdownedit"
            ></ColumnDirective>
            <ColumnDirective
              field="oddzialy.IdOddzialy"
              foreignKeyValue="Nazwa"
              foreignKeyField="IdOddzialy"
              dataSource={allDepartments!}
              headerText="Oddział"
              edit={editparams}
              editType="dropdownedit"
            ></ColumnDirective>
            <ColumnDirective
              field="oddzialy_hist.OdKiedy"
              headerText="Początek umowy"
              editType="datepickeredit"
            ></ColumnDirective>
            <ColumnDirective
              field="oddzialy_hist.DoKiedy"
              headerText="Koniec umowy"
              editType="datepickeredit"
              validationRules={endOfContractValidationRule}
            ></ColumnDirective>
          </ColumnsDirective>
          <Inject services={defaultInjectServices} />
        </GridComponent>
      </div>
    </div>
  ) : null;
};

export default DeptEmpsSectionTable;
