import CardButton from "ui/molecules/card/components/cardbutton/cardbutton.component";
import { CardButtonType } from "ui/molecules/card/components/cardbutton/cardbuttontype.enum";

const BackToDashboardButton = () => (
  <CardButton
    type={CardButtonType.CardButtonWithBG}
    buttonText="Wróć do dashboardu"
    bgColor="var(--primary-color)"
    color="var(--light-text-color)"
    href="/client/dashboard"
  />
);

export default BackToDashboardButton;
