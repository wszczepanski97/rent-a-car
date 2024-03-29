import {
  DatePickerComponent,
  ItemEventArgs,
  RenderDayCellEventArgs,
  TimePickerComponent,
} from "@syncfusion/ej2-react-calendars";
import { FC, useCallback, useContext, useMemo, useState } from "react";
import { CalendarContext } from "templates/cleaner/calendar/contexts/calendar.context";
import {
  TabButtonContainer,
  TabContainer,
  TabError,
  TabTitle,
} from "../../components";
import {
  removeItem,
  TabNextButtonType,
} from "../../components/tabnextbutton/tabnextbutton.component";
import { AddEventContext } from "../../contexts/addevent.context";
import {
  getBlockedDates,
  getBlockedPeriods,
  getNextHalfHourDate,
  getNextHalfHourDateForToday,
  getPrevHalfHourDate,
} from "../../helpers/date-helper";
export type DateRange = {
  startDateValue: Date;
  endDateValue: Date;
};

export const TimeRangeWashingTab: FC = () => {
  const { services } = useContext(CalendarContext);
  const {
    currentTab,
    selectedDateTimeRange,
    setSelectedDateTimeRange,
    setSelectedWashingType,
    selectedCar,
  } = useContext(AddEventContext);
  const blockedPeriods: {
    blockedPeriodsStartDate: Date[];
    blockedPeriodsEndDate: Date[];
  } = useMemo(() => {
    const blockedPeriodsStartDate =
      [
        ...(selectedCar?.uslugi
          ? selectedCar?.uslugi?.map((usluga) =>
              getBlockedPeriods(usluga.DataOd, usluga.DataDo, true)
            )
          : []),
        ...(services
          ? services.map((usluga) =>
              getBlockedPeriods(usluga!.DataOd, usluga!.DataDo, true)
            )
          : []),
      ]
        .flat()
        .sort((a, b) => a.getTime() - b.getTime()) || [];
    const blockedPeriodsEndDate =
      [
        ...(selectedCar?.uslugi
          ? selectedCar?.uslugi?.map((usluga) =>
              getBlockedPeriods(usluga.DataOd, usluga.DataDo, false)
            )
          : []),
        ...(services
          ? services.map((usluga) =>
              getBlockedPeriods(usluga!.DataOd, usluga!.DataDo, false)
            )
          : []),
      ]
        .flat()
        .sort((a, b) => a.getTime() - b.getTime()) || [];
    return { blockedPeriodsStartDate, blockedPeriodsEndDate };
  }, [selectedCar?.uslugi, services]);

  const blockedDates = useMemo(
    () => getBlockedDates(blockedPeriods.blockedPeriodsStartDate),
    [blockedPeriods]
  );

  const onRenderCell = (args: RenderDayCellEventArgs) => {
    if (args.date && blockedDates.includes(new Date(args.date))) {
      args.isDisabled = true;
    }
  };

  const onItemRenderStartDate = (args: ItemEventArgs) => {
    const blockedPeriodsString = blockedPeriods.blockedPeriodsStartDate.map(
      (blockedPeriod) => blockedPeriod.toUTCString()
    );
    if (
      blockedPeriodsString.includes(new Date(args.value).toUTCString()) ||
      new Date(args.value) < new Date()
    ) {
      args.isDisabled = true;
    }
  };

  const onItemRenderEndDate = (args: ItemEventArgs) => {
    const blockedPeriodsString = blockedPeriods.blockedPeriodsEndDate.map(
      (blockedPeriod) => blockedPeriod.toUTCString()
    );
    if (
      blockedPeriodsString.includes(new Date(args.value).toUTCString()) ||
      new Date(args.value) < getNextHalfHourDate(new Date())
    ) {
      args.isDisabled = true;
    }
  };

  const minDate = useMemo(() => {
    if (blockedDates.length > 0) {
      const blockedDate = blockedPeriods.blockedPeriodsStartDate.find((el, i) =>
        !(blockedPeriods.blockedPeriodsStartDate.length - 1 <= i)
          ? blockedPeriods.blockedPeriodsStartDate[i + 1].getTime() >
              new Date().getTime() &&
            Math.abs(
              (blockedPeriods.blockedPeriodsStartDate[
                i + 1
              ] as unknown as number) - (el as unknown as number)
            ) /
              36e5 >
              0.5
          : undefined
      );
      if (blockedDate) return getNextHalfHourDateForToday(blockedDate);
      return blockedPeriods.blockedPeriodsStartDate[
        blockedPeriods.blockedPeriodsStartDate.length - 1
      ].getTime() > new Date().getTime()
        ? getNextHalfHourDateForToday(
            blockedPeriods.blockedPeriodsStartDate[
              blockedPeriods.blockedPeriodsStartDate.length - 1
            ]
          )
        : getNextHalfHourDateForToday(new Date());
    } else return getNextHalfHourDateForToday(new Date());
  }, [blockedDates, blockedPeriods.blockedPeriodsStartDate]);

  const [state, setState] = useState({
    startDateValue: selectedDateTimeRange?.startDateValue
      ? new Date(
          new Date(selectedDateTimeRange?.startDateValue).getTime() +
            new Date(
              selectedDateTimeRange?.startDateValue
            ).getTimezoneOffset() *
              60 *
              1000
        )
      : minDate,
    endDateValue: selectedDateTimeRange?.endDateValue
      ? new Date(
          new Date(selectedDateTimeRange?.endDateValue).getTime() +
            new Date(selectedDateTimeRange?.endDateValue).getTimezoneOffset() *
              60 *
              1000
        )
      : getNextHalfHourDate(minDate),
  });

  const onChangeStartDate = useCallback(
    (e) => {
      const firstBlockedDate = blockedPeriods.blockedPeriodsStartDate.find(
        (el) => el.getTime() > e.value.getTime()
      );
      const isFirstBlockedDateSmallerThanEndDateValue =
        firstBlockedDate &&
        firstBlockedDate?.getTime() < state.endDateValue.getTime();

      if (firstBlockedDate && isFirstBlockedDateSmallerThanEndDateValue) {
        setState({
          startDateValue: new Date(e.value),
          endDateValue: new Date(firstBlockedDate),
        });
      } else if (new Date(e.value) > state.endDateValue) {
        setState({
          startDateValue: new Date(e.value),
          endDateValue: getNextHalfHourDate(new Date(e.value)),
        });
      } else {
        setState({ ...state, startDateValue: new Date(e.value) });
      }
    },
    [state, blockedPeriods.blockedPeriodsStartDate]
  );

  const onChangeEndDate = useCallback(
    (e) => {
      const copyArray = [...blockedPeriods.blockedPeriodsEndDate];
      const reversedArray = copyArray.sort((a, b) => b.getTime() - a.getTime());
      const firstBlockedDate = reversedArray.find(
        (el) => el.getTime() < e.value.getTime()
      );
      if (firstBlockedDate) {
        setState({
          startDateValue: new Date(firstBlockedDate),
          endDateValue: new Date(e.value),
        });
      } else if (new Date(e.value) < state.startDateValue) {
        setState({
          startDateValue: getPrevHalfHourDate(new Date(e.value)),
          endDateValue: new Date(e.value),
        });
      } else {
        setState({ ...state, endDateValue: new Date(e.value) });
      }
    },
    [state, blockedPeriods]
  );

  const onCustomOnNextButtonClick = (range: DateRange) => {
    const errorElement = document.getElementById("err3");
    if (range.startDateValue == null) {
      if (errorElement) {
        errorElement.innerText =
          "Data od nie została wybrana, prosimy o uzupełnienie";
      }
    } else if (range.endDateValue == null) {
      if (errorElement) {
        errorElement.innerText =
          "Data do nie została wybrana, prosimy o uzupełnienie";
      }
    } else {
      if (errorElement) errorElement.innerText = "";

      removeItem(currentTab);
      currentTab?.current?.enableTab(3, true);
      currentTab?.current?.enableTab(2, false);
      setSelectedDateTimeRange(range);
    }
  };

  return (
    <TabContainer height={350}>
      <TabTitle title="Wstaw datę od i do usługi" />
      <TabError index={2} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <label className="e-textlabel">Data od</label>
            <DatePickerComponent
              id="StartDate"
              format="dd/MM/yy"
              data-name="StartDate"
              className="e-field"
              min={minDate}
              onChange={onChangeStartDate}
              renderDayCell={onRenderCell}
              value={state.startDateValue}
            ></DatePickerComponent>
            <TimePickerComponent
              itemRender={onItemRenderStartDate}
              onChange={onChangeStartDate}
              value={state.startDateValue}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <label className="e-textlabel">Data do</label>
            <DatePickerComponent
              id="EndDate"
              format="dd/MM/yy"
              data-name="EndDate"
              className="e-field"
              min={getNextHalfHourDate(minDate)}
              onChange={onChangeEndDate}
              renderDayCell={onRenderCell}
              value={state.endDateValue}
            ></DatePickerComponent>
            <TimePickerComponent
              itemRender={onItemRenderEndDate}
              onChange={onChangeEndDate}
              value={state.endDateValue}
            />
          </div>
        </div>
      </div>
      <br />
      <TabButtonContainer
        type={TabNextButtonType.CUSTOM}
        customOnClick={() => onCustomOnNextButtonClick(state)}
        index={2}
        onBackClick={() => {
          setSelectedWashingType(undefined);
        }}
      />
    </TabContainer>
  );
};

export default TimeRangeWashingTab;
