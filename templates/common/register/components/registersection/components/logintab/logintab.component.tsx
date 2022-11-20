import UserFormInput from "ui/templates/userform/components/userformcontainer/components/userforminput/userforminput.component";
import UserFormInputGroup from "ui/templates/userform/components/userformcontainer/components/userforminputgroup/userforminputgroup.component";

const LoginTab = () => (
  <UserFormInputGroup>
    <UserFormInput
      required
      placeholder="Wprowadź login..."
      type="text"
      name="Login"
    />
    <UserFormInput
      required
      placeholder="Wprowadź hasło..."
      type="text"
      name="Hasło"
    />
  </UserFormInputGroup>
);

export default LoginTab;
