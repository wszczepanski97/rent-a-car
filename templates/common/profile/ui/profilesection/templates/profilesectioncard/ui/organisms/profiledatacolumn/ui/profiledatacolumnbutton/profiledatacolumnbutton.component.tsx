import type { FC } from "react";
import styles from "./profiledatacolumnbutton.module.scss";

export enum ProfileDataColumnButtonType {
  DEFAULT = "button",
  FORM = "submit",
}

type ProfileDataColumnButtonProps = {
  bgColor: string;
  color: string;
  btnText: string;
  type?: ProfileDataColumnButtonType;
  onClick(): void;
};

const ProfileDataColumnButton: FC<ProfileDataColumnButtonProps> = ({
  bgColor,
  color,
  btnText,
  type = ProfileDataColumnButtonType.DEFAULT,
  onClick,
}) => (
  <button
    className={styles.ProfileDataColumnButton}
    style={{ backgroundColor: bgColor, color }}
    onClick={onClick}
    type={type}
  >
    <p>{btnText}</p>
  </button>
);

export default ProfileDataColumnButton;
