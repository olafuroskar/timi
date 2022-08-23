import {
  GetTimeAndTimestring,
  GetTimeAndTimestringTemp,
  TimeAndTimestring,
  TimeType,
  TimeWithMs
} from '@/timi/timestring/types';
import {
  getStringFromTime,
  parseVal,
  splitAndLast,
  splitAndParse,
  splitAndParseRegexp
} from '@/timi/timestring/utils/timeUtils';

const timeStringWithMsRegex = new RegExp(
  /^(([0-9]{0,1}|([0-5][0-9]))(:([0-9]{0,1}|([0-5][0-9]))){0,1}(\.[0-9]{0,3}){0,1})$/
);

type Props = Partial<Omit<TimeWithMs, 'type'>>;

const timeWithMs = ({ minutes = 0, seconds = 0, milliseconds = 0 }: Props): TimeWithMs => ({
  type: TimeType.WithMs,
  minutes,
  seconds,
  milliseconds
});

const getTimeAndTimestring = ({
  minutes = 0,
  seconds = 0,
  milliseconds = 0
}: Props): TimeAndTimestring | undefined => {
  const time = timeWithMs({ minutes, seconds, milliseconds });
  return { time, timeString: getStringFromTime(time) };
};

export const getTimeAndTimestringWithMs: GetTimeAndTimestring = (value) => {
  // If the value does not match the regex then we return undefined.
  if (!value.match(timeStringWithMsRegex)) return undefined;

  if (value.includes(':')) {
    if (value.includes('.')) {
      const [minutes, seconds, milliseconds] = splitAndParseRegexp(value, /[.:]/);
      return getTimeAndTimestring({ minutes, seconds, milliseconds });
    }
    const [minutes, seconds] = splitAndParse(value, ':');
    return getTimeAndTimestring({ minutes, seconds });
  }

  // By here we know that there is no : delimeter
  if (value.includes('.')) {
    const [seconds, milliseconds] = splitAndParse(value, '.');
    return getTimeAndTimestring({ seconds, milliseconds });
  }
  return getTimeAndTimestring({ minutes: parseVal(value) });
};

export const getTimeAndTimestringTempWithMs: GetTimeAndTimestringTemp = (value) => {
  // In the case where there are three valid characters in a row at the start we want to insert
  // a delimeter between the second and third character
  if (value.match(/^[0-5][0-9][0-5]$/)) {
    const [minutes, seconds] = splitAndLast(value, /[.:]/);
    return {
      time: timeWithMs({ minutes, seconds }),
      timeString: `${minutes}:${seconds}`
    };
  }

  // In the case where there are six valid characters in a row we want to insert
  // a delimeter between the fifth and sixth character
  if (value.match(/^(([0-1]{0,1}[0-9])|(2[0-3])){0,1}:[0-5][0-9][0-5]$/)) {
    const [minutes, seconds, milliseconds] = splitAndLast(value, /[.:]/);
    return {
      time: timeWithMs({ minutes, seconds, milliseconds }),
      timeString: `${value.slice(0, -1)}.${milliseconds}`
    };
  }

  // If the value contains the : and . delimeters we parse the values into a time object
  if (value.match(/^([0-5]{0,1}[0-9]{0,1}:[0-5]{0,1}[0-9]{0,1}\.[0-9]{0,3})$/)) {
    const [minutes, seconds, milliseconds] = splitAndParseRegexp(value, /[.:]/);
    return { time: timeWithMs({ minutes, seconds, milliseconds }), timeString: value };
  }

  // If the value contains the : delimeter we parse the values into a time object
  if (value.match(/^[0-5]{0,1}[0-9]{0,1}:[0-5]{0,1}[0-9]{0,1}$/)) {
    const [minutes, seconds] = splitAndParse(value, ':');
    return { time: timeWithMs({ minutes, seconds }), timeString: value };
  }

  // If the value contains the . delimeter we parse the values into a time object
  if (value.match(/^([0-5]{0,1}[0-9]{0,1}\.[0-9]{0,3})$/)) {
    const [seconds, milliseconds] = splitAndParse(value, '.');
    return { time: timeWithMs({ seconds, milliseconds }), timeString: value };
  }

  // If we have a standalone value we parse it into the minutes attribute
  if (value.match(/^[0-5]{0,1}[0-9]{0,1}$/)) {
    return { time: timeWithMs({ minutes: parseVal(value) }), timeString: value };
  }

  return undefined;
};
