import { LoginFormField, LoginFormInput, LoginFormLabel } from "../../atoms";

const LoginFormFieldName = () => (
  <LoginFormField>
    <LoginFormLabel text="Name" />
    <LoginFormInput type="text" name="name" />
  </LoginFormField>
);

export default LoginFormFieldName;
