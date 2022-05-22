import { FC, useCallback, useRef, useState } from "react";
import {
  DatePickerComponent,
  ItemEventArgs,
  RenderDayCellEventArgs,
  TimePickerComponent,
} from "@syncfusion/ej2-react-calendars";

type Tab2Props = {
  goStepBack(): void;
  selectedCar: Object | undefined;
};

export const Tab2: FC<Tab2Props> = ({ goStepBack, selectedCar }) => {
  const [startDateValue, setStartDateValue] = useState<Date>();
  const [startTimeDisabled, setStartTimeDisabled] = useState(true);
  const [endDateValue, setEndDateValue] = useState<Date>();
  const [endTimeDisabled, setEndTimeDisabled] = useState(true);
  const getBlockedPeriods = (startDate: string, endDate: string) => {
    let dates: Date[] = [];
    let startDateDuplicate = new Date(startDate);
    const endDateDuplicate = new Date(endDate);
    while (startDateDuplicate <= endDateDuplicate) {
      dates = [...dates, new Date(startDateDuplicate)];
      startDateDuplicate = new Date(
        startDateDuplicate.getTime() + 30 * 60 * 1000
      );
    }
    return dates;
  };
  const blockedPeriods: Date[] = Array.from(
    new Set(
      //@ts-ignore
      selectedCar.uslugi
        //@ts-ignore
        .map((usluga) => getBlockedPeriods(usluga.DataOd, usluga.DataDo))
        .flat()
    )
  );
  const getBlockedDates = () => {
    const object = {};
    blockedPeriods.forEach((blockedPeriod) => {
      //@ts-ignore
      if (!object[blockedPeriod.toDateString()]) {
        //@ts-ignore
        object[blockedPeriod.toDateString()] = 0;
      }
      //@ts-ignore
      object[blockedPeriod.toDateString()] =
        //@ts-ignore
        object[blockedPeriod.toDateString()] + 1;
    });
    const array = [];
    for (const key in object) {
      //@ts-ignore
      if (object[key] === 48) {
        array.push(key);
      }
    }
    return array;
  };
  const blockedDates = getBlockedDates();
  const onRenderCell = (args: RenderDayCellEventArgs) => {
    if (
      args.date &&
      blockedDates.includes(new Date(args.date).toDateString())
    ) {
      args.isDisabled = true;
    }
  };

  const onItemRender = (args: ItemEventArgs) => {
    const blockedPeriodsString = blockedPeriods.map((blockedPeriod) =>
      blockedPeriod.toUTCString()
    );
    if (blockedPeriodsString.includes(new Date(args.value).toUTCString())) {
      args.isDisabled = true;
    }
  };

  const onChange = useCallback(
    (e) => {
      setStartDateValue(e.value);
      setStartTimeDisabled(false);
    },
    [startDateValue, startTimeDisabled]
  );
  console.log(startTimeDisabled);
  return (
    <div id="details">
      <div className="details-page wizard-title">Wstaw datę od i do usługi</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <div>
          <label className="e-textlabel">Data od</label>
          <DatePickerComponent
            id="StartTime"
            format="dd/MM/yy"
            data-name="StartTime"
            className="e-field"
            renderDayCell={onRenderCell}
            min={new Date()}
            value={startDateValue}
            onChange={onChange}
          ></DatePickerComponent>
          <TimePickerComponent
            itemRender={onItemRender}
            value={
              startDateValue && new Date(startDateValue.setHours(10, 0, 0, 0))
            }
            // disabled={startTimeDisabled}
          />
        </div>
        <div>
          <label className="e-textlabel">Data do</label>
          <DatePickerComponent
            id="EndTime"
            format="dd/MM/yy"
            data-name="EndTime"
            className="e-field"
            // renderDayCell={onRenderCell}
            min={new Date()}
            value={endDateValue}
            // onChange={(e) => {
            //   setStartDateValue(new Date(e.value).toISOString());
            //   setStartTimeDisabled(false);
            // }}
          ></DatePickerComponent>
          <TimePickerComponent
            itemRender={onItemRender}
            disabled={endTimeDisabled}
          />
        </div>
      </div>
      <br />
      <div className="btn-container">
        <button id="goBackToBook" className="e-btn" onClick={goStepBack}>
          Back
        </button>
      </div>
      <span id="err3" />
    </div>
  );
};
