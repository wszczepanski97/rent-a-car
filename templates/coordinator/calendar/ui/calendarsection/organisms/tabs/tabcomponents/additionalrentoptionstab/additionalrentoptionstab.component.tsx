import { dodatkoweopcje, ubezpieczenia } from "@prisma/client";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { FC, useCallback, useContext, useRef } from "react";
import { CalendarContext } from "templates/coordinator/calendar/contexts/calendar.context";
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
  additionalRentOptions: dodatkoweopcje[];
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
  additionalRentOptions,
  insurances,
}) => {
  let dropdownRef = useRef<DropDownListComponent | null>(null);
  const {
    currentTab,
    selectedInsurance,
    selectedAdditionalOptions,
    setSelectedDateTimeRange,
    setSelectedAdditionalOptions,
    setSelectedInsurance,
  } = useContext(AddEventContext);

  const getAccesories = useCallback(
    () =>
      getDataNames("accesories").map(
        (accesory) =>
          additionalRentOptions.find(
            (additionalOption) => additionalOption.Nazwa === accesory
          ) as dodatkoweopcje
      ),
    [additionalRentOptions]
  );
  const onCustomOnNextButtonClick = () => {
    const errorElement = document.getElementById("err4");
    const insurance = insurances.find(
      (insurance) => insurance.Nazwa === dropdownRef?.current?.value
    );
    setSelectedAdditionalOptions(getAccesories());

    if (insurance) {
      if (errorElement) {
        errorElement.innerText = "";
      }
      setSelectedInsurance(insurance);
      removeItem(currentTab);
      currentTab?.current?.enableTab(5, true);
      currentTab?.current?.enableTab(4, false);
    } else {
      if (errorElement) {
        errorElement.innerText =
          "Proszę wybrać ubezpieczenie. Inne opcje mogą pozostać nieoznaczone.";
      }
    }
  };

  const onAccesoryChange = useCallback(() => {
    setSelectedAdditionalOptions(getAccesories());
  }, [setSelectedAdditionalOptions, getAccesories]);

  const isAccesoryChecked = useCallback(
    (nazwa: string) => {
      return !!selectedAdditionalOptions?.find(
        (accesory) => accesory.Nazwa === nazwa
      );
    },
    [selectedAdditionalOptions]
  );

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
        value={selectedInsurance}
      />
      <label className="e-textlabel" style={{ fontSize: 16 }}>
        Dodatkowe opcje
      </label>
      <div id="accesories" style={{ width: 500 }}>
        {additionalRentOptions.map((option) => (
          <label
            key={option.Nazwa}
            className={styles.container}
            data-name={option.Nazwa}
          >
            <label className="e-textlabel" style={{ paddingTop: 3 }}>
              {option.Nazwa}
            </label>
            <input
              type="checkbox"
              onChange={onAccesoryChange}
              checked={isAccesoryChecked(option.Nazwa)}
            />
            <span className={styles.checkmark}></span>
          </label>
        ))}
      </div>
      <TabButtonContainer
        type={TabNextButtonType.CUSTOM}
        customOnClick={onCustomOnNextButtonClick}
        disabled={!selectedInsurance}
        index={4}
        onBackClick={() => {
          setSelectedDateTimeRange(undefined);
        }}
      />
    </TabContainer>
  );
};

export default AdditionalRentTabOptionsTab;
