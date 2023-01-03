import { TabComponent } from "@syncfusion/ej2-react-navigations";
import { Car } from "pages/api/mechanic/calendar";
import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import { RepairType } from "../tabcomponents/repairtypetab/repairtypetab.component";
import { DateRange } from "../tabcomponents/timerangerepairtab/timerangerepairtab.component";

export type AddEventContextInterface = {
  currentTab: React.MutableRefObject<TabComponent | null>;
  selectedCar?: Car;
  setSelectedCar: Dispatch<React.SetStateAction<Car | undefined>>;
  selectedDateTimeRange?: DateRange;
  setSelectedDateTimeRange: Dispatch<
    React.SetStateAction<DateRange | undefined>
  >;
  serviceDescription?: string;
  setServiceDescription: Dispatch<React.SetStateAction<string | undefined>>;
  selectedRepairType?: RepairType;
  setSelectedRepairType: Dispatch<SetStateAction<RepairType | undefined>>;
  resetContextData: () => void;
};

export const AddEventContext = createContext({} as AddEventContextInterface);

const AddEventContextProvider: FC = ({ children }) => {
  let currentTab = useRef<TabComponent | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car>();
  const [selectedDateTimeRange, setSelectedDateTimeRange] =
    useState<DateRange>();
  const [serviceDescription, setServiceDescription] = useState<string>();
  const [selectedRepairType, setSelectedRepairType] = useState<RepairType>();
  const resetContextData = useCallback(() => {
    setSelectedCar(undefined);
    setSelectedDateTimeRange(undefined);
    setServiceDescription(undefined);
    setSelectedRepairType(undefined);
  }, [
    setSelectedCar,
    setSelectedDateTimeRange,
    setServiceDescription,
    setSelectedRepairType,
  ]);
  return (
    <AddEventContext.Provider
      value={{
        currentTab,
        selectedCar,
        setSelectedCar,
        selectedDateTimeRange,
        setSelectedDateTimeRange,
        serviceDescription,
        setServiceDescription,
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
