import { ChangeEvent } from "react";

export type UserFormSelectProps = {
  name: string;
  options: any[];
  onSelectChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
};
