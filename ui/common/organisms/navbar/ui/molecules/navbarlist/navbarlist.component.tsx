import { useSession } from "next-auth/react";
import { FC } from "react";
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
          {role === "KLIENT" ? (
            <>
              <NavbarListItem name="Dashboard" href="/client/dashboard" />
              <NavbarListItem name="Wypożycz auto" href="/client/rent" />
              <NavbarListItem
                name="Moje wypożyczenia"
                href="/client/myrentals"
              />
              <NavbarListItem name="Profil" href="/client/profile" />
              <LogoutButton>
                <NavbarListItem name="Wyloguj się" href="/signout" />
              </LogoutButton>
            </>
          ) : role === "KOORDYNATOR" ? (
            <>
              <NavbarListItem name="Dashboard" href="/coordinator/dashboard" />
              <NavbarListItem
                name="Mój oddział"
                href="/coordinator/mydepartment"
              />
              <NavbarListItem name="Kalendarz" href="/coordinator/calendar" />
              <NavbarListItem name="Mapa" href="/coordinator/map" />
              <NavbarListItem name="Wykresy" href="/coordinator/charts" />
              <NavbarListItem name="Profil" href="/coordinator/profile" />
              <LogoutButton>
                <NavbarListItem name="Wyloguj się" href="/signout" />
              </LogoutButton>
            </>
          ) : !!role ? (
            <>
              <NavbarListItem name="Dashboard" href="/employee/dashboard" />
              <NavbarListItem name="Moje zlecenia" href="/employee/jobs" />
              <NavbarListItem name="Profil" href="/employee/profile" />
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
