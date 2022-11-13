import { createContext } from "react";
import { Car } from "types/car/car.type";

export const DashboardPageContext = createContext([] as Car[]);
