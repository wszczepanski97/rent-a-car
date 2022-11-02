import classNames from "classnames";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, FormEvent, MouseEventHandler, useRef, useState } from "react";
import { UserRole, UserRoleKey } from "templates/common";
import styles from "./registerform.module.scss";

const RegisterForm: FC = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [activeDataItem, setActiveDataItem] = useState<UserRoleKey>("CLIENT");
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBorderRef = useRef<HTMLDivElement>(null);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const res = await signIn<"credentials">("credentials", {
      redirect: false,
      ...Object.fromEntries(formData),
    });
    if (res?.error) {
      setError("Wprowadzone dane logowania są niepoprawne.");
    } else {
      setError("");
      router.push(`/${activeDataItem.toLowerCase()}/dashboard`);
    }
  };

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
    offsetMenuBorder(e.currentTarget);
  };

  const offsetMenuBorder = (element) => {
    const offsetActiveItem = element.getBoundingClientRect();
    const left =
      Math.floor(
        offsetActiveItem.left -
          menuRef.current.offsetLeft -
          (menuBorderRef.current.offsetWidth - offsetActiveItem.width) / 2
      ) + "px";
    menuBorderRef.current.style.transform = `translate3d(${left}, 0 , 0)`;
  };
  // useEffect(() => {
  //   if (prevUrl !== logRole) setError("");
  // }, [prevUrl, logRole]);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "70vh" }}>
      <div className={styles.menu} ref={menuRef}>
        <button
          className={classNames(styles.menu__item, styles.active)}
          style={{ "--bgColorItem": "#ff8c00" } as React.CSSProperties}
          data-item="CLIENT"
          onClick={clickItem}
        >
          <i className="bx bx-user-circle"></i>
        </button>

        <button
          className={styles.menu__item}
          style={{ "--bgColorItem": "#f54888" } as React.CSSProperties}
          data-item="COORDINATOR"
          onClick={clickItem}
        >
          <i className="bx bxs-group"></i>
        </button>

        <button
          className={styles.menu__item}
          style={{ "--bgColorItem": "#4343f5" } as React.CSSProperties}
          data-item="DRIVER"
          onClick={clickItem}
        >
          <i className="bx bxs-key"></i>
        </button>

        <button
          className={styles.menu__item}
          style={{ "--bgColorItem": "#bb9000" } as React.CSSProperties}
          data-item="MECHANIC"
          onClick={clickItem}
        >
          <i className="bx bxs-car-mechanic"></i>
        </button>

        <button
          className={styles.menu__item}
          style={{ "--bgColorItem": "#22604c" } as React.CSSProperties}
          data-item="CLEANER"
          onClick={clickItem}
        >
          <i className="bx bxs-car-wash"></i>
        </button>

        <div className={styles.menu__border} ref={menuBorderRef}></div>
      </div>
      <div className={styles["svg-container"]}>
        <svg viewBox="0 0 202.9 45.5">
          <clipPath
            id="menu"
            clipPathUnits="objectBoundingBox"
            transform="scale(0.0049285362247413 0.021978021978022)"
          >
            <path
              d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7
            c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5
            c9.2,3.6,17.6,4.2,23.3,4H6.7z"
            />
          </clipPath>
        </svg>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          Zarejestruj się jako {UserRole[activeDataItem].toLowerCase()}
        </div>
        <form action="#" onSubmit={onSubmit}>
          <div className={styles["user-details"]}>
            <div className={styles["input-box"]}>
              <span className={styles["details"]}>Login</span>
              <input type="text" placeholder="Wprowadź login" required />
            </div>
            <div className={styles["input-box"]}>
              <span className={styles["details"]}>Hasło</span>
              <input type="password" placeholder="Wprowadź hasło" required />
            </div>
          </div>
          <input name="role" type="hidden" value={UserRole[activeDataItem]} />
          <div className={styles["button"]}>
            <input type="submit" value="Zarejestruj się" />
          </div>
        </form>
      </div>
    </div>
    // <form className={styles.loginForm} onSubmit={onSubmit}>
    //   <LoginFormHeader role={logRole} />
    //   <div className={styles.loginFormFieldGroup}>
    //     <LoginFormFieldName />
    //     <LoginFormFieldPassword />
    //     {error && <div>{error}</div>}
    //   </div>
    //   <LoginFormButton />
    // </form>
  );
};

export default RegisterForm;
