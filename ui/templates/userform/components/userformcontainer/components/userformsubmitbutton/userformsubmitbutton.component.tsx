import { useContext } from "react";
import UserFormButton from "ui/templates/userform/components/userformcontainer/components/userformbutton/userformbutton.component";
import { UserFormContext } from "ui/templates/userform/contexts/userform.context";

const UserFormSubmitButton = () => {
  const { userFormActionText, setDisabledSubmitButton } =
    useContext(UserFormContext);
  return <UserFormButton text={userFormActionText} type="submit" />;
};

export default UserFormSubmitButton;
