import {
  GetTimeAndTimestring,
  GetTimeAndTimestringTemp,
  TimeAndTimestring,
  TimeType,
  TimeWithHoursAndMs
} from '../types';
import {
  getStringFromTime,
  parseVal,
  parseVals,
  splitAndLast,
  splitAndParse,
  splitAndParseRegexp
} from './helpers';

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
  if (!value.match(timeStringWithHoursAndMsRegex)) return undefined;

  if (value.includes(':')) {
    const values = value.split(':');

    if (values.length === 2) {
      // {min}:{sec}.{ms}
      if (values[1].includes('.')) {
        const [minutes, seconds, milliseconds] = splitAndParseRegexp(value, /[.:]/);
        return getTimeAndTimestring({ minutes, seconds, milliseconds });
      }
      // {hrs}:{min}
      const [hours, minutes] = parseVals(values);
      return getTimeAndTimestring({ hours, minutes });
    }

    // {hrs}:{min}:{sec}.{ms}
    if (values[2].includes('.')) {
      const [hours, minutes, seconds, milliseconds] = splitAndParseRegexp(value, /[.:]/);
      return getTimeAndTimestring({ hours, minutes, seconds, milliseconds });
    }

    // {hrs}:{min}:{sec}
    const [hours, minutes, seconds] = parseVals(values);
    return getTimeAndTimestring({ hours, minutes, seconds });
  }

  // {sec}.{ms}
  if (value.includes('.')) {
    const [seconds, milliseconds] = splitAndParse(value, '.');
    return getTimeAndTimestring({ seconds, milliseconds });
  }
  // {hrs}
  return getTimeAndTimestring({ hours: parseVal(value) });
};

export const getTimeAndTimestringTempWithHoursAndMs: GetTimeAndTimestringTemp = (value) => {
  // {hrs}x
  if (value.match(/^(([0-1][0-9])|(2[0-3]))[0-9]$/)) {
    const [hours, minutes] = splitAndLast(value);
    return {
      time: timeWithHoursAndMs({ hours, minutes }),
      timeString: `${value.slice(0, -1)}:${minutes}`
    };
  }

  // {hrs}:{min}x
  if (value.match(/^(([0-1][0-9])|(2[0-3])):[0-5][0-9][0-9]$/)) {
    const [hours, minutes, seconds] = splitAndLast(value, /[:]/);
    return {
      time: timeWithHoursAndMs({ hours, minutes, seconds }),
      timeString: `${value.slice(0, -1)}:${seconds}`
    };
  }

  // {hrs}:{min}:{sec}x
  if (value.match(/^((([0-1]{0,1}[0-9])|(2[0-3])){0,1}:[0-5]{0,1}[0-9]{0,1}:[0-5][0-9][0-5])$/)) {
    const [hours, minutes, seconds, milliseconds] = splitAndLast(value, /[:]/);
    return {
      time: timeWithHoursAndMs({ hours, minutes, seconds, milliseconds }),
      timeString: `${value.slice(0, -1)}.${milliseconds}`
    };
  }

  if (!value.match(timeStringWithHoursAndMsRegex)) return undefined;

  if (value.includes(':')) {
    const values = value.split(':');

    if (values.length === 2) {
      // {min}:{sec}.{ms}
      if (values[1].includes('.')) {
        const [minutes, seconds, milliseconds] = splitAndParseRegexp(value, /[.:]/);
        return { time: timeWithHoursAndMs({ minutes, seconds, milliseconds }), timeString: value };
      }
      // {hrs}:{min}
      const [hours, minutes] = parseVals(values);
      return { time: timeWithHoursAndMs({ hours, minutes }), timeString: value };
    }

    // {hrs}:{min}:{sec}.{ms}
    if (values[2].includes('.')) {
      const [hours, minutes, seconds, milliseconds] = splitAndParseRegexp(value, /[.:]/);
      return {
        time: timeWithHoursAndMs({ hours, minutes, seconds, milliseconds }),
        timeString: value
      };
    }

    // {hrs}:{min}:{sec}
    const [hours, minutes, seconds] = parseVals(values);
    return { time: timeWithHoursAndMs({ hours, minutes, seconds }), timeString: value };
  }

  // {sec}.{ms}
  if (value.includes('.')) {
    const [seconds, milliseconds] = splitAndParse(value, '.');
    return { time: timeWithHoursAndMs({ seconds, milliseconds }), timeString: value };
  }
  // {hrs}
  return { time: timeWithHoursAndMs({ hours: parseVal(value) }), timeString: value };
};
