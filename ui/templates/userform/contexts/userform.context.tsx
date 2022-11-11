import { createContext, FC, useRef, useState } from "react";
import { UserRoleKey } from "types/userrole/userrolekey.type";
import { UserFormContextValues } from "./userform.type";

export const UserFormContext = createContext<UserFormContextValues>(
  {} as UserFormContextValues
);

export const UserFormContextProvider: FC = ({ children }) => {
  const [error, setError] = useState("");
  const [activeDataItem, setActiveDataItem] = useState<UserRoleKey>("CLIENT");
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBorderRef = useRef<HTMLDivElement>(null);
  return (
    <UserFormContext.Provider
      value={{
        error,
        setError,
        activeDataItem,
        setActiveDataItem,
        menuRef,
        menuBorderRef,
      }}
    >
      {children}
    </UserFormContext.Provider>
  );
};
