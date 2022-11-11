import { useRouter } from "next/router";
import { FC, FormEventHandler } from "react";
import {
  ProfileSectionMode,
  useProfileSectionContext,
} from "templates/common/profile/ui/profilesection/profilesectionmode.context";
import { UserRole } from "types/userrole/userrole.type";
import styles from "./profiledatacolumncontainer.module.scss";
type SubmitFormType = {
  Imie: { value: string };
  Nazwisko: { value: string };
  Pesel: { value: string };
  NumerDowodu: { value: string };
  NumerPrawaJazdy: { value: string };
  Email: { value: string };
  NumerTelefonu: { value: string };
};

const ProfileDataColumnContainer: FC = ({ children }) => {
  const {
    mode,
    toggleMode,
    profile: { type, user },
  } = useProfileSectionContext();
  const router = useRouter();
  const getRole = (type: string) =>
    type === UserRole.CLIENT ? "client" : "coordinator";
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const target = e.target as typeof e.target & SubmitFormType;
    const response = await fetch(`/api/${getRole(type)}`, {
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
        IdUzytkownicy: user?.IdUzytkownicy,
      }),
    });
    router.replace(`/${getRole(type)}/profile`);
    toggleMode(ProfileSectionMode.DEFAULT);
    return await response.json();
  };
  return mode === ProfileSectionMode.DEFAULT ? (
    <div className={styles.ProfileDataColumnContainer}>{children}</div>
  ) : (
    <form className={styles.ProfileDataColumnContainer} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default ProfileDataColumnContainer;
