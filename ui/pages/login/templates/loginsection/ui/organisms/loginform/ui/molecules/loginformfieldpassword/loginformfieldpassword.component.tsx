import { LoginFormField, LoginFormInput, LoginFormLabel } from "../../atoms";

const LoginFormFieldPassword = () => (
  <LoginFormField>
    <LoginFormLabel text="Password" />
    <LoginFormInput type="password" name="password" />
  </LoginFormField>
);

export default LoginFormFieldPassword;
