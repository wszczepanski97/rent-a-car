import { FC } from "react";
import { Photo } from "ui";

const CardDetails: FC<CardDetailsProps> = ({
  numberOfSeats,
  fuelType,
  carBody,
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: 100,
      }}
    >
      <Photo
        src="/images/FuelType.webp"
        size={{ height: "25", width: "18" }}
        alt="Fuel type"
      />
      <h6>{fuelType}</h6>
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: 100,
      }}
    >
      <Photo
        src="/images/NumberOfSeats.png"
        size={{ height: "25", width: "18" }}
        alt="Number of seats"
      />
      <h6>{numberOfSeats}</h6>
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: 100,
      }}
    >
      <Photo
        src="/images/CarBody.png"
        size={{ height: "25", width: "50" }}
        alt="Car body"
      />
      <h6>{carBody}</h6>
    </div>
  </div>
);

export type CardDetailsProps = {
  numberOfSeats: string;
  fuelType: string;
  carBody: string;
};

export default CardDetails;
