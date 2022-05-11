import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from "react";

export enum ProfileSectionMode {
  DEFAULT = "DEFAULT",
  EDITABLE = "EDITABLE",
}

const ProfileSectionModeContext = createContext<
  | {
      mode: ProfileSectionMode;
      toggleMode: Dispatch<SetStateAction<ProfileSectionMode>>;
    }
  | undefined
>(undefined);

const ProfileSectionModeProvider: FC = ({ children }) => {
  const [mode, toggleMode] = useState(ProfileSectionMode.DEFAULT);
  const value = { mode, toggleMode };
  return (
    <ProfileSectionModeContext.Provider value={value}>
      {children}
    </ProfileSectionModeContext.Provider>
  );
};

const useProfileSectionModeContext = () => {
  const context = useContext(ProfileSectionModeContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};

export { ProfileSectionModeProvider, useProfileSectionModeContext };
