import type { HTMLInputTypeAttribute } from "react";

export type ProfileDataColumnPropertyProps = {
  label: string;
  name: string;
  prop: string | number | null;
  inputType?: HTMLInputTypeAttribute;
  disabled?: boolean;
};
