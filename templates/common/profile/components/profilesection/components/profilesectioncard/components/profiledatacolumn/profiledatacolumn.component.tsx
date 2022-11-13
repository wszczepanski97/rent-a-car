import type { FC } from "react";
import { useProfileContext } from "templates/common/profile/context/profile.context.hook";
import { ProfileMode } from "templates/common/profile/context/profile.context.type";
import { ProfileClient } from "types/profile/profileclient.type";
import { UserRole } from "types/userrole/userrole.type";
import ProfileDataColumnButton from "./components/profiledatacolumnbutton/profiledatacolumnbutton.component";
import { ProfileDataColumnButtonType } from "./components/profiledatacolumnbutton/profiledatacolumnbutton.type";
import ProfileDataColumnContainer from "./components/profiledatacolumncontainer/profiledatacolumncontainer.component";
import ProfileDataColumnProperty from "./components/profiledatacolumnproperty/profiledatacolumnproperty.component";

const ProfileDataColumn: FC = () => {
  const { mode, toggleMode, profile } = useProfileContext();
  if (!profile) return null;
  if (profile.type === UserRole.CLIENT) {
    const { user } = profile as ProfileClient;
    return user ? (
      <ProfileDataColumnContainer>
        <ProfileDataColumnProperty label="Imię" name="Imie" prop={user.Imie} />
        <ProfileDataColumnProperty
          label="Nazwisko"
          name="Nazwisko"
          prop={user.Nazwisko}
        />
        <ProfileDataColumnProperty
          label="Pesel"
          name="Pesel"
          prop={user.Pesel}
        />
        <ProfileDataColumnProperty
          label="Numer dowodu"
          name="NumerDowodu"
          prop={user.NumerDowodu}
        />
        <ProfileDataColumnProperty
          label="Numer prawa jazdy"
          name="NumerPrawaJazdy"
          prop={user.NumerPrawaJazdy}
        />
        <ProfileDataColumnProperty
          label="Email"
          name="Email"
          prop={user.Email}
          inputType="email"
        />
        <ProfileDataColumnProperty
          label="Numer telefonu"
          name="NumerTelefonu"
          prop={user.NumerTelefonu}
        />
        <ProfileDataColumnProperty
          label="Procent przyznanego rabatu"
          name="ProcentRabatu"
          prop={user.ProcentRabatu}
          disabled
        />
        {mode === ProfileMode.DEFAULT ? (
          <ProfileDataColumnButton
            bgColor="var(--login-button-background)"
            color="var(--light-text-color)"
            btnText="Edytuj dane"
            onClick={() => toggleMode(ProfileMode.EDITABLE)}
          />
        ) : (
          <>
            <ProfileDataColumnButton
              bgColor="var(--success-color)"
              color="var(--light-text-color)"
              btnText="Zapisz zmiany"
              onClick={() => {}}
              type={ProfileDataColumnButtonType.FORM}
            />
            <ProfileDataColumnButton
              bgColor="var(--danger-color)"
              color="var(--light-text-color)"
              btnText="Anuluj zmiany"
              onClick={() => toggleMode(ProfileMode.DEFAULT)}
            />
          </>
        )}
      </ProfileDataColumnContainer>
    ) : null;
  } else if (
    profile.type === UserRole.COORDINATOR ||
    profile.type === UserRole.CLEANER ||
    profile.type === UserRole.MECHANIC ||
    profile.type === UserRole.DRIVER
  ) {
    const { user } = profile;
    console.log(user);
    return user ? (
      <ProfileDataColumnContainer>
        <ProfileDataColumnProperty label="Imię" name="Imie" prop={user.Imie} />
        <ProfileDataColumnProperty
          label="Nazwisko"
          name="Nazwisko"
          prop={user.Nazwisko}
        />
        <ProfileDataColumnProperty
          label="Pesel"
          name="Pesel"
          prop={user.Pesel}
        />
        <ProfileDataColumnProperty
          label="Numer dowodu"
          name="NumerDowodu"
          prop={user.NumerDowodu}
        />
        <ProfileDataColumnProperty
          label="Numer prawa jazdy"
          name="NumerPrawaJazdy"
          prop={user.NumerPrawaJazdy}
        />
        <ProfileDataColumnProperty
          label="Email"
          name="Email"
          prop={user.Email}
          inputType="email"
        />
        <ProfileDataColumnProperty
          label="Numer telefonu"
          name="NumerTelefonu"
          prop={user.NumerTelefonu}
        />
        {mode === ProfileMode.DEFAULT ? (
          <ProfileDataColumnButton
            bgColor="var(--login-button-background)"
            color="var(--light-text-color)"
            btnText="Edytuj dane"
            onClick={() => toggleMode(ProfileMode.EDITABLE)}
          />
        ) : (
          <>
            <ProfileDataColumnButton
              bgColor="var(--success-color)"
              color="var(--light-text-color)"
              btnText="Zapisz zmiany"
              onClick={() => {}}
              type={ProfileDataColumnButtonType.FORM}
            />
            <ProfileDataColumnButton
              bgColor="var(--danger-color)"
              color="var(--light-text-color)"
              btnText="Anuluj zmiany"
              onClick={() => toggleMode(ProfileMode.DEFAULT)}
            />
          </>
        )}
      </ProfileDataColumnContainer>
    ) : null;
  } else return null;
};

export default ProfileDataColumn;
