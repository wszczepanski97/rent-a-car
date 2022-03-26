import { LoginFormButton, LoginFormHeader } from "./atoms";
import { LoginFormFieldName, LoginFormFieldPassword } from "./molecules";

const LoginForm = () => (
  <form
    action="#"
    style={{
      backgroundColor: "var(--login-background-color)",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      padding: "40px 50px",
      gap: "40px",
      width: "498px",
    }}
  >
    <LoginFormHeader />
    <div>
      <LoginFormFieldName />
      <LoginFormFieldPassword />
    </div>
    <LoginFormButton />
  </form>
);

export default LoginForm;
