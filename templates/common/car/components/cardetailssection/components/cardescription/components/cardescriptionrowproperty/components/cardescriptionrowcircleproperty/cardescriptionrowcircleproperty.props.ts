import { CarDescriptionRowPropertyEnum } from "../../../cardescriptionrowproperty/cardescriptionrowproperty.enum";

export type CarDescriptionRowCirclePropertyProps = {
  type: CarDescriptionRowPropertyEnum.CIRCLE;
  bgColor: string;
  color: string;
  value?: string | number;
};
