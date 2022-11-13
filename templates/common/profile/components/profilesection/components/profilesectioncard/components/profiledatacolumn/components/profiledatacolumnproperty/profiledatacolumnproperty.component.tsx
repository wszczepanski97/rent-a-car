import { FC } from "react";
import { useProfileContext } from "templates/common/profile/context/profile.context.hook";
import { ProfileMode } from "templates/common/profile/context/profile.context.type";
import { ProfileDataColumnPropertyProps } from "./profiledatacolumnproperty.props";

const ProfileDataColumnProperty: FC<ProfileDataColumnPropertyProps> = ({
  label,
  name,
  prop,
  inputType = "text",
  disabled = false,
}) => {
  const { mode } = useProfileContext();
  return (
    <div>
      <h5>{label}:</h5>
      {mode === ProfileMode.DEFAULT ? (
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

export default ProfileDataColumnProperty;
