import { TabComponent } from "@syncfusion/ej2-react-navigations";
import { Car } from "pages/cleaner/calendar";
import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import { DateRange } from "../tabcomponents/timerangewashingtab/timerangewashingtab.component";
import { WashingType } from "../tabcomponents/washingtypetab/washingtypetab.component";

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
  selectedWashingType?: WashingType;
  setSelectedWashingType: Dispatch<SetStateAction<WashingType | undefined>>;
  resetContextData: () => void;
};

export const AddEventContext = createContext({} as AddEventContextInterface);

const AddEventContextProvider: FC = ({ children }) => {
  let currentTab = useRef<TabComponent | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car>();
  const [selectedDateTimeRange, setSelectedDateTimeRange] =
    useState<DateRange>();
  const [serviceDescription, setServiceDescription] = useState<string>();
  const [selectedWashingType, setSelectedWashingType] = useState<WashingType>();
  const resetContextData = useCallback(() => {
    setSelectedCar(undefined);
    setSelectedDateTimeRange(undefined);
    setServiceDescription(undefined);
    setSelectedWashingType(undefined);
  }, [
    setSelectedCar,
    setSelectedDateTimeRange,
    setServiceDescription,
    setSelectedWashingType,
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
        selectedWashingType,
        setSelectedWashingType,
        resetContextData,
      }}
    >
      {children}
    </AddEventContext.Provider>
  );
};

export default AddEventContextProvider;
