import { FC } from "react";
import {
  LoginFormButton,
  LoginFormFieldName,
  LoginFormFieldPassword,
  LoginFormHeader,
} from "./ui";
import styles from "./loginform.module.scss";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const LoginForm: FC = () => {
  const router = useRouter();
  return (
    <form
      className={styles.loginForm}
      onSubmit={async (e) => {
        const formData = new FormData(e.target as HTMLFormElement);
        e.preventDefault();
        const res = await signIn<"credentials">("credentials", {
          redirect: false,
          callbackUrl: `${window.location.origin}`,
          ...Object.fromEntries(formData),
        });
        if (res && res.url) router.push(res.url);
      }}
    >
      <LoginFormHeader />
      <div className={styles.loginFormFieldGroup}>
        <LoginFormFieldName />
        <LoginFormFieldPassword />
        <input name="role" type="hidden" value="ADMIN" />
      </div>
      <LoginFormButton />
    </form>
  );
};

export default LoginForm;
