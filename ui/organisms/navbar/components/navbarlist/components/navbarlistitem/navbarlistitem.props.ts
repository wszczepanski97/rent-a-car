import BoxiconSvgs from "boxiconsvgs";
import { LinkProps } from "ui/atoms/link/link.props";

export type NavbarListItemProps = LinkProps & {
  dataIcon?: keyof typeof BoxiconSvgs;
  logout?: boolean;
};
