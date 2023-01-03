import { extend } from "@syncfusion/ej2-base";
import { Service } from "pages/api/mechanic/calendar";

export type Data = {
  Id: number;
  Subject: string;
  CategoryColor: string;
  StartTime: Date;
  EndTime: Date;
  Car: string;
  AutoryzowanySerwis: boolean;
  SamodzielnaNaprawa: boolean;
  Warsztat: boolean;
  Description: string;
  Type: string;
  AssignedWorker: number | null;
  StartTimezone: "Europe/Warsaw";
  EndTimezone: "Europe/Warsaw";
  IsReadonly: boolean;
};

export const getData: (services: Service[]) => Data[] | null = (services) =>
  services
    ? (extend(
        [],
        [
          ...services.map((service) => {
            return {
              Id: service!.IdUslugi,
              Subject: `Naprawa ${service!.samochody.Marka} ${
                service!.samochody.Model
              }`,
              CategoryColor: "#b52d9c",
              StartTime: new Date(
                new Date(service!.DataOd).setHours(
                  new Date(service!.DataOd).getHours() - 1
                )
              ),
              EndTime: new Date(
                new Date(service!.DataDo).setHours(
                  new Date(service!.DataDo).getHours() - 1
                )
              ),
              Car: `${service?.samochody.Marka} ${service?.samochody.Model}`,
              AutoryzowanySerwis: service?.uszkodzenia[0].AutoryzowanySerwis,
              SamodzielnaNaprawa: service?.uszkodzenia[0].SamodzielnaNaprawa,
              Warsztat: service?.uszkodzenia[0].Warsztat,
              Description: service!.Opis,
              Type: "Uszkodzenie",
              AssignedWorker: service!.IdPracownicy_Przypisanie,
              StartTimezone: "Europe/Warsaw",
              EndTimezone: "Europe/Warsaw",
              IsReadonly:
                service!.DataDo && new Date(service!.DataDo) < new Date(),
            };
          }),
        ],
        undefined,
        true
      ) as Data[])
    : null;
