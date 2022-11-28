import UserFormButton from "ui/templates/userform/components/userformcontainer/components/userformbutton/userformbutton.component";

const UserFormRegisterButton = () => (
  <UserFormButton
    text="Zarejestruj się"
    type="button"
    redirect="/register"
    enabled
  />
);
export default UserFormRegisterButton;
