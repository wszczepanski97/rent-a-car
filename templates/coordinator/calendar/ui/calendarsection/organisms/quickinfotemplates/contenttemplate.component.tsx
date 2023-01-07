import { Client, Employee } from "pages/api/coordinator/calendar";
import { FC } from "react";
import { RelocationType } from "templates/driver/calendar/ui/calendarsection/organisms/tabs/tabcomponents/relocationtypetab/relocationtypetab.component";

type ContentTemplateProps = {
  StartTime: Date;
  EndTime: Date;
  AssignedWorker: number | null;
  Client?: number | undefined;
  AutoryzowanySerwis?: boolean;
  SamodzielnaNaprawa?: boolean;
  Warsztat?: boolean;
  MyjniaBezdotykowa?: boolean;
  MyjniaAutomatyczna?: boolean;
  MyjniaPrywatna?: boolean;
  Description?: string;
  Car?: string;
  Typ_Relokacja?: RelocationType;
  CzasDojazdu?: string;
  Location?: string;
  StatusUslugi?: string;
};

const ContentTemplate: FC<ContentTemplateProps> = ({
  Client,
  StartTime,
  EndTime,
  AssignedWorker,
  AutoryzowanySerwis,
  SamodzielnaNaprawa,
  Warsztat,
  MyjniaBezdotykowa,
  MyjniaAutomatyczna,
  MyjniaPrywatna,
  Description,
  Car,
  Typ_Relokacja,
  CzasDojazdu,
  Location,
  StatusUslugi,
}) => {
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
      {AssignedWorker && (
        <div className="e-resource">
          <div className="e-resource-icon e-icons"></div>
          <div className="e-resource-details e-text-ellipsis">
            {AssignedWorker}
          </div>
        </div>
      )}
      {Client && (
        <div
          className="e-resource e-resource-details"
          style={{ display: "flex", gap: 5 }}
        >
          <span style={{ fontWeight: 700 }}>Klient: </span>
          <div className="e-resource-details e-text-ellipsis">{Client}</div>
        </div>
      )}
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
      {(MyjniaBezdotykowa || MyjniaAutomatyczna || MyjniaPrywatna) && (
        <div
          className="e-resource e-resource-details"
          style={{ display: "flex", gap: 5 }}
        >
          <span style={{ fontWeight: 700 }}>Typ mycia: </span>
          <span className="e-resource-details e-text-ellipsis">
            {MyjniaBezdotykowa
              ? "Myjnia bezdotykowa"
              : MyjniaAutomatyczna
              ? "Myjnia automatyczna"
              : "Myjnia prywatna"}
          </span>
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
      {StatusUslugi && (
        <div
          className="e-resource e-resource-details"
          style={{ display: "flex", gap: 5 }}
        >
          <span style={{ fontWeight: 700 }}>Status usługi: </span>
          <span className="e-resource-details e-text-ellipsis">
            {StatusUslugi}
          </span>
        </div>
      )}
    </div>
  );
};

export default ContentTemplate;
