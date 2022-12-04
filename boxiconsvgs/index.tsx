import AddToQueueSVG from "boxiconsvgs/AddToQueueSVG.component";
import CarMechanicSVG from "boxiconsvgs/CarMechanicSVG.component";
import ChevronsLeftSVG from "boxiconsvgs/ChevronsLeftSVG.component";
import ChevronsRightSVG from "boxiconsvgs/ChevronsRightSVG.component";
import DashboardSVG from "boxiconsvgs/DashboardSVG.component";
import FolderOpenSVG from "boxiconsvgs/FolderOpenSVG.component";
import GroupSVG from "boxiconsvgs/GroupSVG.component";
import HashSVG from "boxiconsvgs/HashSVG.component";
import KeySVG from "boxiconsvgs/KeySVG.component";
import LogOutSVG from "boxiconsvgs/LogoutSVG.component";
import UserCircleSVG from "boxiconsvgs/UserCircleSVG.component";
import UserCircleWithBgSVG from "boxiconsvgs/UserCircleWithBgSVG.component";
import LogInSVG from "./LogInSVG.component";
import SearchSVG from "./SearchSVG.component";
import UserPlusSVG from "./UserPlusSVG.component";

const BoxiconSvgs = {
  AddToQueue: AddToQueueSVG,
  CarMechanic: CarMechanicSVG,
  ChevronsLeft: ChevronsLeftSVG,
  ChevronsRight: ChevronsRightSVG,
  Dashboard: DashboardSVG,
  FolderOpen: FolderOpenSVG,
  Group: GroupSVG,
  Hash: HashSVG,
  Key: KeySVG,
  LogIn: LogInSVG,
  LogOut: LogOutSVG,
  Search: SearchSVG,
  UserCircle: UserCircleSVG,
  UserCircleWithBg: UserCircleWithBgSVG,
  UserPlus: UserPlusSVG,
} as const;

export default BoxiconSvgs;
