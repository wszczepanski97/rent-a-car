import { dodatkoweopcje } from "@prisma/client";
import { CarDetails } from "templates/common/car/types/cardetails.type";

export type RentCardProps = {
  car: CarDetails;
  additionalRentOptions: dodatkoweopcje[];
};
