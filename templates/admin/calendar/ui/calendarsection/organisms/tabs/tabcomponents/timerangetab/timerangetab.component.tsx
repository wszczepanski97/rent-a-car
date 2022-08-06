import { FC, useCallback, useContext, useMemo, useState } from "react";
import {
  DatePickerComponent,
  ItemEventArgs,
  RenderDayCellEventArgs,
  TimePickerComponent,
} from "@syncfusion/ej2-react-calendars";
import {
  removeItem,
  TabNextButtonType,
} from "../../components/tabnextbutton/tabnextbutton.component";
import { AddEventContext } from "../../contexts/addevent.context";
import {
  TabButtonContainer,
  TabContainer,
  TabError,
  TabTitle,
} from "../../components";
import {
  getBlockedDates,
  getBlockedPeriods,
  getNextDayDate,
  getNextHalfHourDate,
  getNextHalfHourDateForToday,
  getPrevHalfHourDate,
} from "../../helpers/date-helper";

export type DateRange = {
  startDateValue: Date;
  endDateValue: Date;
};

export const TimeRangeTab: FC = () => {
  const {
    currentTab,
    setSelectedDateTimeRange,
    selectedCar,
    selectedClient,
    setDeliveryEstimationTime,
  } = useContext(AddEventContext);
  const blockedPeriods: Date[] = useMemo(() => {
    const carBlockedPeriods =
      selectedCar?.uslugi
        .map((usluga) => getBlockedPeriods(usluga.DataOd, usluga.DataDo))
        .flat() || [];
    const clientBlockedPeriods =
      selectedClient?.wypozyczenia
        .map((wypozyczenie) => wypozyczenie.uslugi)
        .map((usluga) => getBlockedPeriods(usluga.DataOd, usluga.DataDo))
        .flat() || [];
    const blockedDates = Array.from(
      new Set([...carBlockedPeriods, ...clientBlockedPeriods])
    );
    return blockedDates;
  }, [getBlockedPeriods]);
  const blockedDates = useMemo(
    () => getBlockedDates(blockedPeriods),
    [blockedPeriods, getBlockedDates]
  );

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

  const getFirstAvailableDate = useCallback(() => {
    if (
      new Date().getHours() >= 21 ||
      (new Date().getHours() >= 20 && new Date().getMinutes() > 30)
    ) {
      return new Date(
        new Date(new Date().setDate(new Date().getDate() + 1)).setHours(
          7,
          0,
          0,
          0
        )
      );
    } else {
      return getNextHalfHourDateForToday(new Date());
    }
  }, []);

  const minDate = useMemo(() => {
    if (blockedDates.length > 0) {
      const lastBlockedDay = new Date(blockedDates[blockedDates.length - 1]);
      return new Date().getTime() > lastBlockedDay.getTime()
        ? getFirstAvailableDate()
        : new Date(
            new Date(getNextDayDate(lastBlockedDay).setHours(7, 0, 0, 0))
          );
    } else return getFirstAvailableDate();
  }, [blockedDates]);

  const [state, setState] = useState({
    startDateValue: minDate,
    endDateValue: getNextHalfHourDate(minDate),
  });

  const minTime = useMemo(() => {
    const startDateValueDuplicate = new Date(state.startDateValue.getTime());
    return new Date(startDateValueDuplicate.setHours(7, 0, 0, 0));
  }, [state]);

  const maxTime = useMemo(() => {
    const startDateValueDuplicate = new Date(state.startDateValue.getTime());
    return new Date(startDateValueDuplicate.setHours(21, 0, 0, 0));
  }, [state]);

  const onChangeStartDate = useCallback(
    (e) => {
      if (new Date(e.value) > state.endDateValue) {
        setState({
          startDateValue: new Date(e.value),
          endDateValue: getNextHalfHourDate(new Date(e.value)),
        });
      } else {
        setState({ ...state, startDateValue: new Date(e.value) });
      }
    },
    [state, getNextHalfHourDate]
  );

  const onChangeEndDate = useCallback(
    (e) => {
      if (new Date(e.value) < state.startDateValue) {
        setState({
          startDateValue: getPrevHalfHourDate(new Date(e.value)),
          endDateValue: new Date(e.value),
        });
      } else {
        setState({ ...state, endDateValue: new Date(e.value) });
      }
    },
    [state, getPrevHalfHourDate]
  );

  const onCustomOnNextButtonClick = (range: DateRange) => {
    if (range.startDateValue == null) {
      document.getElementById("err3")!.innerText =
        "Data od nie została wybrana, prosimy o uzupełnienie";
    } else if (range.endDateValue == null) {
      document.getElementById("err3")!.innerText =
        "Data do nie została wybrana, prosimy o uzupełnienie";
    } else {
      document.getElementById("err3")!.innerText = "";
      removeItem(currentTab);
      currentTab?.current?.enableTab(4, true);
      currentTab?.current?.enableTab(3, false);
      range.startDateValue;
      const utcRange = {
        startDateValue: new Date(
          range.startDateValue.toUTCString().slice(0, -4)
        ),
        endDateValue: new Date(range.endDateValue.toUTCString().slice(0, -4)),
      };
      setSelectedDateTimeRange(utcRange);
    }
  };

  return (
    <TabContainer height={350}>
      <TabTitle title="Wstaw datę od i do usługi" />
      <TabError index={3} />
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
              serverTimezoneOffset={0}
              data-name="StartDate"
              className="e-field"
              min={minDate}
              onChange={onChangeStartDate}
              renderDayCell={onRenderCell}
              value={state.startDateValue}
            ></DatePickerComponent>
            <TimePickerComponent
              itemRender={onItemRender}
              min={minDate}
              max={getPrevHalfHourDate(maxTime)}
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
              renderDayCell={onRenderCell}
              min={minDate}
              onChange={onChangeEndDate}
              value={state.endDateValue}
            ></DatePickerComponent>
            <TimePickerComponent
              itemRender={onItemRender}
              min={getNextHalfHourDate(minTime)}
              max={maxTime}
              onChange={onChangeEndDate}
              value={state.endDateValue}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label className="e-textlabel">
            Szacowany czas podstawienia/odstawienia (w godzinach)
          </label>
          <input
            type="number"
            defaultValue={0}
            min="0"
            max="4"
            step="0.5"
            onChange={(e) => {
              setDeliveryEstimationTime(e.target.value);
            }}
          />
        </div>
      </div>
      <br />
      <TabButtonContainer
        type={TabNextButtonType.CUSTOM}
        customOnClick={() => onCustomOnNextButtonClick(state)}
        index={3}
      />
    </TabContainer>
  );
};

export default TimeRangeTab;
