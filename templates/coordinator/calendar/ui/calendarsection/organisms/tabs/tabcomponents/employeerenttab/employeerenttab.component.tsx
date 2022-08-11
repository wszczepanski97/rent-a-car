import { lokalizacje } from "@prisma/client";
import { Employee } from "pages/coordinator/calendar";
import { FC, useCallback, useContext, useRef, useState } from "react";
import { TabButtonContainer, TabContainer, TabTitle } from "../../components";
import {
  removeItem,
  TabNextButtonType,
} from "../../components/tabnextbutton/tabnextbutton.component";
import { AddEventContext } from "../../contexts/addevent.context";
import styles from "./employeerenttab.module.scss";

type EmployeeRentTabProps = { employees: Employee[]; locations: lokalizacje[] };

const EmployeeRentTab: FC<EmployeeRentTabProps> = ({
  employees,
  locations,
}) => {
  let carPickupEmployeeDropdown = useRef<HTMLSelectElement | null>(null);
  let carDeliverEmployeeDropdown = useRef<HTMLSelectElement | null>(null);
  let carPickupLocationDropdown = useRef<HTMLSelectElement | null>(null);
  let carDeliverLocationDropdown = useRef<HTMLSelectElement | null>(null);
  const {
    currentTab,
    pickupEstimationTime,
    deliveryEstimationTime,
    selectedDateTimeRange,
    selectedCarPickup,
    setSelectedCarPickup,
    selectedCarDeliver,
    setSelectedCarDeliver,
    setPickupEstimationTime,
    setDeliveryEstimationTime,
    selectedCarPickupLocation,
    setSelectedCarPickupLocation,
    selectedCarDeliverLocation,
    setSelectedCarDeliverLocation,
    selectedCarDeliverEmployee,
    setSelectedCarPickupEmployee,
    selectedCarPickupEmployee,
    setSelectedCarDeliverEmployee,
    setSelectedAdditionalOptions,
    setSelectedInsurance,
  } = useContext(AddEventContext);
  const employeesArr = employees.filter(
    (employee) => employee.stanowiska.role_stanowisko[0].role.IdRole === 4
  );
  const filterFreeEmployeesOnPickup = (hoursTo: string = "0") =>
    employeesArr.filter((employee) => {
      if (selectedDateTimeRange) {
        const eventsinDateTimeRange = employee.uslugi.filter((usluga) => {
          const dataOd = new Date(usluga.DataOd);
          const dataDo = new Date(usluga.DataDo);
          const selectedEnd = new Date(selectedDateTimeRange.startDateValue);
          const selectedStart = new Date(
            selectedDateTimeRange.startDateValue.getTime() -
              Number(hoursTo) * 60 * 60 * 1000
          );
          return (
            (dataOd >= selectedStart &&
              dataOd < selectedEnd &&
              dataDo >= dataOd) ||
            (dataOd <= selectedStart &&
              dataDo > selectedEnd &&
              dataDo <= selectedEnd)
          );
        });
        return eventsinDateTimeRange.length === 0;
      }
    });
  const filterFreeEmployeesOnDeliver = (hoursTo: string = "0") =>
    employeesArr.filter((employee) => {
      if (selectedDateTimeRange) {
        const eventsinDateTimeRange = employee.uslugi.filter((usluga) => {
          const dataOd = new Date(usluga.DataOd);
          const dataDo = new Date(usluga.DataDo);
          const selectedEnd = new Date(selectedDateTimeRange.startDateValue);
          const selectedStart = new Date(
            selectedDateTimeRange.startDateValue.getTime() -
              Number(hoursTo) * 60 * 60 * 1000
          );
          return (
            (dataOd >= selectedStart &&
              dataOd < selectedEnd &&
              dataDo >= dataOd) ||
            (dataOd <= selectedStart &&
              dataDo > selectedEnd &&
              dataDo <= selectedEnd)
          );
        });
        return eventsinDateTimeRange.length === 0;
      }
    });

  const onCustomOnNextButtonClick = () => {
    const pickupEmployee = employeesArr?.find(
      (employee) =>
        `${employee.uzytkownicy.Imie} ${employee.uzytkownicy.Nazwisko}` ===
        carPickupEmployeeDropdown?.current?.value
    );
    const deliverEmployee = employeesArr?.find(
      (employee) =>
        `${employee.uzytkownicy.Imie} ${employee.uzytkownicy.Nazwisko}` ===
        carDeliverEmployeeDropdown?.current?.value
    );

    const pickupLocation = locations?.find(
      (location) =>
        `${location.Miejscowosc} ${location.Ulica} ${location.NumerUlicy}` ===
        carPickupLocationDropdown?.current?.value
    );
    const deliverLocation = locations?.find(
      (location) =>
        `${location.Miejscowosc} ${location.Ulica} ${location.NumerUlicy}` ===
        carDeliverLocationDropdown?.current?.value
    );

    const errPickEmpElement = document.getElementById("pickup-emp-err");
    const errPickLocElement = document.getElementById("pickup-loc-err");
    const errDelEmpElement = document.getElementById("deliver-emp-err");
    const errDelLocElement = document.getElementById("deliver-loc-err");
    if (selectedCarPickup && !pickupEmployee) {
      if (errPickEmpElement) {
        errPickEmpElement.innerText =
          "Proszę wybrać pracownika do podstawienia auta";
      }
    } else if (selectedCarPickup && !pickupLocation) {
      if (errPickLocElement) {
        errPickLocElement.innerText =
          "Proszę wybrać lokalizację do podstawienia auta";
      }
    } else if (selectedCarDeliver && !deliverEmployee) {
      if (errDelEmpElement) {
        errDelEmpElement.innerText = "Proszę wybrać pracownika do odbioru auta";
      }
    } else if (selectedCarDeliver && !deliverLocation) {
      if (errDelLocElement) {
        errDelLocElement.innerText =
          "Proszę wybrać lokalizację do odbioru auta";
      }
    } else {
      setSelectedCarPickupEmployee(pickupEmployee);
      setSelectedCarPickupLocation(pickupLocation);
      setSelectedCarDeliverEmployee(deliverEmployee);
      setSelectedCarDeliverLocation(deliverLocation);
      if (errPickEmpElement) errPickEmpElement.innerText = "";
      if (errPickLocElement) errPickLocElement.innerText = "";
      if (errDelEmpElement) errDelEmpElement.innerText = "";
      if (errDelLocElement) errDelLocElement.innerText = "";
      removeItem(currentTab);
      currentTab?.current?.enableTab(6, true);
      currentTab?.current?.enableTab(5, false);
    }
  };

  const onCarPickupCheckboxChange = useCallback(
    (e) => {
      setSelectedCarPickup(e.target.checked);
    },
    [setSelectedCarPickup]
  );

  const onCarDeliverCheckboxChange = useCallback(
    (e) => {
      setSelectedCarDeliver(e.target.checked);
    },
    [setSelectedCarDeliver]
  );

  const onPickupEstimationTimeChange = useCallback(
    (e) => {
      setPickupEstimationTime(e.target.value);
    },
    [setPickupEstimationTime]
  );

  const onDeliveryEstimationTimeChange = useCallback(
    (e) => {
      setDeliveryEstimationTime(e.target.value);
    },
    [setDeliveryEstimationTime]
  );

  return (
    <TabContainer height={500} width={600}>
      <TabTitle title={"Wybierz pracowników do podstawienia/odbioru auta"} />
      <div
        style={{ display: "flex", width: 600, justifyContent: "space-between" }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label className="e-textlabel" style={{ fontSize: 14 }}>
            Podstawienie auta
          </label>
          <label className={styles.container} data-name="carPickup">
            <label className="e-textlabel" style={{ paddingTop: 3 }}>
              Czy podstawić auto?
            </label>
            <input
              id="carPickup"
              type="checkbox"
              onChange={onCarPickupCheckboxChange}
              checked={selectedCarPickup}
            />
            <span className={styles.checkmark}></span>
          </label>
          <span
            id={`pickup-emp-err`}
            style={{ color: "red", fontSize: "14px" }}
          />
          <span
            id={`pickup-loc-err`}
            style={{ color: "red", fontSize: "14px" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label className="e-textlabel">
              Szacowany czas dojazdu (w godzinach)
            </label>
            <input
              type="number"
              min="0"
              max="4"
              step="0.5"
              disabled={!selectedCarPickup}
              value={pickupEstimationTime}
              onChange={onPickupEstimationTimeChange}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label className="e-textlabel" style={{ paddingTop: 3 }}>
              Lokalizacja podstawienia
            </label>
            <select
              disabled={!selectedCarPickup}
              style={{ padding: "7px 5px" }}
              ref={carPickupLocationDropdown}
            >
              {locations.map((location) => (
                <option
                  key={`${location.Miejscowosc} ${location.Ulica} ${location.NumerUlicy}`}
                  value={`${location.Miejscowosc} ${location.Ulica} ${location.NumerUlicy}`}
                >
                  {location.Miejscowosc} {location.Ulica} {location.NumerUlicy}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label className="e-textlabel" style={{ paddingTop: 3 }}>
              Pracownik do podstawienia auta
            </label>
            <select
              disabled={!selectedCarPickup}
              style={{ padding: "7px 5px" }}
              ref={carPickupEmployeeDropdown}
            >
              {filterFreeEmployeesOnPickup(pickupEstimationTime)?.map(
                (employee) => (
                  <option
                    key={`${employee.uzytkownicy.Imie} ${employee.uzytkownicy.Nazwisko}`}
                    value={`${employee.uzytkownicy.Imie} ${employee.uzytkownicy.Nazwisko}`}
                  >
                    {employee.uzytkownicy.Imie} {employee.uzytkownicy.Nazwisko}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label className="e-textlabel" style={{ fontSize: 14 }}>
            Odbiór auta
          </label>
          <label className={styles.container} data-name="carDeliver">
            <label className="e-textlabel" style={{ paddingTop: 3 }}>
              Czy odebrać auto?
            </label>
            <input
              id="carDeliver"
              type="checkbox"
              onChange={onCarDeliverCheckboxChange}
              checked={selectedCarDeliver}
            />
            <span className={styles.checkmark}></span>
          </label>
          <span
            id={`deliver-emp-err`}
            style={{ color: "red", fontSize: "14px" }}
          />
          <span
            id={`deliver-loc-err`}
            style={{ color: "red", fontSize: "14px" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label className="e-textlabel">
              Szacowany czas dojazdu (w godzinach)
            </label>
            <input
              type="number"
              min="0"
              max="4"
              step="0.5"
              disabled={!selectedCarDeliver}
              value={deliveryEstimationTime}
              onChange={onDeliveryEstimationTimeChange}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label className="e-textlabel" style={{ paddingTop: 3 }}>
                Lokalizacja odbioru
              </label>
              <select
                disabled={!selectedCarDeliver}
                style={{ padding: "7px 5px" }}
                ref={carDeliverLocationDropdown}
              >
                {locations.map((location) => (
                  <option
                    key={`${location.Miejscowosc} ${location.Ulica} ${location.NumerUlicy}`}
                    value={`${location.Miejscowosc} ${location.Ulica} ${location.NumerUlicy}`}
                  >
                    {location.Miejscowosc} {location.Ulica}{" "}
                    {location.NumerUlicy}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label className="e-textlabel" style={{ paddingTop: 3 }}>
                Pracownik do odbioru auta
              </label>
              <select
                disabled={!selectedCarDeliver}
                style={{ padding: "7px 5px" }}
                ref={carDeliverEmployeeDropdown}
              >
                {filterFreeEmployeesOnDeliver(deliveryEstimationTime)?.map(
                  (employee) => (
                    <option
                      key={`${employee.uzytkownicy.Imie} ${employee.uzytkownicy.Nazwisko}`}
                      value={`${employee.uzytkownicy.Imie} ${employee.uzytkownicy.Nazwisko}`}
                    >
                      {employee.uzytkownicy.Imie}{" "}
                      {employee.uzytkownicy.Nazwisko}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>
      </div>
      <TabButtonContainer
        type={TabNextButtonType.CUSTOM}
        customOnClick={onCustomOnNextButtonClick}
        index={5}
        onBackClick={() => {
          setSelectedAdditionalOptions(undefined);
          setSelectedInsurance(undefined);
        }}
      />
    </TabContainer>
  );
};

export default EmployeeRentTab;
