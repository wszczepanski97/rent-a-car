import { FC } from "react";
import { LoginUserRole, UserRoleKey } from "templates/common";
import { Heading } from "ui";

const LoginFormHeader: FC<{ role: UserRoleKey }> = ({ role }) => {
  return (
    <Heading
      text={`Zaloguj się jako ${LoginUserRole[role].toLowerCase()}`}
      style={{ textAlign: "center" }}
    />
  );
};

export default LoginFormHeader;
