import type { Dispatch, RefObject, SetStateAction } from "react";
import { UserRoleKey } from "types/userrole/userrolekey.type";
import { UserFormContextEnum } from "ui/templates/userform/contexts/userform.enum";

export type UserFormContextValues = {
  type: UserFormContextEnum;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  activeDataItem: UserRoleKey;
  setActiveDataItem: Dispatch<SetStateAction<UserRoleKey>>;
  menuRef: RefObject<HTMLDivElement>;
  menuBorderRef: RefObject<HTMLDivElement>;
  userFormActionText: "Zaloguj się" | "Zarejestruj się";
};
