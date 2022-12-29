import {
  ClickEventArgs,
  ItemDirective,
  ItemsDirective,
  ToolbarComponent,
} from "@syncfusion/ej2-react-navigations";
import { ScheduleComponent, View } from "@syncfusion/ej2-react-schedule";
import type { FC } from "react";

const Toolbar: FC<{ schedule: ScheduleComponent | null }> = ({ schedule }) => {
  const updateLiveTime = () => {
    let timeBtn = document.querySelector("#timeBtn");
    if (timeBtn) {
      timeBtn.innerHTML =
        `<span className="e-btn-icon e-icons e-clock e-icon-left"></span>` +
        new Date().toLocaleString();
    }
  };

  const getEventData = () => {
    if (schedule) {
      const date = schedule.selectedDate;
      return {
        Id: schedule.getEventMaxID(),
        ServiceType: "",
        StartTimeZone: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          new Date().getHours(),
          0,
          0
        ),
        EndTime: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          new Date().getHours() + 1,
          0,
          0
        ),
        PickLocation: "",
        ReturnLocation: "",
        PickEmployee: "",
        ReturnEmployee: "",
        OwnerEmployee: "",
        Description: "",
        IsAllDay: false,
      };
    }
  };

  const onToolbarItemClicked = (args: ClickEventArgs) => {
    if (schedule) {
      if (args.item.text !== "Dodaj mycie") {
        schedule.currentView = args.item.text as View;
      } else {
        //@ts-ignore
        schedule.openEditor(getEventData(), "Add", true);
      }
    }
  };

  return (
    <ToolbarComponent
      id="toolbar_options"
      width="100%"
      created={() =>
        setInterval(() => {
          updateLiveTime();
        }, 1000)
      }
      clicked={onToolbarItemClicked}
    >
      <ItemsDirective>
        <ItemDirective
          prefixIcon="e-icons e-plus"
          tooltipText="Dodaj mycie"
          text="Dodaj mycie"
        />
        <ItemDirective type="Separator" />
        <ItemDirective
          template={`<button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="e-tbr-btn_725" tabindex="-1" aria-label="Day" style="width: auto;"><span class="e-btn-icon e-icons e-day e-icon-left"></span><span class="e-tbar-btn-text">Dzień</span></button>`}
          tooltipText="Dzień"
          text="Day"
        />
        <ItemDirective
          template={`<button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="e-tbr-btn_545" tabindex="-1" aria-label="WorkWeek" style="width: auto;"><span class="e-btn-icon e-icons e-week e-icon-left"></span><span class="e-tbar-btn-text">Tydzień</span></button>`}
          tooltipText="Tydzień"
          text="Week"
        />
        <ItemDirective
          template={`<button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="e-tbr-btn_545" tabindex="-1" aria-label="WorkWeek" style="width: auto;"><span class="e-btn-icon e-icons e-week e-icon-left"></span><span class="e-tbar-btn-text">Tydzień roboczy</span></button>`}
          tooltipText="Tydzień roboczy"
          text="WorkWeek"
        />
        <ItemDirective
          template={`<button class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib" type="button" id="e-tbr-btn_363" tabindex="-1" aria-label="Month" style="width: auto;"><span class="e-btn-icon e-icons e-month e-icon-left"></span><span class="e-tbar-btn-text">Miesiąc</span></button>`}
          tooltipText="Miesiąc"
          text="Month"
        />
        <ItemDirective
          prefixIcon="e-icons e-agenda-date-range"
          tooltipText="Agenda"
          text="Agenda"
        />
      </ItemsDirective>
    </ToolbarComponent>
  );
};

export default Toolbar;
