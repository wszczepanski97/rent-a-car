import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Profile } from "../../types";

export enum ProfileSectionMode {
  DEFAULT = "DEFAULT",
  EDITABLE = "EDITABLE",
}

const ProfileSectionContext = createContext<
  | {
      mode: ProfileSectionMode;
      toggleMode: Dispatch<SetStateAction<ProfileSectionMode>>;
      profile: Profile;
    }
  | undefined
>(undefined);

export type ProfileSectionProviderProps = {
  profile: Profile;
};

const ProfileSectionProvider: FC<ProfileSectionProviderProps> = ({
  profile,
  children,
}) => {
  const [mode, toggleMode] = useState(ProfileSectionMode.DEFAULT);
  const value = { mode, toggleMode, profile };
  return (
    <ProfileSectionContext.Provider value={value}>
      {children}
    </ProfileSectionContext.Provider>
  );
};

const useProfileSectionContext = () => {
  const context = useContext(ProfileSectionContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};

export { ProfileSectionProvider, useProfileSectionContext };
