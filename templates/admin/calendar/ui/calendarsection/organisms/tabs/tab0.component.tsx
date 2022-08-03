import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { FC } from "react";
import { UslugaType } from "../add-event2.component";

type Tab0Props = {
  onClick(element: DropDownListComponent | null): void;
};

export const Tab0: FC<Tab0Props> = ({ onClick }) => {
  let serviceTypeDropdown: DropDownListComponent | null;
  return (
    <div className="responsive-align">
      <div className="row">
        <label className="e-textlabel">Wybierz typ usługi</label>
        <DropDownListComponent
          ref={(dropdownlist) => {
            serviceTypeDropdown = dropdownlist;
          }}
          dataSource={Object.values(UslugaType)}
          placeholder="Typ usługi"
        />
      </div>
      <button
        id="serviceType"
        className="e-btn"
        onClick={() => onClick(serviceTypeDropdown)}
      >
        Przejdź dalej
      </button>
      <span id="err0" />
    </div>
  );
};
