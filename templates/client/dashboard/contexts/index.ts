import { createContext } from "react";
import { Cars } from "templates/common/types";

export const DashboardPageContext = createContext([] as Cars[]);
