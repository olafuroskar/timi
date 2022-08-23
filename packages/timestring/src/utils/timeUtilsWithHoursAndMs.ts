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
  splitAndParse,
  splitAndParseRegexp
} from '@/timi/timestring/utils/timeUtils';

const timeStringWithHoursAndMsRegex = new RegExp(
  /^(([0-9]{0,1}|([0-1][0-9])|(2[0-3]))(:([0-9]{0,1}|([0-5][0-9]))){0,2}(\.[0-9]{0,3}){0,1})$/
);

type Props = Partial<Omit<TimeWithHoursAndMs, 'type'>>;

const timeWithHoursAndMs = ({
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0
}: Props): TimeWithHoursAndMs => ({
  type: TimeType.WithHoursAndMs,
  hours,
  minutes,
  seconds,
  milliseconds
});

const getTimeAndTimestring = ({
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0
}: Props): TimeAndTimestring | undefined => {
  const time = timeWithHoursAndMs({ hours, minutes, seconds, milliseconds });
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
        const [minutes, seconds, milliseconds] = splitAndParseRegexp(value, /[.:]/);
        return getTimeAndTimestring({ minutes, seconds, milliseconds });
      }
      // Otherwise we assume the values are hours and minutes, i.e. {hrs}:{min}
      const [hours, minutes] = parseVals(values);
      return getTimeAndTimestring({ hours, minutes });
    }
    // By here we can assume that we at least have 3 values in the value string

    // If the last value has a dot, then we can assume the last value contains seconds and milliseconds
    // and the first two hours and minutes {hrs}:{min}:{sec}.{ms}
    if (values[2].includes('.')) {
      const [hours, minutes, seconds, milliseconds] = splitAndParseRegexp(value, /[.:]/);
      return getTimeAndTimestring({ hours, minutes, seconds, milliseconds });
    }

    // By here the only remaining choise is {hrs}:{min}:{sec}
    const [hours, minutes, seconds] = parseVals(values);
    return getTimeAndTimestring({ hours, minutes, seconds });
  }
  // By here we know that there is no : delimeter

  // If the value includes a dot, we assume the value before the dot is seconds and
  // the value after is milliseconds, i.e. {sec}.{ms}
  if (value.includes('.')) {
    const [seconds, milliseconds] = splitAndParse(value, '.');
    return getTimeAndTimestring({ seconds, milliseconds });
  }
  // Otherwise we assume the value is for hours. {hrs}
  return getTimeAndTimestring({ hours: parseVal(value) });
};

export const getTimeAndTimestringTempWithHoursAndMs: GetTimeAndTimestringTemp = (value) => {
  // In the case where there are three valid characters in a row we want to insert
  // a delimeter between the second and third character
  if (value.match(/^(([0-1][0-9])|(2[0-3]))[0-9]$/)) {
    const time = timeWithHoursAndMs({
      hours: parseVal(value.substring(0, 2)),
      minutes: parseVal(value.substring(2, 3))
    });
    return { time, timeString: `${value.substring(0, 2)}:${time.minutes}` };
  }

  // In the case where there are six valid characters in a row we want to insert
  // a delimeter between the fifth and sixth character
  if (value.match(/^(([0-1][0-9])|(2[0-3])):[0-5][0-9][0-9]$/)) {
    const values = value.split(':');
    const time = timeWithHoursAndMs({
      hours: parseVal(values[0]),
      minutes: parseVal(values[1].slice(0, -1)),
      seconds: parseVal(values[1].slice(2))
    });
    return { time, timeString: `${value.slice(0, -1)}:${time.seconds}` };
  }

  // In the case where there are nine valid characters in a row we want to insert
  // a delimeter between the eighth and ninth character
  if (value.match(/^((([0-1]{0,1}[0-9])|(2[0-3])){0,1}:[0-5]{0,1}[0-9]{0,1}:[0-5][0-9][0-5])$/)) {
    const values = value.split(':');
    const time = timeWithHoursAndMs({
      hours: parseVal(values[0]),
      minutes: parseVal(values[1]),
      seconds: parseVal(values[2].slice(0, 2)),
      milliseconds: parseVal(values[2].slice(2))
    });
    return { time, timeString: `${value.slice(0, -1)}.${time.milliseconds}` };
  }

  // If the value does not match the regex then we return undefined.
  if (!value.match(timeStringWithHoursAndMsRegex)) return undefined;

  if (value.includes(':')) {
    const values = value.split(':');

    if (values.length === 2) {
      // If the value after the : delimeter has a dot then we assume the first value is minutes
      // the second one seconds and the one after the dot milliseconds, i.e. {min}:{sec}.{ms}
      if (values[1].includes('.')) {
        const [minutes, seconds, milliseconds] = splitAndParseRegexp(value, /[.:]/);
        return { time: timeWithHoursAndMs({ minutes, seconds, milliseconds }), timeString: value };
      }
      // Otherwise we assume the values are hours and minutes, i.e. {hrs}:{min}
      const [hours, minutes] = parseVals(values);
      return { time: timeWithHoursAndMs({ hours, minutes }), timeString: value };
    }
    // By here we can assume that we at least have 3 values in the value string

    // If the last value has a dot, then we can assume the last value contains seconds and milliseconds
    // and the first two hours and minutes {hrs}:{min}:{sec}.{ms}
    if (values[2].includes('.')) {
      const [hours, minutes, seconds, milliseconds] = splitAndParseRegexp(value, /[.:]/);
      return {
        time: timeWithHoursAndMs({ hours, minutes, seconds, milliseconds }),
        timeString: value
      };
    }

    // By here the only remaining choise is {hrs}:{min}:{sec}
    const [hours, minutes, seconds] = parseVals(values);
    return { time: timeWithHoursAndMs({ hours, minutes, seconds }), timeString: value };
  }
  // By here we know that there is no : delimeter

  // If the value includes a dot, we assume the value before the dot is seconds and
  // the value after is milliseconds, i.e. {sec}.{ms}
  if (value.includes('.')) {
    const [seconds, milliseconds] = splitAndParse(value, '.');
    return { time: timeWithHoursAndMs({ seconds, milliseconds }), timeString: value };
  }
  // Otherwise we assume the value is for hours. {hrs}
  return { time: timeWithHoursAndMs({ hours: parseVal(value) }), timeString: value };
};
