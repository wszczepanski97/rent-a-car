import { FC, useCallback, useContext, useMemo, useState } from "react";
import {
  DatePickerComponent,
  ItemEventArgs,
  RenderDayCellEventArgs,
  TimePickerComponent,
} from "@syncfusion/ej2-react-calendars";
import {
  getNextDayDate,
  getNextHalfHourDate,
  getPrevHalfHourDate,
  getNextHalfHourDateForToday,
  getBlockedPeriods,
  getBlockedDates,
} from "./helpers/date-helper";
import { AddEventContext } from "./contexts/addevent.context";

export type DateRange = {
  startDateValue: Date;
  endDateValue: Date;
};

export const Tab3: FC = () => {
  const { selectedCar, selectedClient } = useContext(AddEventContext);
  const blockedPeriods: Date[] = useMemo(() => {
    //@ts-ignore
    const carBlockedPeriods = selectedCar.uslugi
      //@ts-ignore
      .map((usluga) => getBlockedPeriods(usluga.DataOd, usluga.DataDo))
      .flat();
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

  const minDate = useMemo(() => {
    const lastBlockedDay = new Date(blockedDates[blockedDates.length - 1]);
    return new Date().getTime() > lastBlockedDay.getTime()
      ? getNextHalfHourDateForToday(new Date())
      : new Date(new Date(getNextDayDate(lastBlockedDay).setHours(7, 0, 0, 0)));
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

  return (
    <div
      id="details"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 350,
        width: 500,
        gap: 15,
        margin: "0 auto",
      }}
    >
      <h4 className="e-textlabel"> Wstaw datę od i do usługi</h4>
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
      <br />
      <div
        className="btn-container"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 10,
        }}
      >
        <button
          id="selectDates"
          className="e-btn"
          onClick={() => onClick(state)}
          style={{ backgroundColor: "#5aad73", border: 0 }}
        >
          Przejdź dalej
        </button>
        <button
          id="goBackToBook"
          className="e-btn"
          onClick={goStepBack}
          style={{ backgroundColor: "#ff5757", border: 0 }}
        >
          Wróć
        </button>
      </div>
      <span id="err3" />
    </div>
  );
};
