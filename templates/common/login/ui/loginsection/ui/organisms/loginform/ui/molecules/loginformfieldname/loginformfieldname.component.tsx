import { LoginFormField, LoginFormInput, LoginFormLabel } from "../../atoms";

const LoginFormFieldName = () => (
  <LoginFormField>
    <LoginFormLabel text="Login" />
    <LoginFormInput type="text" name="name" />
  </LoginFormField>
);

export default LoginFormFieldName;
