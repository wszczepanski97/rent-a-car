import classNames from "classnames";
import { FC, MouseEventHandler, useContext } from "react";
import { UserRoleKey } from "ui";
import { UserFormContext } from "../../../contexts/userform-context";
import styles from "./userformmenubutton.module.scss";

type UserFormMenuButtonProps = {
  color: string;
  dataItem: string;
  iconClass: string;
};

const UserFormMenuButton: FC<UserFormMenuButtonProps> = ({
  color,
  dataItem,
  iconClass,
}) => {
  const { activeDataItem, setActiveDataItem, menuRef, menuBorderRef } =
    useContext(UserFormContext);

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
      style={{ "--bgColorItem": color } as React.CSSProperties}
      data-item={dataItem}
      onClick={clickItem}
    >
      <i className={iconClass}></i>
    </button>
  );
};

export default UserFormMenuButton;
