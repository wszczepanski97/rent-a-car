import { FC, useState } from "react";
import { ProfileContext } from "./profile.context";
import { ProfileContextProviderProps } from "./profile.context.provider.props";
import { ProfileMode } from "./profile.context.type";

export const ProfileContextProvider: FC<ProfileContextProviderProps> = ({
  profile,
  children,
}) => {
  const [mode, toggleMode] = useState(ProfileMode.DEFAULT);
  const [modalOpen, setModalOpen] = useState(false);
  const value = { mode, toggleMode, modalOpen, setModalOpen, profile };
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
