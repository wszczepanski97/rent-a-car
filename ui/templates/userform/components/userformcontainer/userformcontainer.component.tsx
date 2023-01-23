import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, FormEvent, useContext, useState } from "react";
import { UserRole } from "types/userrole/userrole.type";
import Photo from "ui/atoms/photo";
import CarLoading from "ui/organisms/carloading/carloading.component";
import UserFormRegisterButton from "ui/templates/userform/components/userformcontainer/components/userformregisterbutton";
import { UserFormContext } from "ui/templates/userform/contexts/userform.context";
import { UserFormContextEnum } from "ui/templates/userform/contexts/userform.enum";
import UserFormSubmitButton from "./components/userformsubmitbutton";
import UserFormTitle from "./components/userformtitle/userformtitle.component";
import styles from "./userformcontainer.module.scss";

const UserFormContainer: FC = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { activeDataItem, error, setError, type } = useContext(UserFormContext);
  const onSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
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
      await router.push(`/${activeDataItem.toLowerCase()}/dashboard`);
    }
    setLoading(false);
  };
  const onSubmitRegister = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData: FormData & { Login?: string; Hasło?: string } =
      new FormData(e.target as HTMLFormElement);
    const body = Object.fromEntries(formData);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    const res = await fetch("/api/register", options);
    if (!res?.ok) {
      const jsonRes = await res.json();
      setError(jsonRes.error);
      setLoading(false);
    } else {
      setError("");
      const res = await signIn<"credentials">("credentials", {
        redirect: false,
        ...{ Login: body.Login, Hasło: body.Hasło },
      });
      if (res?.error) {
        setError(
          'Konto zostało utworzone lecz nie udało się zalogować. Spróbuj ponownie w zakładce "Zaloguj się" '
        );
      } else {
        setError("");
        await router.push(`/${activeDataItem.toLowerCase()}/dashboard`);
      }
      setLoading(false);
    }
  };

  return (
    <div
      className={styles.userFormContainer}
      style={
        type === UserFormContextEnum.LOGIN ? undefined : { minWidth: "1060px" }
      }
    >
      {!!loading ? (
        <CarLoading
          message={
            type === UserFormContextEnum.LOGIN
              ? "Sprawdzamy Twój login i hasło"
              : "Twoja rejestracja jest przetwarzana"
          }
          height="100%"
        />
      ) : (
        <>
          <UserFormTitle />
          <form
            action="#"
            onSubmit={
              type === UserFormContextEnum.LOGIN
                ? onSubmitLogin
                : onSubmitRegister
            }
            style={{ minWidth: 410 }}
          >
            {children}
            <input name="role" type="hidden" value={UserRole[activeDataItem]} />
            {error && (
              <div style={{ display: "flex", padding: "10px 0" }}>
                <Photo
                  src="/images/RedCrossMark.jpg"
                  alt="Red cross mark"
                  size={{ height: "20", width: "20" }}
                />
                <span
                  data-name="form-error"
                  style={{
                    color: "red",
                  }}
                >
                  {error}
                </span>
              </div>
            )}
            <UserFormSubmitButton />
            {type === UserFormContextEnum.LOGIN && <UserFormRegisterButton />}
          </form>
        </>
      )}
    </div>
  );
};

export default UserFormContainer;
