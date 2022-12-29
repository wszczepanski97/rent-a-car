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
          PickLocation: service.relokacje?.[0]
            ?.lokalizacje_lokalizacjeTorelokacje_IdLokalizacje_Podstawienie
            ? `${service.relokacje?.[0]?.lokalizacje_lokalizacjeTorelokacje_IdLokalizacje_Podstawienie.Miejscowosc}, ${service.relokacje?.[0]?.lokalizacje_lokalizacjeTorelokacje_IdLokalizacje_Podstawienie.Ulica} ${service.relokacje?.[0]?.lokalizacje_lokalizacjeTorelokacje_IdLokalizacje_Podstawienie.NumerUlicy}`
            : "",
          ReturnLocation: service.relokacje?.[0]
            ?.lokalizacje_lokalizacjeTorelokacje_IdLokalizacje_Odbior
            ? `${service.relokacje?.[0]?.lokalizacje_lokalizacjeTorelokacje_IdLokalizacje_Odbior.Miejscowosc}, ${service.relokacje?.[0]?.lokalizacje_lokalizacjeTorelokacje_IdLokalizacje_Odbior.Ulica} ${service.relokacje?.[0]?.lokalizacje_lokalizacjeTorelokacje_IdLokalizacje_Odbior.NumerUlicy}`
            : "",
          PickEmployee: service.relokacje?.[0]
            ?.pracownicy_pracownicyTorelokacje_IdPracownicy_Podstawienie
            ? `${service.relokacje?.[0]?.pracownicy_pracownicyTorelokacje_IdPracownicy_Podstawienie?.uzytkownicy.Imie} ${service.relokacje?.[0]?.pracownicy_pracownicyTorelokacje_IdPracownicy_Podstawienie?.uzytkownicy.Nazwisko}`
            : "",
          ReturnEmployee: service.relokacje?.[0]
            ?.pracownicy_pracownicyTorelokacje_IdPracownicy_Odbior
            ? `${service.relokacje?.[0]?.pracownicy_pracownicyTorelokacje_IdPracownicy_Odbior?.uzytkownicy.Imie} ${service.relokacje?.[0]?.pracownicy_pracownicyTorelokacje_IdPracownicy_Odbior?.uzytkownicy.Nazwisko}`
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
