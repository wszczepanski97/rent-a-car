import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { ClientsContext } from "pages/coordinator/dashboard";
import { useContext } from "react";
import {
  syncfusionDrivingLicenseNumberValidationRule,
  syncfusionEmailValidationRule,
  syncfusionIDNumberValidationRule,
  syncfusionPeselNumberValidationRule,
  syncfusionPhoneNumberValidationRule,
} from "templates/coordinator/mydepartment/ui/deptempssection/organisms/deptempssectiontable/validations";
import {
  requiredFieldRule,
  syncfusionNameValidationRule,
} from "../../../deptcarsssection/organisms/deptcarssectiontable/validations";
import {
  actionBegin,
  commands,
  defaultGridProps,
  defaultInjectServices,
  editparams,
  toolbarClick,
} from "../../../gridutils";

const DeptClientsSectionTable = () => {
  let gridInstance: GridComponent;
  const { clients, allLocations } = useContext(ClientsContext);
  return clients ? (
    <div className="control-pane">
      <div className="control-section">
        <GridComponent
          actionBegin={(args) => actionBegin(args, "client")}
          {...defaultGridProps}
          dataSource={clients}
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
              field="IdKlienci"
              headerText="Id klienta"
              visible={false}
            ></ColumnDirective>
            <ColumnDirective
              field="uzytkownicy.Imie"
              headerText="Imię"
              validationRules={syncfusionNameValidationRule}
              defaultValue="fdnslkafnd"
              autoFit
            ></ColumnDirective>
            <ColumnDirective
              field="uzytkownicy.Nazwisko"
              headerText="Nazwisko"
              validationRules={syncfusionNameValidationRule}
              defaultValue="fdnslkafnd"
              autoFit
            ></ColumnDirective>
            <ColumnDirective
              field="uzytkownicy.Email"
              headerText="Email"
              defaultValue="wszczepanski97@gmail.com"
              validationRules={syncfusionEmailValidationRule}
            ></ColumnDirective>
            <ColumnDirective
              field="uzytkownicy.NumerDowodu"
              headerText="Numer Dowodu"
              defaultValue="cas432143"
              validationRules={syncfusionIDNumberValidationRule}
              autoFit
            ></ColumnDirective>
            <ColumnDirective
              field="uzytkownicy.NumerPrawaJazdy"
              headerText="Numer Prawa Jazdy"
              defaultValue="43213/43/34321"
              validationRules={syncfusionDrivingLicenseNumberValidationRule}
              autoFit
            ></ColumnDirective>
            <ColumnDirective
              field="uzytkownicy.NumerTelefonu"
              headerText="Numer Telefonu"
              defaultValue="584939993"
              validationRules={syncfusionPhoneNumberValidationRule}
              autoFit
            ></ColumnDirective>
            <ColumnDirective
              field="uzytkownicy.Pesel"
              headerText="Pesel"
              defaultValue="97060902391"
              validationRules={syncfusionPeselNumberValidationRule}
            ></ColumnDirective>
            <ColumnDirective
              field="lokalizacje.IdLokalizacje"
              foreignKeyValue="Nazwa"
              foreignKeyField="IdLokalizacje"
              dataSource={allLocations!}
              headerText="Lokalizacja"
              edit={editparams}
              editType="dropdownedit"
              validationRules={requiredFieldRule}
            ></ColumnDirective>
            <ColumnDirective
              field="ProcentRabatu"
              headerText="Procent rabatu"
              defaultValue="0"
              validationRules={requiredFieldRule}
            ></ColumnDirective>
          </ColumnsDirective>
          <Inject services={defaultInjectServices} />
        </GridComponent>
      </div>
    </div>
  ) : null;
};

export default DeptClientsSectionTable;
