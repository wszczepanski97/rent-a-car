import { Client, Employee } from "pages/api/coordinator/calendar";
import { FC } from "react";
import { Data } from "../data-helper";

type ContentTemplateProps = {
  clients: Client[];
  employees: Employee[];
  StartTime: Date;
  EndTime: Date;
  AssignedWorker: number | null;
  Client?: number | undefined;
};

const ContentTemplate: FC<ContentTemplateProps> = ({
  clients,
  employees,
  StartTime,
  EndTime,
  AssignedWorker,
  Client,
}) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const employeeData = employees.find(
    (employee) => employee.IdPracownicy === AssignedWorker
  );
  const clientData = clients.find((client) => client.IdKlienci === Client);

  return (
    <div className="e-popup-content">
      <div className="e-date-time">
        <div className="e-date-time-icon e-icons"></div>
        <div className="e-date-time-wrapper e-text-ellipsis">
          <div className="e-date-time-details e-text-ellipsis">
            {StartTime.toDateString() === EndTime.toDateString()
              ? `${StartTime.toLocaleDateString(
                  "pl-PL",
                  dateOptions
                )} (${StartTime.toLocaleTimeString().replace(
                  /:00$/,
                  ""
                )} - ${EndTime.toLocaleTimeString().replace(/:00$/, "")})`
              : `${StartTime.toLocaleDateString(
                  "pl-PL",
                  dateOptions
                )} (${StartTime.toLocaleTimeString().replace(
                  /:00$/,
                  ""
                )}) - ${EndTime.toLocaleDateString(
                  "pl-PL",
                  dateOptions
                )} (${EndTime.toLocaleTimeString().replace(/:00$/, "")})`}
          </div>
        </div>
      </div>
      {employeeData && (
        <div className="e-resource">
          <div className="e-resource-icon e-icons"></div>
          <div className="e-resource-details e-text-ellipsis">
            {`${employeeData?.uzytkownicy.Imie} ${employeeData?.uzytkownicy.Nazwisko}`}
          </div>
        </div>
      )}
      {clientData && (
        <div className="e-resource">
          <div
            className="e-user e-icons"
            style={{ fontSize: 18, width: 26 }}
          ></div>
          <div className="e-resource-details e-text-ellipsis">
            {clientData?.uzytkownicy.Imie} {clientData?.uzytkownicy.Nazwisko}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentTemplate;
