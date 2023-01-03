import React, { FC } from "react";

type PickupRelocationInfoProps = {
  DataOd: Date;
  DataDo: Date;
};

const PickupRelocationInfo: FC<PickupRelocationInfoProps> = ({
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
    <p> Dla wypożyczenia istnieje juz podstawienie w dacie:</p>
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
    <p>Nie możesz utworzyć drugiego podstawienia.</p>
    <p>
      Jeśli chcesz je edytować, skorzystaj <u>z kalendarza.</u>
    </p>
    <p>
      Jedyną możliwą akcją jest stworzenie <b>odbioru.</b>
    </p>
  </div>
);

export default PickupRelocationInfo;
