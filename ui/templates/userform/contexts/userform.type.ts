import type { Dispatch, RefObject, SetStateAction } from "react";
import { UserRoleKey } from "types/userrole/userrolekey.type";

export type UserFormContextValues = {
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  activeDataItem: UserRoleKey;
  setActiveDataItem: Dispatch<SetStateAction<UserRoleKey>>;
  menuRef: RefObject<HTMLDivElement>;
  menuBorderRef: RefObject<HTMLDivElement>;
};
