import { FC, useContext } from "react";
import { CalendarContext } from "templates/driver/calendar/contexts/calendar.context";
import { RelocationType } from "../tabs/tabcomponents/relocationtypetab/relocationtypetab.component";

type ContentTemplateProps = {
  Typ_Relokacja: RelocationType;
  Description: string;
  CzasDojazdu: string;
  Location: string;
  Car: string;
  StartTime: Date;
  EndTime: Date;
};

const ContentTemplate: FC<ContentTemplateProps> = ({
  Typ_Relokacja,
  Description,
  CzasDojazdu,
  Location,
  Car,
  EndTime,
  StartTime,
}) => {
  const { driver } = useContext(CalendarContext);
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
          {`${driver?.Imie} ${driver?.Nazwisko}`}
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
      {Typ_Relokacja && (
        <div
          className="e-resource e-resource-details"
          style={{ display: "flex", gap: 5 }}
        >
          <span style={{ fontWeight: 700 }}>Typ relokacji: </span>
          <span className="e-resource-details e-text-ellipsis">
            {Typ_Relokacja}
          </span>
        </div>
      )}
      {CzasDojazdu && (
        <div
          className="e-resource e-resource-details"
          style={{ display: "flex", gap: 5 }}
        >
          <span style={{ fontWeight: 700 }}>Czas dojazdu : </span>
          <span className="e-resource-details e-text-ellipsis">
            {`${CzasDojazdu}h`}
          </span>
        </div>
      )}
      {Location && (
        <div
          className="e-resource e-resource-details"
          style={{ display: "flex", gap: 5 }}
        >
          <span style={{ fontWeight: 700 }}>Miejsce dowozu: </span>
          <span className="e-resource-details e-text-ellipsis">{Location}</span>
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
