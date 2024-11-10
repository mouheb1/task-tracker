// -- ./src/functions/helpers.ts
export function getFullDateTimes(
  dayName: string,
  startTime: string,
  endTime: string,
  weekType: 'current' | 'next' = 'current'
): { startDateTime: Date; endDateTime: Date } {
  // Map day names to numbers: Sunday=0, Monday=1, ..., Saturday=6
  const daysMap: { [key: string]: number } = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
  };

  const targetDayNumber = daysMap[dayName.toUpperCase()];
  if (targetDayNumber === undefined) {
    throw new Error('Invalid day name');
  }

  const currentDate = new Date();
  const currentDayNumber = currentDate.getDay(); // Sunday=0, Monday=1, ..., Saturday=6

  let daysUntilTarget: number;

  if (weekType === 'current') {
    // Calculate days until target day in the current week
    daysUntilTarget = targetDayNumber - currentDayNumber;
    if (daysUntilTarget < 0) {
      // If the target day has already passed this week, adjust to get the date in the past
      daysUntilTarget += 7;
    }
  } else if (weekType === 'next') {
    // Calculate days until the target day in the next week
    daysUntilTarget = (targetDayNumber - currentDayNumber + 7) % 7;
    if (daysUntilTarget === 0) {
      daysUntilTarget = 7;
    } else {
      daysUntilTarget += 7;
    }
  } else {
    throw new Error('Invalid weekType');
  }

  const targetDate = new Date(currentDate);
  targetDate.setDate(currentDate.getDate() + daysUntilTarget);

  // Parse start and end times
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  // Set start and end times
  const startDateTime = new Date(targetDate);
  startDateTime.setHours(startHour, startMinute, 0, 0);

  const endDateTime = new Date(targetDate);
  endDateTime.setHours(endHour, endMinute, 0, 0);

  return { startDateTime, endDateTime };
}
