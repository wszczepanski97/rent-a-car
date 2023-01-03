import React, { FC } from "react";

type DeliveryRelocationInfoProps = {
  DataOd: Date;
  DataDo: Date;
};

const DeliveryRelocationInfo: FC<DeliveryRelocationInfoProps> = ({
  DataOd,
  DataDo,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <p> Dla wypożyczenia istnieje juz odbiór w dacie:</p>
    <p>
      <b>
        {new Date(
          new Date(DataOd).getTime() +
            new Date(DataOd).getTimezoneOffset() * 60 * 1000
        ).toLocaleString()}
        -{" "}
        {new Date(
          new Date(DataDo).getTime() +
            new Date(DataDo).getTimezoneOffset() * 60 * 1000
        ).toLocaleString()}
      </b>
    </p>
    <p>Nie możesz utworzyć drugiego odbioru.</p>
    <p>
      Jeśli chcesz je edytować, skorzystaj <u>z kalendarza.</u>
    </p>
    <p>
      Jedyną możliwą akcją jest stworzenie <b>podstawienia.</b>
    </p>
  </div>
);

export default DeliveryRelocationInfo;
