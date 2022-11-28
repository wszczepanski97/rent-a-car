import { createContext, FC, useRef, useState } from "react";
import { UserRoleKey } from "types/userrole/userrolekey.type";
import { UserFormContextEnum } from "ui/templates/userform/contexts/userform.enum";
import { UserFormContextValues } from "./userform.type";

export const UserFormContext = createContext<UserFormContextValues>(
  {} as UserFormContextValues
);

export const UserFormContextProvider: FC<{
  type: UserFormContextEnum;
}> = ({ children, type }) => {
  const [error, setError] = useState("");
  const [activeDataItem, setActiveDataItem] = useState<UserRoleKey>("CLIENT");
  const [disabledSubmitButton, setDisabledSubmitButton] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBorderRef = useRef<HTMLDivElement>(null);
  console.log(type);
  return (
    <UserFormContext.Provider
      value={{
        error,
        setError,
        activeDataItem,
        setActiveDataItem,
        menuRef,
        menuBorderRef,
        type,
        userFormActionText:
          type === UserFormContextEnum.LOGIN
            ? "Zaloguj się"
            : "Zarejestruj się",
        disabledSubmitButton,
        setDisabledSubmitButton,
      }}
    >
      {children}
    </UserFormContext.Provider>
  );
};
