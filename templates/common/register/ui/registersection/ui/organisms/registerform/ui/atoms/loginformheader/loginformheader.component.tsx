import { FC } from "react";
import { UserRole, UserRoleKey } from "templates/common";
import { Heading } from "ui";

const LoginFormHeader: FC<{ role: UserRoleKey }> = ({ role }) => {
  return (
    <Heading
      text={`Zaloguj się jako ${UserRole[role].toLowerCase()}`}
      style={{ textAlign: "center" }}
    />
  );
};

export default LoginFormHeader;
