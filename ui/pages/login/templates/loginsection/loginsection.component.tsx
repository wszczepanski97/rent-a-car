import { LoginCarPhoto } from "./ui/organisms/atoms";
import LoginForm from "./ui/organisms/loginform/loginform.component";

const LoginSection = () => (
  <section
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "428px",
      margin: "80px 0",
    }}
  >
    <LoginCarPhoto />
    <LoginForm />
  </section>
);

export default LoginSection;
