import { dodatkoweopcje, ubezpieczenia } from "@prisma/client";
import { TabComponent } from "@syncfusion/ej2-react-navigations";
import { Car, Client, Employee } from "pages/coordinator/calendar";
import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { UslugaType } from "../../add-event.component";
import { DateRange } from "../tabcomponents/timerangetab/timerangetab.component";

export type AddEventContextInterface = {
  currentTab: React.MutableRefObject<TabComponent | null>;
  selectedService?: UslugaType;
  selectedClient?: Client;
  selectedCar?: Car;
  selectedDateTimeRange?: DateRange;
  selectedEmployee?: Employee;
  serviceDescription?: string;
  selectedInsurance?: ubezpieczenia;
  selectedAdditionalOptions?: dodatkoweopcje[];
  deliveryEstimationTime?: string;
  selectedCarPickup?: boolean;
  selectedCarDeliver?: boolean;
  priceForService?: number;
  setSelectedService: React.Dispatch<
    React.SetStateAction<UslugaType | undefined>
  >;
  setSelectedClient: React.Dispatch<React.SetStateAction<Client | undefined>>;
  setSelectedCar: React.Dispatch<React.SetStateAction<Car | undefined>>;
  setSelectedDateTimeRange: React.Dispatch<
    React.SetStateAction<DateRange | undefined>
  >;
  setSelectedEmployee: React.Dispatch<
    React.SetStateAction<Employee | undefined>
  >;
  setServiceDescription: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setDeliveryEstimationTime: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setSelectedInsurance: Dispatch<SetStateAction<ubezpieczenia | undefined>>;
  setSelectedAdditionalOptions: Dispatch<
    SetStateAction<dodatkoweopcje[] | undefined>
  >;
  setSelectedCarPickup: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
  setSelectedCarDeliver: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
  setPriceForService: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const AddEventContext = createContext({} as AddEventContextInterface);

const AddEventContextProvider: FC = ({ children }) => {
  let currentTab = useRef<TabComponent | null>(null);
  const [selectedService, setSelectedService] = useState<UslugaType>();
  const [selectedClient, setSelectedClient] = useState<Client>();
  const [selectedCar, setSelectedCar] = useState<Car>();
  const [selectedDateTimeRange, setSelectedDateTimeRange] =
    useState<DateRange>();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
  const [serviceDescription, setServiceDescription] = useState<string>();
  const [selectedInsurance, setSelectedInsurance] = useState<ubezpieczenia>();
  const [selectedAdditionalOptions, setSelectedAdditionalOptions] =
    useState<dodatkoweopcje[]>();
  const [selectedCarPickup, setSelectedCarPickup] = useState<boolean>();
  const [selectedCarDeliver, setSelectedCarDeliver] = useState<boolean>();
  const [priceForService, setPriceForService] = useState<number>();
  const [deliveryEstimationTime, setDeliveryEstimationTime] =
    useState<string>();
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
        deliveryEstimationTime,
        setDeliveryEstimationTime,
        selectedInsurance,
        setSelectedInsurance,
        selectedAdditionalOptions,
        setSelectedAdditionalOptions,
        selectedCarPickup,
        setSelectedCarPickup,
        selectedCarDeliver,
        setSelectedCarDeliver,
        priceForService,
        setPriceForService,
      }}
    >
      {children}
    </AddEventContext.Provider>
  );
};

export default AddEventContextProvider;
