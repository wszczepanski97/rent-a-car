import { lokalizacje } from "@prisma/client";
import { Client, Employee } from "pages/coordinator/calendar";
import { FC, FormEventHandler } from "react";
import { UslugaType } from "../add-event.component";
import { DateRange } from "./tab3.component";

type Tab6Props = {
  selectedService?: UslugaType;
  selectedClient?: Client;
  selectedCar?: Object;
  selectedEmployee?: Employee;
  datetimeRange?: DateRange;
  serviceDescription?: string;
  location?: lokalizacje;
  goStepBack(): void;
};

type SubmitFormType = {
  timeRange: { value: string };
  Opis: { value: string };
  IloscDni: { value: string };
  Kwota: { value: string };
  IdUbezpieczenia: { value: string };
};

export const Tab6: FC<Tab6Props> = ({
  selectedService,
  selectedClient,
  selectedCar,
  selectedEmployee,
  datetimeRange,
  serviceDescription,
  location,
  goStepBack,
}) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    console.log(e.target);
    // e.preventDefault();
    // const target = e.target as typeof e.target & SubmitFormType;
    // const [DataOd, DataDo] = target.timeRange.value
    //   .split("-")
    //   .map((date) => date.trim());
    // const body = JSON.stringify({
    //   DataOd,
    //   DataDo,
    //   Opis: target.Opis.value,
    //   IloscDni: parseInt(target.IloscDni.value),
    //   Kwota: parseInt(target.Kwota.value),
    //   IdUbezpieczenia: parseInt(target.IdUbezpieczenia.value),
    //   IdUzytkownicy: session?.user.id,
    //   IdSamochody: car!.IdSamochody,
    // });

    // const options = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body,
    // };
    // const response = await fetch("/api/coordinator/calendar", options);
    // const result = await response.json();
  };
  return (
    <div
      className="responsive-align"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 350,
        width: 500,
        gap: 20,
        margin: "0 auto",
      }}
    >
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <h3 style={{ textAlign: "center" }}>Podsumowanie zlecenia usługi</h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 50,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 0",
              }}
            >
              <label className="e-textlabel">Typ usługi</label>
              <span>{selectedService}</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 0",
              }}
            >
              <label className="e-textlabel">Klient</label>
              <span>
                {selectedClient?.uzytkownicy.Imie}{" "}
                {selectedClient?.uzytkownicy.Nazwisko}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 0",
              }}
            >
              <label className="e-textlabel">Samochód</label>
              <span>
                {selectedCar.Marka} {selectedCar.Model}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 0",
              }}
            >
              <label className="e-textlabel">Czas</label>
              <span>
                {datetimeRange?.startDateValue.toLocaleString()} -{" "}
                {datetimeRange?.endDateValue.toLocaleString()}
              </span>
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 0",
              }}
            >
              <label className="e-textlabel">Pracownik</label>
              <span>
                {selectedEmployee?.uzytkownicy.Imie}{" "}
                {selectedEmployee?.uzytkownicy.Nazwisko}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 0",
              }}
            >
              <label className="e-textlabel">Lokalizacja</label>
              <span>
                {location?.Miejscowosc} {location?.Ulica} {location?.NumerUlicy}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 0",
              }}
            >
              <label className="e-textlabel">Cena</label>
              <span>{selectedService}</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 0",
                textOverflow: "ellipsis",
              }}
            >
              <label className="e-textlabel">Opis</label>
              <span style={{ textOverflow: "ellipsis" }}>
                {serviceDescription || "Brak opisu"}
              </span>
            </div>
          </div>
        </div>
        <span id="err6" />
      </form>
      <div
        className="btn-container"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <button
          id="goToSearch"
          className="e-btn"
          onClick={goStepBack}
          style={{ backgroundColor: "#ff5757", border: 0 }}
        >
          Wróć do poprzednich kroków
        </button>
      </div>
    </div>
  );
};
