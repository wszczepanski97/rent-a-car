import { FC, useContext } from "react";
import { CalendarContext } from "templates/mechanic/calendar/contexts/calendar.context";

type ContentTemplateProps = {
  AutoryzowanySerwis: boolean;
  SamodzielnaNaprawa: boolean;
  Warsztat: boolean;
  Description: string;
  Car: string;
  StartTime: Date;
  EndTime: Date;
};

const ContentTemplate: FC<ContentTemplateProps> = ({
  AutoryzowanySerwis,
  SamodzielnaNaprawa,
  Warsztat,
  Description,
  Car,
  EndTime,
  StartTime,
}) => {
  const { mechanic } = useContext(CalendarContext);
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

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
      <div className="e-resource">
        <div className="e-resource-icon e-icons"></div>
        <div className="e-resource-details e-text-ellipsis">
          {`${mechanic?.Imie} ${mechanic?.Nazwisko}`}
        </div>
      </div>
      {Car && (
        <div
          className="e-resource e-resource-details"
          style={{ display: "flex", gap: 5 }}
        >
          <span style={{ fontWeight: 700 }}>Samochód: </span>
          <div className="e-resource-details e-text-ellipsis">{Car}</div>
        </div>
      )}
      {(AutoryzowanySerwis || SamodzielnaNaprawa || Warsztat) && (
        <div
          className="e-resource e-resource-details"
          style={{ display: "flex", gap: 5 }}
        >
          <span style={{ fontWeight: 700 }}>Typ naprawy: </span>
          <span className="e-resource-details e-text-ellipsis">
            {AutoryzowanySerwis
              ? "Autoryzowany serwis"
              : SamodzielnaNaprawa
              ? "Samodzielna naprawa"
              : "Warsztat"}
          </span>
        </div>
      )}
      {Description && (
        <div className="e-description">
          <div className="e-description-icon e-icons"></div>
          <div className="e-description-details e-text-ellipsis">
            {Description}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentTemplate;
