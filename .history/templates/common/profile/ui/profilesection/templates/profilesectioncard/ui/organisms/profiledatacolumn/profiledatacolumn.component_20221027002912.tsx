import { FC } from "react";
import { UserRole } from "templates/common/login";
import {
  ProfileSectionMode,
  useProfileSectionContext,
} from "templates/common/profile/ui/profilesection/profilesectionmode.context";
import {
  ProfileDataColumnButton,
  ProfileDataColumnButtonType,
  ProfileDataColumnContainer,
  ProfileDataColumnProperty,
} from "./ui";

const ProfileDataColumn: FC = () => {
  const { mode, toggleMode, profile } = useProfileSectionContext();
  console.log(profile.type);
  if (profile.type === UserRole.CLIENT) {
    const { user } = profile;
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
        {mode === ProfileSectionMode.DEFAULT ? (
          <ProfileDataColumnButton
            bgColor="var(--login-button-background)"
            color="var(--light-text-color)"
            btnText="Edytuj dane"
            onClick={() => toggleMode(ProfileSectionMode.EDITABLE)}
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
              onClick={() => toggleMode(ProfileSectionMode.DEFAULT)}
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
        {mode === ProfileSectionMode.DEFAULT ? (
          <ProfileDataColumnButton
            bgColor="var(--login-button-background)"
            color="var(--light-text-color)"
            btnText="Edytuj dane"
            onClick={() => toggleMode(ProfileSectionMode.EDITABLE)}
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
              onClick={() => toggleMode(ProfileSectionMode.DEFAULT)}
            />
          </>
        )}
      </ProfileDataColumnContainer>
    ) : null;
  } else return null;
};

export default ProfileDataColumn;
