import type { FC } from "react";
import Photo from "ui/atoms/photo";
import { CarDescriptionRowAvailabilityPropertyProps } from "./cardescriptionrowavailabilityproperty.props";

const CarDescriptionRowAvailabilityProperty: FC<
  CarDescriptionRowAvailabilityPropertyProps
> = ({ available }) => (
  <p>
    {available ? (
      <Photo
        src="/images/GreenTickMark.png"
        alt="Green tick mark"
        size={{ height: "50", width: "50" }}
      />
    ) : (
      <Photo
        src="/images/RedCrossMark.jpg"
        alt="Red cross mark"
        size={{ height: "50", width: "50" }}
      />
    )}
  </p>
);

export default CarDescriptionRowAvailabilityProperty;
