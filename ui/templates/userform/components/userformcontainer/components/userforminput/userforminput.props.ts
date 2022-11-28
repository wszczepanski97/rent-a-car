import type { HTMLInputTypeAttribute } from "react";

export type UserFormInputProps = {
  name: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  minLength?: number;
  maxLength?: number;
  validations?: {
    [key: string]: {
      validator: (arg: any) => boolean;
      message: string;
    };
  };
};
