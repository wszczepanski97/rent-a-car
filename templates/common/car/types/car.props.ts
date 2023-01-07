import { dodatkoweopcje } from "@prisma/client";
import { CarDetails } from "./cardetails.type";

export type CarPageProps = {
  car: CarDetails;
  additionalRentOptions: dodatkoweopcje[];
};
