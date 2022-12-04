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
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h3 style={{ textAlign: "center" }}>Dane osobowe</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 50,
                justifyContent: "space-between",
              }}
            >
              <ProfileDataColumnProperty
                label="Imię"
                name="Imie"
                prop={user.Imie}
              />
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
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 50,
                justifyContent: "space-between",
              }}
            >
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
            </div>
          </div>
        </div>
        {mode === ProfileMode.DEFAULT ? (
          <ProfileDataColumnButton
            bgColor="var(--login-button-background)"
            color="var(--light-text-color)"
            btnText="Edytuj dane"
            onClick={() => toggleMode(ProfileMode.EDITABLE)}
          />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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
          </div>
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
    return user ? (
      <ProfileDataColumnContainer>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h3 style={{ textAlign: "center" }}>Dane osobowe</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 50,
                justifyContent: "space-between",
              }}
            >
              <ProfileDataColumnProperty
                label="Imię"
                name="Imie"
                prop={user.Imie}
              />
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
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 50,
                justifyContent: "space-between",
              }}
            >
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
            </div>
          </div>
        </div>
        {mode === ProfileMode.DEFAULT ? (
          <ProfileDataColumnButton
            bgColor="var(--login-button-background)"
            color="var(--light-text-color)"
            btnText="Edytuj dane"
            onClick={() => toggleMode(ProfileMode.EDITABLE)}
          />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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
          </div>
        )}
      </ProfileDataColumnContainer>
    ) : null;
  } else return null;
};

export default ProfileDataColumn;
