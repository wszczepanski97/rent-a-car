import { FC, FormEvent, useEffect, useState } from "react";
import {
  LoginFormButton,
  LoginFormFieldName,
  LoginFormFieldPassword,
  LoginFormHeader,
} from "./ui";
import styles from "./loginform.module.scss";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { UserRole, UserRoleKey } from "templates/common";

const LoginForm: FC = () => {
  const router = useRouter();
  if (!router.query.role) return null;
  let logRole = (router.query.role as string).toUpperCase() as UserRoleKey;
  const [error, setError] = useState("");
  const [prevUrl] = useState(logRole);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const res = await signIn<"credentials">("credentials", {
      redirect: false,
      ...Object.fromEntries(formData),
    });
    if (res?.error) {
      setError("Wprowadzone dane logowania są niepoprawne.");
    } else {
      setError("");
      router.push(`/${logRole.toLowerCase()}/dashboard`);
    }
  };
  useEffect(() => {
    if (prevUrl !== logRole) setError("");
  }, [prevUrl, logRole]);
  return (
    <form className={styles.loginForm} onSubmit={onSubmit}>
      <LoginFormHeader role={logRole} />
      <div className={styles.loginFormFieldGroup}>
        <LoginFormFieldName />
        <LoginFormFieldPassword />
        <input name="role" type="hidden" value={UserRole[logRole]} />
        {error && <div>{error}</div>}
      </div>
      <LoginFormButton />
    </form>
  );
};

export default LoginForm;
