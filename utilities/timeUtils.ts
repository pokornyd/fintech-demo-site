type DateTimeStamp = string;

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function _printDate(date: Date): string {
  return `${months[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`; //.format('MMM D, YYYY');
}

function _printTime(date: Date, includeSeconds: boolean = false): string {
  return `${date.getHours()}:${date.getMinutes()}${includeSeconds ? `:${date.getSeconds()}` : ''}`; // .format('h:mm' + (includeSeconds ? ':ss' : '') + ' a');
}

function _printDatetime(date: Date, includeSeconds: boolean = false): string {
  return _printDate(date) + ' \u00B7 ' + _printTime(date, includeSeconds);
}

export function isTimeInPast(now: Date, timeToCheck: DateTimeStamp): boolean {
  const localTimeToCheck = toLocalTime(timeToCheck);
  if (!localTimeToCheck) {
    throw new Error('Error occurred when computing timeToCheck to local time.');
  }
  return (now.getTime() - localTimeToCheck.getTime()) > 0;
}

const timeScale = [
  {
    multiplier: 60,
    singular: 'minute',
    plural: 'minutes',
  },
  {
    multiplier: 60,
    singular: 'hour',
    plural: 'hours',
  },
  {
    multiplier: 24,
    singular: 'day',
    plural: 'days',
  },
];

export function toFuzzyDateDifference(endDate: Date, startDate: Date, withTime: boolean = false): string {
  // Difference of now and last modified in seconds
  let diff = Math.abs((endDate.getTime() - startDate.getTime()) / 1000);
  const isInFuture = endDate.getTime() < startDate.getTime();

  // At the current time
  if (diff < 60) {
    return isInFuture ? 'Now' : 'Just now';
  }

  // For more than five days
  if (diff > 5 * 24 * 3600) {
    if (withTime) {
      return _printDatetime(startDate);
    }

    return _printDate(startDate);
  }

  for (let i = 0; i < timeScale.length; i++) {
    const segment = timeScale[i];
    // Diff is always > 1 here
    diff /= segment.multiplier;

    if (diff < 2) {
      return isInFuture ? `In 1 ${segment.singular}` : `1 ${segment.singular} ago`;
    }

    const nextSegment = timeScale[i + 1];

    if (!nextSegment || (diff < nextSegment.multiplier)) {
      return isInFuture ? `In ${Math.floor(diff)} ${segment.plural}` : `${Math.floor(diff)} ${segment.plural} ago`;
    }
  }

  // Unexpected fallback defaults to date / time
  if (withTime) {
    return _printDatetime(startDate);
  }

  return _printDate(startDate);
}

export function toLocalTime(datetimeString: string | null): Date | null {
  if (!datetimeString) {
    return null;
  }

  try {
    const date = new Date(datetimeString);
    return date;
  }
  catch (err) {
    console.error(err);
    throw new TypeError(`Unable to make a date for '${datetimeString}' parameter.`);
  }
}

export function renderDateString(datetimeString: string | null): string | null {
  const datetime = toLocalTime(datetimeString);
  return datetime ? _printDate(datetime) : null;
}

export function renderTimeString(datetimeString: string | null, includeSeconds: boolean = false): string | null {
  const datetime = toLocalTime(datetimeString);
  return datetime ? _printTime(datetime, includeSeconds) : null;
}

export function renderDatetimeString(datetimeString: string | null, includeSeconds: boolean = false): string | null {
  const datetime = toLocalTime(datetimeString);
  return datetime ? _printDatetime(datetime, includeSeconds) : null;
}

export function getTimestamp(dateTimeString: string | null): number {
  if (!dateTimeString) {
    return 0;
  }
  return new Date(dateTimeString).getTime();
}

export function getTimestampInSeconds(dateTimeString: string): number {
  return Math.floor(getTimestamp(dateTimeString) / 1000.0);
}

export function printFuzzyDate(dateTime: Date): string | undefined {
  return toFuzzyDateDifference(new Date(), dateTime, false);
}
