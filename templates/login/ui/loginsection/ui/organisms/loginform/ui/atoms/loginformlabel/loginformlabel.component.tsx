import { FC } from "react";
import { Heading, HeadingProps } from "ui";

const LoginFormLabel: FC<HeadingProps> = (props) => (
  <Heading {...props} as="h6" />
);

export default LoginFormLabel;
