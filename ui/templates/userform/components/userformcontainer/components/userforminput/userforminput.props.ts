import type { HTMLInputTypeAttribute } from "react";

export type UserFormInputProps = {
  name: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  required: boolean;
};
