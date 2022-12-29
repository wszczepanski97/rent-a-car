import { lokalizacje, wypozyczenia } from "@prisma/client";
import { TabComponent } from "@syncfusion/ej2-react-navigations";
import { Service } from "pages/driver/calendar";
import {
  createContext,
  Dispatch,
  FC,
  useCallback,
  useRef,
  useState,
} from "react";
import { RelocationType } from "../tabcomponents/relocationtypetab/relocationtypetab.component";

export type AddEventContextInterface = {
  currentTab: React.MutableRefObject<TabComponent | null>;
  selectedRent?: Service;
  setSelectedRent: Dispatch<React.SetStateAction<Service | undefined>>;
  selectedRentId?: string;
  setSelectedRentId: Dispatch<React.SetStateAction<string | undefined>>;
  selectedRelocationType?: RelocationType;
  setSelectedRelocationType: Dispatch<
    React.SetStateAction<RelocationType | undefined>
  >;
  deliveryEstimationTime?: string;
  setDeliveryEstimationTime: Dispatch<React.SetStateAction<string>>;
  pickupEstimationTime?: string;
  setPickupEstimationTime: Dispatch<React.SetStateAction<string>>;
  selectedCarPickupLocation?: lokalizacje;
  setSelectedCarPickupLocation: Dispatch<
    React.SetStateAction<lokalizacje | undefined>
  >;
  selectedCarDeliverLocation?: lokalizacje;
  setSelectedCarDeliverLocation: Dispatch<
    React.SetStateAction<lokalizacje | undefined>
  >;
  serviceDescription?: string;
  setServiceDescription: Dispatch<React.SetStateAction<string | undefined>>;
  resetContextData: () => void;
};

export const AddEventContext = createContext({} as AddEventContextInterface);

const AddEventContextProvider: FC = ({ children }) => {
  let currentTab = useRef<TabComponent | null>(null);
  const [selectedRent, setSelectedRent] = useState<Service>();
  const [selectedRentId, setSelectedRentId] = useState<string>();
  const [selectedRelocationType, setSelectedRelocationType] =
    useState<RelocationType>();
  const [deliveryEstimationTime, setDeliveryEstimationTime] =
    useState<string>("0.5");
  const [pickupEstimationTime, setPickupEstimationTime] =
    useState<string>("0.5");
  const [selectedCarPickupLocation, setSelectedCarPickupLocation] =
    useState<lokalizacje>();
  const [selectedCarDeliverLocation, setSelectedCarDeliverLocation] =
    useState<lokalizacje>();
  const [serviceDescription, setServiceDescription] = useState<string>();
  const resetContextData = useCallback(() => {
    setSelectedRentId(undefined);
    setSelectedRelocationType(undefined);
    setDeliveryEstimationTime("0");
    setServiceDescription(undefined);
  }, [
    setSelectedRelocationType,
    setDeliveryEstimationTime,
    setServiceDescription,
  ]);
  return (
    <AddEventContext.Provider
      value={{
        currentTab,
        selectedRent,
        setSelectedRent,
        selectedRentId,
        setSelectedRentId,
        selectedRelocationType,
        setSelectedRelocationType,
        deliveryEstimationTime,
        setDeliveryEstimationTime,
        pickupEstimationTime,
        setPickupEstimationTime,
        selectedCarPickupLocation,
        setSelectedCarPickupLocation,
        selectedCarDeliverLocation,
        setSelectedCarDeliverLocation,
        serviceDescription,
        setServiceDescription,
        resetContextData,
      }}
    >
      {children}
    </AddEventContext.Provider>
  );
};

export default AddEventContextProvider;
