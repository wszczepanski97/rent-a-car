import { FC } from "react";
import { Heading } from "ui";

const LoginFormHeader: FC<{ role: string }> = ({ role }) => {
  return (
    <Heading
      text={
        role
          ? `Log to ${
              role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
            } Panel`
          : "Log in"
      }
      style={{ textAlign: "center" }}
    />
  );
};

export default LoginFormHeader;
