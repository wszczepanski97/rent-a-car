import CarMechanicSVG from "boxiconsvgs/CarMechanicSVG.component";
import ChevronsLeftSVG from "boxiconsvgs/ChevronsLeftSVG.component";
import ChevronsRightSVG from "boxiconsvgs/ChevronsRightSVG.component";
import GroupSVG from "boxiconsvgs/GroupSVG.component";
import HashSVG from "boxiconsvgs/HashSVG.component";
import KeySVG from "boxiconsvgs/KeySVG.component";
import UserCircleSVG from "boxiconsvgs/UserCircleSVG.component";
import LogInSVG from "./LogInSVG.component";
import SearchSVG from "./SearchSVG.component";
import UserPlusSVG from "./UserPlusSVG.component";

const BoxiconSvgs = {
  CarMechanic: CarMechanicSVG,
  ChevronsLeft: ChevronsLeftSVG,
  ChevronsRight: ChevronsRightSVG,
  Group: GroupSVG,
  Hash: HashSVG,
  Key: KeySVG,
  LogIn: LogInSVG,
  Search: SearchSVG,
  UserCircle: UserCircleSVG,
  UserPlus: UserPlusSVG,
} as const;

export default BoxiconSvgs;
