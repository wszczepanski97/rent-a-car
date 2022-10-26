import { useSession } from "next-auth/react";
import { FC } from "react";
import { UserRole } from "templates";
import LogoutButton from "ui/common/atoms/logoutbutton/logoutbutton.component";
import { NavbarListItem } from "./atoms";
import NavbarListItemHover from "./atoms/navbarlistitemhover/navbarlistitemhover.component";
import styles from "./navbarlist.module.scss";

const NavbarList: FC = () => {
  const { data: session } = useSession();
  const role = session?.user.role;
  return (
    <ul className={styles.navbarList}>
      <div className={styles.navbarListContainer}>
        <div className={styles.navbarListItemGroup}>
          {role === UserRole.CLIENT ? (
            <>
              <NavbarListItem
                id="Panel główny"
                name="Panel główny"
                href="/client/dashboard"
              />
              <NavbarListItem
                id="Wypożycz auto"
                name="Wypożycz auto"
                href="/client/rent"
              />
              <NavbarListItem
                id="Moje wypożyczenia"
                name="Moje wypożyczenia"
                href="/client/myrentals"
              />
              <NavbarListItem
                id="Profil"
                name="Profil"
                href="/client/profile"
              />
              <LogoutButton>
                <NavbarListItem
                  id="Wyloguj się"
                  name="Wyloguj się"
                  href="/signout"
                />
              </LogoutButton>
            </>
          ) : role === UserRole.COORDINATOR ? (
            <>
              <NavbarListItem
                id="Mój oddział"
                name="Mój oddział"
                href="/coordinator/dashboard"
              />
              <NavbarListItem name="Kalendarz" href="/coordinator/calendar" />
              <NavbarListItem name="Mapa" href="/coordinator/map" />
              <NavbarListItem name="Profil" href="/coordinator/profile" />
              <LogoutButton>
                <NavbarListItem name="Wyloguj się" href="/signout" />
              </LogoutButton>
            </>
          ) : role === UserRole.CLEANER ? (
            <>
              <NavbarListItem
                id="Panel główny"
                name="Panel główny"
                href="/cleaner/dashboard"
              />
              <NavbarListItem
                id="Moje zlecenia"
                name="Moje zlecenia"
                href="/cleaner/jobs"
              />
              <NavbarListItem
                name="Kalendarz zleceń"
                href="/cleaner/calendar"
              />
              <NavbarListItem name="Mapa dojazdu" href="/cleaner/map" />
              <NavbarListItem name="Moje wypłaty" href="/cleaner/paychecks" />
              <NavbarListItem name="Profil" href="/cleaner/profile" />
              <LogoutButton>
                <NavbarListItem name="Wyloguj się" href="/signout" />
              </LogoutButton>
            </>
          ) : role === UserRole.DRIVER ? (
            <>
              <NavbarListItem name="Panel główny" href="/driver/dashboard" />
              <NavbarListItem name="Moje zlecenia" href="/driver/jobs" />
              <NavbarListItem name="Kalendarz zleceń" href="/driver/calendar" />
              <NavbarListItem name="Mapa dojazdu" href="/driver/map" />
              <NavbarListItem name="Moje wypłaty" href="/driver/paychecks" />
              <NavbarListItem name="Profil" href="/driver/profile" />
              <LogoutButton>
                <NavbarListItem name="Wyloguj się" href="/signout" />
              </LogoutButton>
            </>
          ) : role === UserRole.MECHANIC ? (
            <>
              <NavbarListItem name="Panel główny" href="/mechanic/dashboard" />
              <NavbarListItem name="Stwórz naprawę" href="/mechanic/repair" />
              <NavbarListItem
                name="Kalendarz zleceń"
                href="/mechanic/calendar"
              />
              <NavbarListItem name="Profil" href="/mechanic/profile" />
              <LogoutButton>
                <NavbarListItem name="Wyloguj się" href="/signout" />
              </LogoutButton>
            </>
          ) : (
            <>
              <NavbarListItem name="Strona główna" href="/" />
              <NavbarListItemHover
                title="Zaloguj się"
                options={[
                  {
                    name: "Zaloguj się jako klient",
                    href: "/login?role=client",
                  },
                  {
                    name: "Zaloguj się jako koordynator",
                    href: "/login?role=coordinator",
                  },
                  {
                    name: "Zaloguj się jako pracownik myjni",
                    href: "/login?role=cleaner",
                  },
                  {
                    name: "Zaloguj się jako mechanik",
                    href: "/login?role=mechanic",
                  },
                  {
                    name: "Zaloguj się jako kierowca",
                    href: "/login?role=driver",
                  },
                ]}
              />
              <NavbarListItem name="Wyszukaj auto" href="/pricing" />
            </>
          )}
        </div>
      </div>
    </ul>
  );
};

export default NavbarList;
