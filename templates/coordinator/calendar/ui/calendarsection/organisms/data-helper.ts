import { Service } from "pages/coordinator/calendar";
import { extend } from "@syncfusion/ej2-base";

const getNameOfService = (service: Service) =>
  !!service.wypozyczenia.length
    ? "Wypożyczenie"
    : !!service.uszkodzenia.length
    ? "Naprawa"
    : "Mycie";

export type Data = {
  Id: number;
  Subject: string;
  Client?: number;
  StartTime: Date;
  EndTime: Date;
  Description: string;
  Type: string;
  AssignedWorker: number | null;
  StartTimezone: "Europe/Warsaw";
  EndTimezone: "Europe/Warsaw";
  IsReadonly: boolean;
};

export const getData = (services: Service[]) => {
  const relokacje = services
    .map((service) => service.wypozyczenia)
    .filter((service) => !!service.length)
    .flat()
    .map((service) => service.relokacje)
    .filter((service) => !!service.length)
    .flat();
  return extend(
    [],
    [
      ...services?.map((service) => {
        const serviceName = getNameOfService(service);
        return {
          Id: service.IdUslugi,
          Subject: `${serviceName} ${service.samochody.Marka} ${service.samochody.Model}`,
          Client: service.wypozyczenia?.[0]?.IdKlienci,
          CategoryColor:
            serviceName === "Wypożyczenie"
              ? "#328ba8"
              : serviceName === "Mycie"
              ? "#91b52d"
              : serviceName === "Naprawa"
              ? "#b52d9c"
              : "#b5a32d",
          StartTime: new Date(
            new Date(service.DataOd).setHours(
              new Date(service.DataOd).getHours() - 2
            )
          ),
          EndTime: new Date(
            new Date(service.DataDo).setHours(
              new Date(service.DataDo).getHours() - 2
            )
          ),
          Description: service.Opis,
          Type: serviceName,
          AssignedWorker: service.IdPracownicy_Przypisanie,
          // Location: service.,
          StartTimezone: "Europe/Warsaw",
          EndTimezone: "Europe/Warsaw",
          IsReadonly: service.DataDo && new Date(service.DataDo) < new Date(),
        };
      }),
      ...relokacje.map((relokacja) => ({
        Id: relokacja.IdRelokacje,
        Subject: `Relokacja ${relokacja.Typ_Relokacja} ${relokacja.wypozyczenia.uslugi.samochody.Marka} ${relokacja.wypozyczenia.uslugi.samochody.Model}`,
        Client: `${relokacja.wypozyczenia.klienci.uzytkownicy.Imie} ${relokacja.wypozyczenia.klienci.uzytkownicy.Nazwisko}`,
        CategoryColor: "#b5a32d",
        StartTime: new Date(
          new Date(relokacja.DataOd).setHours(
            new Date(relokacja.DataOd).getHours() - 2
          )
        ),
        EndTime: new Date(
          new Date(relokacja.DataDo).setHours(
            new Date(relokacja.DataDo).getHours() - 2
          )
        ),
        Description: relokacja.wypozyczenia.uslugi.Opis,
        Type: "Relokacja",
        AssignedWorker:
          relokacja.Typ_Relokacja === "Podstawienie"
            ? relokacja.IdPracownicy_Podstawienie
            : relokacja.IdPracownicy_Odbior,
        Location:
          relokacja.Typ_Relokacja === "Podstawienie"
            ? relokacja.IdLokalizacje_Podstawienie
            : relokacja.IdLokalizacje_Odbior,
        StartTimezone: "Europe/Warsaw",
        EndTimezone: "Europe/Warsaw",
        IsReadonly: relokacja.DataDo && new Date(relokacja.DataDo) < new Date(),
      })),
    ],
    undefined,
    true
  ) as Data[];
};
