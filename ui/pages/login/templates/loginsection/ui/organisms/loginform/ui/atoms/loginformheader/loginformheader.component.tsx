import { RoleContext } from "pages/login";
import { FC } from "react";
import { Heading } from "ui";
const LoginFormHeader: FC = () => {
  return (
    <RoleContext.Consumer>
      {(role) => (
        <Heading
          text={`Log to ${
            role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
          } Panel`}
          style={{ textAlign: "center" }}
        />
      )}
    </RoleContext.Consumer>
  );
};

export default LoginFormHeader;
