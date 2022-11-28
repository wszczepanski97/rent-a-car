import classNames from "classnames";
import type { FC, MouseEventHandler } from "react";
import { useContext } from "react";
import { UserRole } from "types/userrole/userrole.type";
import { UserRoleKey } from "types/userrole/userrolekey.type";
import { UserFormContext } from "ui/templates/userform/contexts/userform.context";
import styles from "./userformmenubutton.module.scss";
import { UserFormMenuButtonProps } from "./userformmenubutton.props";

const UserFormMenuButton: FC<UserFormMenuButtonProps> = ({
  color,
  dataItem,
  Icon,
}) => {
  const {
    activeDataItem,
    setActiveDataItem,
    menuRef,
    menuBorderRef,
    setError,
  } = useContext(UserFormContext);

  const clickItem: MouseEventHandler<HTMLButtonElement> = (e) => {
    menuRef.current?.style.removeProperty("--timeOut");
    if (activeDataItem === e.currentTarget.getAttribute("data-item")) return;
    if (activeDataItem) {
      document
        .querySelector(`[data-item=${activeDataItem}]`)
        ?.classList.remove(styles.active);
    }
    e.currentTarget.classList.add(styles.active);
    setActiveDataItem(e.currentTarget.getAttribute("data-item") as UserRoleKey);
    addOffsetMenuBorder(e.currentTarget);
    setError("");
  };

  const addOffsetMenuBorder = (element: HTMLElement) => {
    const offsetActiveItem = element.getBoundingClientRect();
    if (menuRef.current && menuBorderRef.current) {
      const left =
        Math.floor(
          offsetActiveItem.left -
            menuRef.current.offsetLeft -
            (menuBorderRef.current.offsetWidth - offsetActiveItem.width) / 2
        ) + "px";
      menuBorderRef.current.style.transform = `translate3d(${left},0, 0)`;
    }
  };

  return (
    <button
      className={classNames(styles.userFormMenuButton, {
        [styles.active]: activeDataItem === dataItem,
      })}
      style={
        {
          "--bgColorItem": color,
          display: "flex",
          flexDirection: "column",
        } as React.CSSProperties
      }
      data-item={dataItem}
      onClick={clickItem}
      aria-label={activeDataItem}
    >
      {Icon}
      {activeDataItem === dataItem && (
        <h6 style={{ color: "#cccccc", fontSize: 9 }}>
          {UserRole[activeDataItem]}
        </h6>
      )}
    </button>
  );
};

export default UserFormMenuButton;
