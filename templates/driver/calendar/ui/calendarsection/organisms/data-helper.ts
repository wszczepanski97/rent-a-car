import { extend } from "@syncfusion/ej2-base";
import { Service } from "pages/driver/calendar";

export type Data = {
  Id: number;
  Subject: string;
  StartTime: Date;
  EndTime: Date;
  Description: string;
  Type: string;
  AssignedWorker: number | null;
  StartTimezone: "Europe/Warsaw";
  EndTimezone: "Europe/Warsaw";
  IsReadonly: boolean;
};

export const getData = (services: Service[]) =>
  services
    ? (extend(
        [],
        [
          ...services.map((service) => {
            return {
              Id: service!.IdUslugi,
              Subject: `Wypozyczenie ${service!.uslugi.samochody.Marka} ${
                service!.uslugi.samochody.Model
              }`,
              CategoryColor: "#91b52d",
              StartTime: new Date(
                new Date(service!.uslugi.DataOd).setHours(
                  new Date(service!.uslugi.DataOd).getHours() - 1
                )
              ),
              EndTime: new Date(
                new Date(service!.uslugi.DataDo).setHours(
                  new Date(service!.uslugi.DataDo).getHours() - 1
                )
              ),
              Type: "Wypozyczenie",
              StartTimezone: "Europe/Warsaw",
              EndTimezone: "Europe/Warsaw",
              IsReadonly: true,
            };
          }),
          ...services
            .map((service) => service.relokacje.flat())
            .map((relocations) => {
              return relocations
                ?.map((relokacja) => {
                  return {
                    Id: relokacja!.IdUslugi,
                    Subject: `Relokacja ${relokacja.Typ_Relokacja} ${relokacja.uslugi?.samochody.Marka} ${relokacja.uslugi?.samochody.Model}`,
                    CategoryColor: "#b5a32d",
                    CzasDojazdu: relokacja.CzasDojazdu,
                    IdWypozyczenia: relokacja.IdWypozyczenia,
                    IdUslugi: relokacja.IdUslugi,
                    StartTime:
                      relokacja.uslugi?.DataOd &&
                      new Date(
                        new Date(relokacja.uslugi?.DataOd).setHours(
                          new Date(relokacja.uslugi?.DataOd).getHours() - 1
                        )
                      ),
                    EndTime:
                      relokacja.uslugi?.DataDo &&
                      new Date(
                        new Date(relokacja.uslugi?.DataDo).setHours(
                          new Date(relokacja.uslugi?.DataDo).getHours() - 1
                        )
                      ),
                    Description: relokacja.uslugi?.Opis,
                    Type: "Relokacja",
                    Typ_Relokacja: relokacja.Typ_Relokacja,
                    AssignedWorker: `${relokacja.uslugi.pracownicy.uzytkownicy.Imie} ${relokacja.uslugi.pracownicy.uzytkownicy.Nazwisko}`,
                    Location: `${relokacja.lokalizacje.Miejscowosc}, ${relokacja.lokalizacje.Ulica} ${relokacja.lokalizacje.NumerUlicy}`,
                    StartTimezone: "Europe/Warsaw",
                    EndTimezone: "Europe/Warsaw",
                    IsReadonly:
                      relokacja.uslugi?.DataDo &&
                      new Date(relokacja.uslugi.DataDo) < new Date(),
                  };
                })
                .flat();
            })
            .flat(),
        ],
        undefined,
        true
      ) as Data[])
    : null;
