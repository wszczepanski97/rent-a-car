import { extend } from "@syncfusion/ej2-base";
import { Service } from "pages/api/cleaner/calendar";

export type Data = {
  Id: number;
  Subject: string;
  CategoryColor: string;
  StartTime: Date;
  EndTime: Date;
  Car: string;
  MyjniaAutomatyczna: boolean;
  MyjniaBezdotykowa: boolean;
  MyjniaPrywatna: boolean;
  Description: string;
  Type: string;
  AssignedWorker: number | null;
  StartTimezone: "Europe/Warsaw";
  EndTimezone: "Europe/Warsaw";
  IsReadonly: boolean;
};

export const getData = (services: Service[]) => {
  return services
    ? (extend(
        [],
        [
          ...services.map((service) => {
            return {
              Id: service!.IdUslugi,
              Subject: `Mycie ${service!.samochody.Marka} ${
                service!.samochody.Model
              }`,
              CategoryColor: "#91b52d",
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
              MyjniaAutomatyczna: service?.mycie[0].MyjniaAutomatyczna,
              MyjniaBezdotykowa: service?.mycie[0].MyjniaBezdotykowa,
              MyjniaPrywatna: service?.mycie[0].MyjniaPrywatna,
              Description: service!.Opis,
              Type: "Mycie",
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
};
