import { dodatkoweopcje, lokalizacje, ubezpieczenia } from "@prisma/client";
import { TabComponent } from "@syncfusion/ej2-react-navigations";
import { Car, Client, Employee } from "pages/api/coordinator/calendar";
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
  setSelectedService: Dispatch<React.SetStateAction<UslugaType | undefined>>;
  selectedClient?: Client;
  setSelectedClient: Dispatch<React.SetStateAction<Client | undefined>>;
  selectedCar?: Car;
  setSelectedCar: Dispatch<React.SetStateAction<Car | undefined>>;
  selectedDateTimeRange?: DateRange;
  setSelectedDateTimeRange: Dispatch<
    React.SetStateAction<DateRange | undefined>
  >;
  selectedEmployee?: Employee;
  setSelectedEmployee: Dispatch<React.SetStateAction<Employee | undefined>>;
  selectedCarPickupEmployee?: Employee;
  setSelectedCarPickupEmployee: Dispatch<
    React.SetStateAction<Employee | undefined>
  >;
  selectedCarDeliverEmployee?: Employee;
  setSelectedCarDeliverEmployee: Dispatch<
    React.SetStateAction<Employee | undefined>
  >;
  serviceDescription?: string;
  setServiceDescription: Dispatch<React.SetStateAction<string | undefined>>;
  selectedInsurance?: ubezpieczenia;
  setSelectedInsurance: Dispatch<SetStateAction<ubezpieczenia | undefined>>;
  selectedAdditionalOptions?: dodatkoweopcje[];
  setSelectedAdditionalOptions: Dispatch<
    SetStateAction<dodatkoweopcje[] | undefined>
  >;
  selectedCarPickup: boolean;
  setSelectedCarPickup: Dispatch<React.SetStateAction<boolean>>;
  selectedCarPickupLocation?: lokalizacje;
  setSelectedCarPickupLocation: Dispatch<
    SetStateAction<lokalizacje | undefined>
  >;
  selectedCarDeliverLocation?: lokalizacje;
  setSelectedCarDeliverLocation: Dispatch<
    SetStateAction<lokalizacje | undefined>
  >;
  selectedCarDeliver: boolean;
  setSelectedCarDeliver: Dispatch<React.SetStateAction<boolean>>;
  deliveryEstimationTime?: string;
  setDeliveryEstimationTime: Dispatch<React.SetStateAction<string>>;
  pickupEstimationTime?: string;
  setPickupEstimationTime: Dispatch<React.SetStateAction<string>>;
  priceForService?: number;
  setPriceForService: Dispatch<React.SetStateAction<number | undefined>>;
  selectedWashingType?: WashingType;
  setSelectedWashingType: Dispatch<SetStateAction<WashingType | undefined>>;
  selectedRepairType?: RepairType;
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
  const [selectedInsurance, setSelectedInsurance] = useState<ubezpieczenia>();
  const [selectedAdditionalOptions, setSelectedAdditionalOptions] =
    useState<dodatkoweopcje[]>();
  const [selectedCarPickup, setSelectedCarPickup] = useState(false);
  const [selectedCarDeliver, setSelectedCarDeliver] = useState(false);
  const [selectedCarPickupLocation, setSelectedCarPickupLocation] =
    useState<lokalizacje>();
  const [selectedCarDeliverLocation, setSelectedCarDeliverLocation] =
    useState<lokalizacje>();
  const [selectedCarPickupEmployee, setSelectedCarPickupEmployee] =
    useState<Employee>();
  const [selectedCarDeliverEmployee, setSelectedCarDeliverEmployee] =
    useState<Employee>();
  const [serviceDescription, setServiceDescription] = useState<string>();
  const [priceForService, setPriceForService] = useState<number>();
  const [selectedWashingType, setSelectedWashingType] = useState<WashingType>();
  const [selectedRepairType, setSelectedRepairType] = useState<RepairType>();
  const [deliveryEstimationTime, setDeliveryEstimationTime] =
    useState<string>("0");
  const [pickupEstimationTime, setPickupEstimationTime] = useState<string>("0");
  const resetContextData = useCallback(() => {
    setSelectedService(undefined);
    setSelectedClient(undefined);
    setSelectedCar(undefined);
    setSelectedDateTimeRange(undefined);
    setSelectedEmployee(undefined);
    setSelectedInsurance(undefined);
    setSelectedAdditionalOptions(undefined);
    setSelectedCarPickup(false);
    setSelectedCarDeliver(false);
    setSelectedCarPickupEmployee(undefined);
    setSelectedCarDeliverEmployee(undefined);
    setServiceDescription(undefined);
    setPriceForService(undefined);
    setSelectedWashingType(undefined);
    setSelectedRepairType(undefined);
    setDeliveryEstimationTime("0");
    setPickupEstimationTime("0");
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
    setSelectedCarPickupEmployee,
    setSelectedCarDeliverEmployee,
    setServiceDescription,
    setPriceForService,
    setSelectedWashingType,
    setSelectedRepairType,
    setDeliveryEstimationTime,
    setPickupEstimationTime,
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
        selectedInsurance,
        setSelectedInsurance,
        selectedAdditionalOptions,
        setSelectedAdditionalOptions,
        selectedCarPickup,
        setSelectedCarPickup,
        selectedCarDeliver,
        setSelectedCarDeliver,
        selectedCarPickupEmployee,
        setSelectedCarPickupEmployee,
        selectedCarDeliverEmployee,
        setSelectedCarDeliverEmployee,
        serviceDescription,
        setServiceDescription,
        priceForService,
        setPriceForService,
        selectedWashingType,
        setSelectedWashingType,
        selectedRepairType,
        setSelectedRepairType,
        selectedCarPickupLocation,
        setSelectedCarPickupLocation,
        selectedCarDeliverLocation,
        setSelectedCarDeliverLocation,
        deliveryEstimationTime,
        setDeliveryEstimationTime,
        pickupEstimationTime,
        setPickupEstimationTime,
        resetContextData,
      }}
    >
      {children}
    </AddEventContext.Provider>
  );
};

export default AddEventContextProvider;
