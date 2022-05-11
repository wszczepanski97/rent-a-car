import { CardButton } from "ui/common/molecules/card/ui";
import { CardButtonType } from "ui/common/molecules/card/ui/atoms/cardbutton/cardbutton.component";

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
