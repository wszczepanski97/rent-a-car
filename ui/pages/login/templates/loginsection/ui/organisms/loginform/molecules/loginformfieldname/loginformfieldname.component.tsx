import { LoginFormInputName, LoginFormLabel } from "../../atoms";

const LoginFormFieldName = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      paddingBottom: "10px",
    }}
  >
    <LoginFormLabel labelText="Name" />
    <LoginFormInputName />
  </div>
);

export default LoginFormFieldName;
