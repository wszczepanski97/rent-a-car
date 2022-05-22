import { FC, HTMLInputTypeAttribute } from "react";
import {
  ProfileSectionMode,
  useProfileSectionContext,
} from "../../../../../../../profilesectionmode.context";

const ProfileDataColumnProperty: FC<ProfileDataColumnPropertyProps> = ({
  label,
  name,
  prop,
  inputType = "text",
  disabled = false,
}) => {
  const { mode } = useProfileSectionContext();
  return (
    <div>
      <h5>{label}:</h5>
      {mode === ProfileSectionMode.DEFAULT ? (
        <p>{prop}</p>
      ) : (
        <input
          type={inputType}
          defaultValue={prop || undefined}
          disabled={disabled}
          id={name}
          name={name}
        />
      )}
    </div>
  );
};

type ProfileDataColumnPropertyProps = {
  label: string;
  name: string;
  prop: string | number | null;
  inputType?: HTMLInputTypeAttribute;
  disabled?: boolean;
};

export default ProfileDataColumnProperty;
