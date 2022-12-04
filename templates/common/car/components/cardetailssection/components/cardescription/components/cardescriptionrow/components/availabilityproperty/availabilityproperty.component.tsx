import CarDescriptionRowProperty from "../../../cardescriptionrowproperty";
import { CarDescriptionRowPropertyEnum } from "../../../cardescriptionrowproperty/cardescriptionrowproperty.enum";

const AvailabilityProperty = () => (
  <CarDescriptionRowProperty
    type={CarDescriptionRowPropertyEnum.AVAILABILITY}
    title="DOSTĘPNY"
    available
  />
);

export default AvailabilityProperty;
