import { useRouter } from "next/router";
import { FC, FormEventHandler } from "react";
import { useProfileContext } from "templates/common/profile/context/profile.context.hook";
import { ProfileMode } from "templates/common/profile/context/profile.context.type";
import { UserRole } from "types/userrole/userrole.type";
import styles from "./profiledatacolumncontainer.module.scss";
import { ProfileDataColumnSubmitFormType } from "./profiledatacolumnsubmitform.type";

const ProfileDataColumnContainer: FC = ({ children }) => {
  const router = useRouter();
  const { mode, toggleMode, profile } = useProfileContext();
  if (!profile) return null;
  const getRole = (type: string) =>
    type === UserRole.CLIENT ? "client" : "coordinator";
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const target = e.target as typeof e.target &
      ProfileDataColumnSubmitFormType;
    const response = await fetch(`/api/${getRole(profile.type)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Imie: target.Imie.value,
        Nazwisko: target.Nazwisko.value,
        Pesel: target.Pesel.value,
        NumerDowodu: target.NumerDowodu.value,
        NumerPrawaJazdy: target.NumerPrawaJazdy.value,
        Email: target.Email.value,
        NumerTelefonu: target.NumerTelefonu.value,
        IdUzytkownicy: profile.user?.IdUzytkownicy,
      }),
    });
    router.replace(`/${getRole(profile.type)}/profile`);
    toggleMode(ProfileMode.DEFAULT);
    return await response.json();
  };
  return mode === ProfileMode.DEFAULT ? (
    <div className={styles.profileDataColumnContainer}>{children}</div>
  ) : (
    <form className={styles.profileDataColumnContainer} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default ProfileDataColumnContainer;
