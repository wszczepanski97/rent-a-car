import {
  createContext,
  Dispatch,
  FC,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { UserRoleKey } from "ui";

type UserFormContextValues = {
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  activeDataItem: UserRoleKey;
  setActiveDataItem: Dispatch<SetStateAction<UserRoleKey>>;
  menuRef: RefObject<HTMLDivElement>;
  menuBorderRef: RefObject<HTMLDivElement>;
};

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
