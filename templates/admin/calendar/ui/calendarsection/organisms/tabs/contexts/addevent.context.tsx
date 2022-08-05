import { TabComponent } from "@syncfusion/ej2-react-navigations";
import { Client, Employee } from "pages/coordinator/calendar";
import { createContext, FC, useRef, useState } from "react";
import { UslugaType } from "../../add-event.component";
import { DateRange } from "../tab3.component";

export type AddEventContextInterface = {
  currentTab: React.MutableRefObject<TabComponent | null>;
  selectedService?: UslugaType;
  selectedClient?: Client;
  selectedCar?: Object;
  selectedDateTimeRange?: DateRange;
  selectedEmployee?: Employee;
  serviceDescription?: string;
  setSelectedService: React.Dispatch<
    React.SetStateAction<UslugaType | undefined>
  >;
  setSelectedClient: React.Dispatch<React.SetStateAction<Client | undefined>>;
  setSelectedCar: React.Dispatch<React.SetStateAction<Object | undefined>>;
  setSelectedDateTimeRange: React.Dispatch<
    React.SetStateAction<DateRange | undefined>
  >;
  setSelectedEmployee: React.Dispatch<
    React.SetStateAction<Employee | undefined>
  >;
  setServiceDescription: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
};

export const AddEventContext = createContext({} as AddEventContextInterface);

const AddEventContextProvider: FC = ({ children }) => {
  let currentTab = useRef<TabComponent | null>(null);
  const [selectedService, setSelectedService] = useState<UslugaType>();
  const [selectedClient, setSelectedClient] = useState<Client>();
  const [selectedCar, setSelectedCar] = useState<Object>();
  const [selectedDateTimeRange, setSelectedDateTimeRange] =
    useState<DateRange>();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
  const [serviceDescription, setServiceDescription] = useState<string>();
  return (
    <AddEventContext.Provider
      value={{
        currentTab,
        selectedService,
        setSelectedService,
        selectedClient,
        setSelectedClient,
        selectedCar,
        setSelectedCar,
        selectedDateTimeRange,
        setSelectedDateTimeRange,
        selectedEmployee,
        setSelectedEmployee,
        serviceDescription,
        setServiceDescription,
      }}
    >
      {children}
    </AddEventContext.Provider>
  );
};

export default AddEventContextProvider;
