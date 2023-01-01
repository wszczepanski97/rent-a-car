import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { UserRole } from "types/userrole/userrole.type";
import LogoutButton from "ui/atoms/logoutbutton/logoutbutton.component";
import NavbarListItem from "./components/navbarlistitem";
import styles from "./navbarlist.module.scss";

const NavbarList: FC = () => {
  const { data: session } = useSession();
  const role = session?.user.role;
  return (
    <div className={styles.navbarList}>
      <div className={styles.navbarListContainer}>
        <ul className={styles.navbarListItemGroup}>
          <AnimatePresence>
            {role === UserRole.CLIENT ? (
              <>
                <NavbarListItem
                  name="Panel główny"
                  href="/client/dashboard"
                  dataIcon="Dashboard"
                />
                <NavbarListItem
                  name="Wypożycz auto"
                  href="/client/rent"
                  dataIcon="AddToQueue"
                />
                <NavbarListItem
                  name="Moje wypożyczenia"
                  href="/client/myrentals"
                  dataIcon="FolderOpen"
                />
                <NavbarListItem
                  name="Profil"
                  href="/client/profile"
                  dataIcon="UserCircleWithBg"
                />
                <NavbarListItem
                  name="Wyloguj się"
                  href="/"
                  dataIcon="LogOut"
                  logout
                />
              </>
            ) : role === UserRole.COORDINATOR ? (
              <>
                <NavbarListItem
                  name="Mój oddział"
                  href="/coordinator/dashboard"
                  dataIcon="Dashboard"
                />
                <NavbarListItem
                  name="Kalendarz"
                  href="/coordinator/calendar"
                  refresh
                />
                <NavbarListItem name="Mapa" href="/coordinator/map" />
                <NavbarListItem
                  name="Profil"
                  dataIcon="UserCircleWithBg"
                  href="/coordinator/profile"
                />
                <NavbarListItem
                  name="Wyloguj się"
                  href="/"
                  dataIcon="LogOut"
                  logout
                />
              </>
            ) : role === UserRole.CLEANER ? (
              <>
                <NavbarListItem
                  name="Panel główny"
                  href="/cleaner/dashboard"
                  dataIcon="Dashboard"
                />
                <NavbarListItem
                  name="Mój kalendarz"
                  href="/cleaner/calendar"
                  refresh
                />
                <NavbarListItem
                  name="Profil"
                  dataIcon="UserCircleWithBg"
                  href="/cleaner/profile"
                />
                <NavbarListItem
                  name="Wyloguj się"
                  href="/"
                  dataIcon="LogOut"
                  logout
                />
              </>
            ) : role === UserRole.DRIVER ? (
              <>
                <NavbarListItem
                  name="Panel główny"
                  href="/driver/dashboard"
                  dataIcon="Dashboard"
                />
                <NavbarListItem
                  name="Mój kalendarz"
                  href="/driver/calendar"
                  refresh
                />
                <NavbarListItem name="Mapa dojazdu" href="/driver/map" />
                <NavbarListItem
                  name="Profil"
                  dataIcon="UserCircleWithBg"
                  href="/driver/profile"
                />
                <NavbarListItem
                  name="Wyloguj się"
                  href="/"
                  dataIcon="LogOut"
                  logout
                />
              </>
            ) : role === UserRole.MECHANIC ? (
              <>
                <NavbarListItem
                  name="Panel główny"
                  href="/mechanic/dashboard"
                  dataIcon="Dashboard"
                />
                <NavbarListItem
                  name="Mój kalendarz"
                  href="/mechanic/calendar"
                  refresh
                />
                <NavbarListItem
                  name="Profil"
                  dataIcon="UserCircleWithBg"
                  href="/mechanic/profile"
                />
                <NavbarListItem
                  name="Wyloguj się"
                  href="/"
                  dataIcon="LogOut"
                  logout
                />
              </>
            ) : (
              <>
                <NavbarListItem
                  name="Zarejestruj się"
                  href="/register"
                  dataIcon="UserPlus"
                />
                <NavbarListItem
                  name="Zaloguj się"
                  href="/login"
                  dataIcon="LogIn"
                />
                <NavbarListItem
                  name="Wyszukaj auto"
                  href="/pricing"
                  dataIcon="Search"
                />
              </>
            )}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
};

export default NavbarList;
