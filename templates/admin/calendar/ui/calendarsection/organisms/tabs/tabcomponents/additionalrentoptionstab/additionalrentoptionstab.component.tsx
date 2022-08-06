import { dodatkoweopcje, ubezpieczenia } from "@prisma/client";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { FC, useContext, useRef, useState } from "react";
import {
  TabButtonContainer,
  TabContainer,
  TabDropdown,
  TabError,
  TabTitle,
} from "../../components";
import {
  removeItem,
  TabNextButtonType,
} from "../../components/tabnextbutton/tabnextbutton.component";
import { AddEventContext } from "../../contexts/addevent.context";
import styles from "./additionalrentoptionstab.module.scss";

type AdditionalRentTabOptionsTabProps = {
  insurances: ubezpieczenia[];
  additionalOptions: dodatkoweopcje[];
};

const getDataNames = (id: string) => {
  return Array.from(
    (document.getElementById(id)?.querySelectorAll('input[type="checkbox"]') as
      | HTMLInputElement[]
      | undefined) || []
  )
    .filter((input: HTMLInputElement) => input.checked)
    .map((input) => input.labels?.[0].getAttribute("data-name") || "")
    .filter((accesory) => !!accesory);
};

const AdditionalRentTabOptionsTab: FC<AdditionalRentTabOptionsTabProps> = ({
  insurances,
  additionalOptions,
}) => {
  let dropdownRef = useRef<DropDownListComponent | null>(null);
  const {
    currentTab,
    selectedInsurance,
    setSelectedInsurance,
    setSelectedAdditionalOptions,
    setSelectedCarDeliver,
    setSelectedCarPickup,
  } = useContext(AddEventContext);
  const onCustomOnNextButtonClick = () => {
    const insurance = insurances.find(
      (insurance) => insurance.Nazwa === dropdownRef?.current?.value
    );

    const carManagement = getDataNames("carManagement");
    setSelectedCarDeliver(carManagement.includes("carDeliver"));
    setSelectedCarPickup(carManagement.includes("carPickup"));

    const accesories = getDataNames("accesories").map(
      (accesory) =>
        additionalOptions.find(
          (additionalOption) => additionalOption.Nazwa === accesory
        ) as dodatkoweopcje
    );
    setSelectedAdditionalOptions(accesories);

    if (insurance) {
      document.getElementById("err4")!.innerText = "";
      setSelectedInsurance(insurance);
      removeItem(currentTab);
      currentTab?.current?.enableTab(5, true);
      currentTab?.current?.enableTab(4, false);
    } else {
      document.getElementById("err4")!.innerText =
        "Proszę wybrać ubezpieczenie. Inne opcje mogą pozostać nieoznaczone.";
    }
  };
  return (
    <TabContainer height={500} gap={10}>
      <TabTitle title="Wybierz dodatkowe opcje" marginBottom={0} />
      <TabError index={4} />
      <label className="e-textlabel" style={{ fontSize: 16 }}>
        Ubezpieczenie
      </label>
      <TabDropdown
        dataSource={insurances.map((insurance) => insurance.Nazwa)}
        dropdownRef={dropdownRef}
        placeholder="Wybierz typ ubezpieczenia..."
        setSelectedProperty={setSelectedInsurance}
      />
      <label className="e-textlabel" style={{ fontSize: 16 }}>
        Dodatkowe opcje
      </label>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div id="accesories">
          <label className="e-textlabel" style={{ fontSize: 14 }}>
            Akcesoria
          </label>
          {additionalOptions.map((option) => (
            <label
              key={option.Nazwa}
              className={styles.container}
              data-name={option.Nazwa}
            >
              <label className="e-textlabel" style={{ paddingTop: 3 }}>
                {option.Nazwa}
              </label>
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
            </label>
          ))}
        </div>
        <div id="carManagement">
          <label className="e-textlabel" style={{ fontSize: 14 }}>
            Podstawienie/odbiór auta
          </label>
          <label className={styles.container} data-name="carDeliver">
            <label className="e-textlabel" style={{ paddingTop: 3 }}>
              Czy podstawić auto?
            </label>
            <input type="checkbox" />
            <span className={styles.checkmark}></span>
          </label>
          <label className={styles.container} data-name="carPickup">
            <label className="e-textlabel" style={{ paddingTop: 3 }}>
              Czy odebrać auto?
            </label>
            <input type="checkbox" />
            <span className={styles.checkmark}></span>
          </label>
        </div>
      </div>
      <TabButtonContainer
        type={TabNextButtonType.CUSTOM}
        customOnClick={onCustomOnNextButtonClick}
        disabled={!selectedInsurance}
        index={4}
      />
    </TabContainer>
  );
};

export default AdditionalRentTabOptionsTab;
