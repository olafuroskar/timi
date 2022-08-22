import {
  GetTimeAndTimestring,
  GetTimeAndTimestringTemp,
  TimeAndTimestring,
  TimeType,
  TimeWithHoursAndMs
} from '@/timi/timestring/types';
import {
  getStringFromTime,
  parseVal,
  parseVals,
  splitAndParse
} from '@/timi/timestring/utils/timeUtils';

const timeStringWithHoursAndMsRegex = new RegExp(
  /^(([0-9]{0,1}|([0-1][0-9])|(2[0-3]))(:([0-9]{0,1}|([0-5][0-9]))){0,2}(\.[0-9]{0,3}){0,1})$/
);

const timeWithHoursAndMs = (
  hours: number,
  minutes: number,
  seconds: number,
  milliseconds: number
): TimeWithHoursAndMs => ({
  type: TimeType.WithHoursAndMs,
  hours,
  minutes,
  seconds,
  milliseconds
});

const getTimeAndTimestring = (
  hours: number,
  minutes: number,
  seconds: number,
  milliseconds: number
): TimeAndTimestring | undefined => {
  const time = timeWithHoursAndMs(hours, minutes, seconds, milliseconds);
  return { time, timeString: getStringFromTime(time) };
};

export const getTimeAndTimestringWithHoursAndMs: GetTimeAndTimestring = (value) => {
  // If the value does not match the regex then we return undefined.
  if (!value.match(timeStringWithHoursAndMsRegex)) return undefined;

  if (value.includes(':')) {
    const values = value.split(':');

    if (values.length === 2) {
      // If the value after the : delimeter has a dot then we assume the first value is minutes
      // the second one seconds and the one after the dot milliseconds, i.e. {min}:{sec}.{ms}
      if (values[1].includes('.')) {
        const minutes = parseVal(values[0]);
        const [seconds, milliseconds] = splitAndParse(values[1], '.');
        return getTimeAndTimestring(0, minutes, seconds, milliseconds);
      }
      // Otherwise we assume the values are hours and minutes, i.e. {hrs}:{min}
      const [hours, minutes] = parseVals(values);
      return getTimeAndTimestring(hours, minutes, 0, 0);
    }
    // By here we can assume that we at least have 3 values in the value string

    // If the last value has a dot, then we can assume the last value contains seconds and milliseconds
    // and the first two hours and minutes {hrs}:{min}:{sec}.{ms}
    if (values[2].includes('.')) {
      const [hours, minutes] = [parseVal(values[0]), parseVal(values[1])];
      const [seconds, milliseconds] = splitAndParse(values[2], '.');
      return getTimeAndTimestring(hours, minutes, seconds, milliseconds);
    }

    // By here the only remaining choise is {hrs}:{min}:{sec}
    const [hours, minutes, seconds] = parseVals(values);
    return getTimeAndTimestring(hours, minutes, seconds, 0);
  }
  // By here we know that there is no : delimeter

  // If the value includes a dot, we assume the value before the dot is seconds and
  // the value after is milliseconds, i.e. {sec}.{ms}
  if (value.includes('.')) {
    const [seconds, milliseconds] = splitAndParse(value, '.');
    return getTimeAndTimestring(0, 0, seconds, milliseconds);
  }
  // Otherwise we assume the value is for hours. {hrs}
  return getTimeAndTimestring(parseVal(value), 0, 0, 0);
};

export const getTimeAndTimestringTempWithHoursAndMs: GetTimeAndTimestringTemp = (value) => {
  // In the case where there are three valid characters in a row we want to insert
  // a delimeter between the second and third character
  if (value.match(/^(([0-1][0-9])|(2[0-3]))[0-9]$/)) {
    const time = timeWithHoursAndMs(
      parseVal(value.substring(0, 2)),
      parseVal(value.substring(2, 3)),
      0,
      0
    );
    return { time, timeString: `${value.substring(0, 2)}:${time.minutes}` };
  }

  // In the case where there are six valid characters in a row we want to insert
  // a delimeter between the fifth and sixth character
  if (value.match(/^(([0-1][0-9])|(2[0-3])):[0-5][0-9][0-9]$/)) {
    const time = timeWithHoursAndMs(
      parseVal(value.substring(0, 2)),
      parseVal(value.substring(3, 5)),
      parseVal(value.substring(5, -1)),
      0
    );
    return { time, timeString: `${value.substring(0, 5)}:${time.seconds}` };
  }

  // In the case where there are nine valid characters in a row we want to insert
  // a delimeter between the eighth and ninth character
  if (value.match(/^((([0-1][0-9])|(2[0-3])){0,1}(:[0-5]{0,1}[0-9]{0,1}){2}[0-9])$/)) {
    const time = timeWithHoursAndMs(
      parseVal(value.substring(0, 2)),
      parseVal(value.substring(3, 5)),
      parseVal(value.substring(6, 8)),
      parseVal(value.substring(8, -1))
    );
    return { time, timeString: `${value.substring(0, 8)}.${time.milliseconds}` };
  }

  // If the value does not match the regex then we return undefined.
  if (!value.match(timeStringWithHoursAndMsRegex)) return undefined;

  if (value.includes(':')) {
    const values = value.split(':');

    if (values.length === 2) {
      // If the value after the : delimeter has a dot then we assume the first value is minutes
      // the second one seconds and the one after the dot milliseconds, i.e. {min}:{sec}.{ms}
      if (values[1].includes('.')) {
        const minutes = parseVal(values[0]);
        const [seconds, milliseconds] = splitAndParse(values[1], '.');
        return { time: timeWithHoursAndMs(0, minutes, seconds, milliseconds), timeString: value };
      }
      // Otherwise we assume the values are hours and minutes, i.e. {hrs}:{min}
      const [hours, minutes] = parseVals(values);
      return { time: timeWithHoursAndMs(hours, minutes, 0, 0), timeString: value };
    }
    // By here we can assume that we at least have 3 values in the value string

    // If the last value has a dot, then we can assume the last value contains seconds and milliseconds
    // and the first two hours and minutes {hrs}:{min}:{sec}.{ms}
    if (values[2].includes('.')) {
      const [hours, minutes] = [parseVal(values[0]), parseVal(values[1])];
      const [seconds, milliseconds] = splitAndParse(values[2], '.');
      return { time: timeWithHoursAndMs(hours, minutes, seconds, milliseconds), timeString: value };
    }

    // By here the only remaining choise is {hrs}:{min}:{sec}
    const [hours, minutes, seconds] = parseVals(values);
    return { time: timeWithHoursAndMs(hours, minutes, seconds, 0), timeString: value };
  }
  // By here we know that there is no : delimeter

  // If the value includes a dot, we assume the value before the dot is seconds and
  // the value after is milliseconds, i.e. {sec}.{ms}
  if (value.includes('.')) {
    const [seconds, milliseconds] = splitAndParse(value, '.');
    return { time: timeWithHoursAndMs(0, 0, seconds, milliseconds), timeString: value };
  }
  // Otherwise we assume the value is for hours. {hrs}
  return { time: timeWithHoursAndMs(parseVal(value), 0, 0, 0), timeString: value };
};
