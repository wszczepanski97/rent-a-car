export const getNextHalfHourDate = (date: Date) => {
  const dateDuplicate = new Date(date.getTime());
  return new Date(dateDuplicate.getTime() + 30 * 60 * 1000);
};

export const getPrevHalfHourDate = (date: Date) => {
  const dateDuplicate = new Date(date.getTime());
  return new Date(dateDuplicate.getTime() - 30 * 60 * 1000);
};

export const getNextHalfHourDateForToday = (date: Date) => {
  const dateDuplicate = new Date(date.getTime());
  return dateDuplicate.getMinutes() >= 30
    ? new Date(
        dateDuplicate.getFullYear(),
        dateDuplicate.getMonth(),
        dateDuplicate.getDate(),
        dateDuplicate.getHours() + 1,
        0,
        0
      )
    : new Date(
        dateDuplicate.getFullYear(),
        dateDuplicate.getMonth(),
        dateDuplicate.getDate(),
        dateDuplicate.getHours(),
        30,
        0
      );
};

export const getNextDayDate = (date: Date) => {
  const dateDuplicate = new Date(date.getTime());
  return new Date(dateDuplicate.setDate(date.getDate() + 1));
};

export const getBlockedPeriods = (
  startDate: Date,
  endDate: Date,
  isStartDate: boolean
) => {
  let dates: Date[] = [];
  let startDateDuplicate = new Date(
    new Date(startDate).getTime() +
      new Date(startDate).getTimezoneOffset() * 60 * 1000
  );
  const endDateDuplicate = new Date(
    new Date(endDate).getTime() +
      new Date(endDate).getTimezoneOffset() * 60 * 1000
  );
  while (startDateDuplicate <= endDateDuplicate) {
    dates = [...dates, new Date(startDateDuplicate)];
    startDateDuplicate = getNextHalfHourDate(startDateDuplicate);
  }
  if (isStartDate) dates.pop();
  else dates.shift();
  return dates;
};

export const getBlockedDates = (blockedPeriods: Date[]) => {
  const object: Record<string, number> = {};
  blockedPeriods.forEach((blockedPeriod) => {
    if (!object[blockedPeriod.toDateString()]) {
      object[blockedPeriod.toDateString()] = 0;
    }
    object[blockedPeriod.toDateString()] =
      object[blockedPeriod.toDateString()] + 1;
  });
  const array = [];
  for (const key in object) {
    if (object[key] >= 48) {
      array.push(new Date(key));
    }
  }
  return array.sort((a, b) => a.getTime() - b.getTime());
};
