import type { FC } from "react";
import styles from "./profiledatacolumnbutton.module.scss";
import { ProfileDataColumnButtonProps } from "./profiledatacolumnbutton.props";
import { ProfileDataColumnButtonType } from "./profiledatacolumnbutton.type";

const ProfileDataColumnButton: FC<ProfileDataColumnButtonProps> = ({
  bgColor,
  color,
  btnText,
  type = ProfileDataColumnButtonType.DEFAULT,
  onClick,
}) => (
  <button
    className={styles.profileDataColumnButton}
    style={{ backgroundColor: bgColor, color }}
    onClick={onClick}
    type={type}
  >
    <p>{btnText}</p>
  </button>
);

export default ProfileDataColumnButton;
