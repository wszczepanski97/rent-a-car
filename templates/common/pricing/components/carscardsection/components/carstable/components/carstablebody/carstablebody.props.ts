import { Row } from "react-table";
import { Car } from "types/car/car.type";

export type CarsTableBodyProps = {
  page: Row<Car>[];
  prepareRow(row: Row<Car>): void;
};
