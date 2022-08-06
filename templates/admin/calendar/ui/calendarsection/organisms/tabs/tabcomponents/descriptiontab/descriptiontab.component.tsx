import { FC, useContext, useRef } from "react";
import { TabButtonContainer, TabContainer, TabTitle } from "../../components";
import {
  removeItem,
  TabNextButtonType,
} from "../../components/tabnextbutton/tabnextbutton.component";
import { AddEventContext } from "../../contexts/addevent.context";

const DescriptionTab: FC = () => {
  const { currentTab, setServiceDescription } = useContext(AddEventContext);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  return (
    <TabContainer height={350}>
      <TabTitle title="Opis usługi" />
      <textarea
        name="Opis"
        id="Opis"
        cols={60}
        rows={7}
        maxLength={150}
        style={{ resize: "none" }}
        ref={textareaRef}
        placeholder="Opisz usługę(opcjonalne)..."
      />
      <TabButtonContainer
        type={TabNextButtonType.CUSTOM}
        customOnClick={() => {
          removeItem(currentTab);
          currentTab?.current?.enableTab(6, true);
          currentTab?.current?.enableTab(5, false);
          setServiceDescription(textareaRef.current?.value);
        }}
        index={5}
      />
    </TabContainer>
  );
};

export default DescriptionTab;
