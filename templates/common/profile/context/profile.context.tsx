import { createContext, Dispatch, SetStateAction } from "react";
import { Profile } from "types/profile/profile.type";
import { ProfileMode } from "./profile.context.type";

export const ProfileContext = createContext<
  | {
      mode: ProfileMode;
      toggleMode: Dispatch<SetStateAction<ProfileMode>>;
      profile: Profile | null;
    }
  | undefined
>(undefined);
