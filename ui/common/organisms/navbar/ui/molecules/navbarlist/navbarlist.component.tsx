import { useSession } from "next-auth/react";
import { FC } from "react";
import { UserRole } from "templates/common";
import LogoutButton from "ui/common/atoms/logoutbutton/logoutbutton.component";
import { NavbarListItem } from "./atoms";
import NavbarListItemHover from "./atoms/navbarlistitemhover/navbarlistitemhover.component";
import styles from "./navbarlist.module.scss";

const NavbarList: FC = () => {
  const { data: session } = useSession();
  const role: UserRole | undefined = session ? session.user.role : undefined;
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
          ) : role === "ADMIN" ? (
            <>
              <NavbarListItem name="Dashboard" href="/admin/dashboard" />
              <NavbarListItem name="Mój oddział" href="/admin/scheduler" />
              <NavbarListItem name="Mapa" href="/admin/map" />
              <NavbarListItem name="Wykresy" href="/admin/charts" />
              <NavbarListItem name="Profil" href="/admin/profile" />
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
                  { name: "Sign as client", href: "/login?role=client" },
                  { name: "Sign as admin", href: "/login?role=admin" },
                  { name: "Sign as cleaner", href: "/login?role=cleaner" },
                  { name: "Sign as mechanic", href: "/login?role=mechanic" },
                  {
                    name: "Sign as coordinator",
                    href: "login?role=coordinator",
                  },
                ]}
              />
              <NavbarListItem name="Wyszukaj auto" href="/pricing" />
            </>
          )}
        </div>
        {/* <div className={styles.navbarListIconGroup}>
          <NavbarListIcon src="/images/SearchIcon.svg" alt="SearchIcon" />
          <NavbarListIcon src="/images/BasketIcon.svg" alt="BasketIcon" />
        </div> */}
      </div>
    </ul>
  );
};

export default NavbarList;
