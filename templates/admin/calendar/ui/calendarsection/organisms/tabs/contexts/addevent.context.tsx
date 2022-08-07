import { dodatkoweopcje, ubezpieczenia } from "@prisma/client";
import { TabComponent } from "@syncfusion/ej2-react-navigations";
import { Car, Client, Employee } from "pages/coordinator/calendar";
import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import { UslugaType } from "../../add-event.component";
import { RepairType } from "../tabcomponents/repairtypetab/repairtypetab.component";
import { DateRange } from "../tabcomponents/timerangetab/timerangetab.component";
import { WashingType } from "../tabcomponents/washingtypetab/washingtypetab.component";

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
  selectedWashingType?: WashingType;
  selectedRepairType?: RepairType;
  setSelectedService: Dispatch<React.SetStateAction<UslugaType | undefined>>;
  setSelectedClient: Dispatch<React.SetStateAction<Client | undefined>>;
  setSelectedCar: Dispatch<React.SetStateAction<Car | undefined>>;
  setSelectedDateTimeRange: Dispatch<
    React.SetStateAction<DateRange | undefined>
  >;
  setSelectedEmployee: Dispatch<React.SetStateAction<Employee | undefined>>;
  setServiceDescription: Dispatch<React.SetStateAction<string | undefined>>;
  setDeliveryEstimationTime: Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedInsurance: Dispatch<SetStateAction<ubezpieczenia | undefined>>;
  setSelectedAdditionalOptions: Dispatch<
    SetStateAction<dodatkoweopcje[] | undefined>
  >;
  setSelectedCarPickup: Dispatch<React.SetStateAction<boolean | undefined>>;
  setSelectedCarDeliver: Dispatch<React.SetStateAction<boolean | undefined>>;
  setPriceForService: Dispatch<React.SetStateAction<number | undefined>>;
  setSelectedWashingType: Dispatch<SetStateAction<WashingType | undefined>>;
  setSelectedRepairType: Dispatch<SetStateAction<RepairType | undefined>>;
  resetContextData: () => void;
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
  const [selectedWashingType, setSelectedWashingType] = useState<WashingType>();
  const [selectedRepairType, setSelectedRepairType] = useState<RepairType>();
  const [deliveryEstimationTime, setDeliveryEstimationTime] =
    useState<string>();
  const resetContextData = useCallback(() => {
    setSelectedService(undefined);
    setSelectedClient(undefined);
    setSelectedCar(undefined);
    setSelectedDateTimeRange(undefined);
    setSelectedEmployee(undefined);
    setSelectedInsurance(undefined);
    setSelectedAdditionalOptions(undefined);
    setSelectedCarPickup(undefined);
    setSelectedCarDeliver(undefined);
    setPriceForService(undefined);
    setDeliveryEstimationTime(undefined);
    setSelectedWashingType(undefined);
    setSelectedRepairType(undefined);
  }, [
    setSelectedService,
    setSelectedClient,
    setSelectedCar,
    setSelectedDateTimeRange,
    setSelectedEmployee,
    setSelectedInsurance,
    setSelectedAdditionalOptions,
    setSelectedCarPickup,
    setSelectedCarDeliver,
    setPriceForService,
    setDeliveryEstimationTime,
    setSelectedWashingType,
    setSelectedRepairType,
  ]);
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
        selectedWashingType,
        setSelectedWashingType,
        selectedRepairType,
        setSelectedRepairType,
        resetContextData,
      }}
    >
      {children}
    </AddEventContext.Provider>
  );
};

export default AddEventContextProvider;
