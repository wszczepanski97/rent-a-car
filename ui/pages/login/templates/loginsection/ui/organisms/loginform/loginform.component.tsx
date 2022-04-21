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
import { RoleContext } from "pages/login";

const LoginForm: FC = () => {
  const router = useRouter();
  return (
    <RoleContext.Consumer>
      {(role) => (
        <form
          className={styles.loginForm}
          onSubmit={async (e) => {
            const formData = new FormData(e.target as HTMLFormElement);
            e.preventDefault();
            const res = await signIn<"credentials">("credentials", {
              redirect: true,
              callbackUrl: `/${role.toLowerCase()}/dashboard`,
              ...Object.fromEntries(formData),
            });
            if (res && res.url) router.push(res.url);
          }}
        >
          <LoginFormHeader />
          <div className={styles.loginFormFieldGroup}>
            <LoginFormFieldName />
            <LoginFormFieldPassword />
            <input name="role" type="hidden" value={role} />
          </div>
          <LoginFormButton />
        </form>
      )}
    </RoleContext.Consumer>
  );
};

export default LoginForm;
