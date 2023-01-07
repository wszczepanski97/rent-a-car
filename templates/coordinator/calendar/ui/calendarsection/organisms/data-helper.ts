import { extend } from "@syncfusion/ej2-base";
import { Service } from "pages/api/coordinator/calendar";

const getNameOfService = (service: Service) =>
  !!service.wypozyczenia.length
    ? "Wypożyczenie"
    : !!service.uszkodzenia.length
    ? "Naprawa"
    : !!service.mycie.length
    ? "Mycie"
    : "Relokacja";

export type Data = {
  Id: number;
  Subject: string;
  Type: string;
  AssignedWorker: number | null;
  Client?: number;
  StartTime: Date;
  EndTime: Date;
  Description: string;
  StartTimezone: "Europe/Warsaw";
  EndTimezone: "Europe/Warsaw";
  IsReadonly: boolean;
};

export const getData = (services: Service[]) => {
  return extend(
    [],
    [
      ...services?.map((service) => {
        const serviceName = getNameOfService(service);
        return {
          Id: service.IdUslugi,
          Subject: `${serviceName} ${service.samochody.Marka} ${service.samochody.Model}`,
          Type: serviceName,
          AssignedWorker: service.pracownicy
            ? `${service.pracownicy?.uzytkownicy.Imie} ${service.pracownicy?.uzytkownicy.Nazwisko} `
            : "",
          Client: service.wypozyczenia?.[0]
            ? `${service.wypozyczenia[0].klienci?.uzytkownicy.Imie} ${service.wypozyczenia[0].klienci?.uzytkownicy.Nazwisko}`
            : "",
          StartTime: new Date(
            new Date(service.DataOd).setHours(
              new Date(service.DataOd).getHours() - 1
            )
          ),
          EndTime: new Date(
            new Date(service.DataDo).setHours(
              new Date(service.DataDo).getHours() - 1
            )
          ),
          Description: service.Opis,
          CategoryColor:
            serviceName === "Wypożyczenie"
              ? "#328ba8"
              : serviceName === "Mycie"
              ? "#91b52d"
              : serviceName === "Naprawa"
              ? "#b52d9c"
              : "#b5a32d",
          Car: `${service.samochody.Marka} ${service.samochody.Model}`,
          Location: service.relokacje?.[0]?.lokalizacje
            ? `${service.relokacje?.[0].lokalizacje.Miejscowosc}, ${service.relokacje?.[0].lokalizacje.Ulica} ${service.relokacje?.[0].lokalizacje.NumerUlicy}`
            : "",
          AutoryzowanySerwis: service?.uszkodzenia?.[0]?.AutoryzowanySerwis,
          SamodzielnaNaprawa: service?.uszkodzenia?.[0]?.SamodzielnaNaprawa,
          Warsztat: service?.uszkodzenia?.[0]?.Warsztat,
          MyjniaAutomatyczna: service?.mycie?.[0]?.MyjniaAutomatyczna,
          MyjniaBezdotykowa: service?.mycie?.[0]?.MyjniaBezdotykowa,
          MyjniaPrywatna: service?.mycie?.[0]?.MyjniaPrywatna,
          Typ_Relokacja: service.relokacje?.[0]?.Typ_Relokacja,
          CzasDojazdu: service.relokacje?.[0]?.CzasDojazdu,
          StatusUslugi: service.uslugistatus.Status,
          Employee: service.pracownicy?.uzytkownicy
            ? `${service.pracownicy?.uzytkownicy.Imie} ${service.pracownicy?.uzytkownicy.Nazwisko}`
            : "",
          StartTimezone: "Europe/Warsaw",
          EndTimezone: "Europe/Warsaw",
          IsReadonly: service.DataDo && new Date(service.DataDo) < new Date(),
        };
      }),
    ],
    undefined,
    true
  ) as Data[];
};
