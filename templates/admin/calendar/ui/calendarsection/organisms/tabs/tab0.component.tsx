import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { FC, useState } from "react";
import { UslugaType } from "../add-event.component";

type Tab0Props = {
  onClick(element: DropDownListComponent | null): void;
};

export const Tab0: FC<Tab0Props> = ({ onClick }) => {
  const [disabled, setDisabled] = useState(true);
  let serviceTypeDropdown: DropDownListComponent | null;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 250,
        width: 500,
        gap: 20,
        margin: "0 auto",
      }}
    >
      <h4 className="e-textlabel">Wybierz typ usługi</h4>
      <span id="err0" style={{ color: "red", fontSize: 14 }} />
      <DropDownListComponent
        ref={(dropdownlist) => {
          serviceTypeDropdown = dropdownlist;
        }}
        dataSource={Object.values(UslugaType)}
        placeholder="Typ usługi"
        onChange={() => {
          setDisabled(false);
        }}
      />

      <button
        id="serviceType"
        className="e-btn"
        onClick={() => onClick(serviceTypeDropdown)}
        style={{ width: "50%", backgroundColor: "#5aad73", border: 0 }}
        disabled={disabled}
      >
        Przejdź dalej
      </button>
    </div>
  );
};
