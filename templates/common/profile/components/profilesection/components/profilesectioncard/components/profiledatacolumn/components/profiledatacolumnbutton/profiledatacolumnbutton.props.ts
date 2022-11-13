import { ProfileDataColumnButtonType } from "./profiledatacolumnbutton.type";

export type ProfileDataColumnButtonProps = {
  bgColor: string;
  color: string;
  btnText: string;
  type?: ProfileDataColumnButtonType;
  onClick(): void;
};
