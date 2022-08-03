export const getNextHalfHourDate = (date: Date) => {
  const dateDuplicate = new Date(date.getTime());
  return new Date(dateDuplicate.getTime() + 30 * 60 * 1000);
};

export const getPrevHalfHourDate = (date: Date) => {
  const dateDuplicate = new Date(date.getTime());
  return new Date(dateDuplicate.getTime() - 30 * 60 * 1000);
};

export const getNextDayDate = (date: Date) => {
  const dateDuplicate = new Date(date.getTime());
  return new Date(dateDuplicate.setDate(date.getDate() + 1));
};

export const getBlockedPeriods = (startDate: Date, endDate: Date) => {
  let dates: Date[] = [];
  let startDateDuplicate = new Date(startDate);
  const endDateDuplicate = new Date(endDate);
  while (startDateDuplicate <= endDateDuplicate) {
    dates = [...dates, new Date(startDateDuplicate)];
    startDateDuplicate = getNextHalfHourDate(startDateDuplicate);
  }
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
      array.push(key);
    }
  }
  return array;
};
