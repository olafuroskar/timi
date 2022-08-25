import {
  GetTimeAndTimestring,
  GetTimeAndTimestringTemp,
  TimeAndTimestring,
  TimeType,
  TimeWithMs
} from '../types';
import {
  getStringFromTime,
  parseVal,
  splitAndLast,
  splitAndParse,
  splitAndParseRegexp
} from './helpers';

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
  if (!value.match(timeStringWithMsRegex)) return undefined;

  if (value.includes(':')) {
    // {min}:{sec}:{ms}
    if (value.includes('.')) {
      const [minutes, seconds, milliseconds] = splitAndParseRegexp(value, /[.:]/);
      return getTimeAndTimestring({ minutes, seconds, milliseconds });
    }
    // {min}:{sec}
    const [minutes, seconds] = splitAndParse(value, ':');
    return getTimeAndTimestring({ minutes, seconds });
  }

  // {sec}.{ms}
  if (value.includes('.')) {
    const [seconds, milliseconds] = splitAndParse(value, '.');
    return getTimeAndTimestring({ seconds, milliseconds });
  }
  // {min}
  return getTimeAndTimestring({ minutes: parseVal(value) });
};

export const getTimeAndTimestringTempWithMs: GetTimeAndTimestringTemp = (value) => {
  // {min}x
  if (value.match(/^[0-5][0-9][0-5]$/)) {
    const [minutes, seconds] = splitAndLast(value, /[.:]/);
    return {
      time: timeWithMs({ minutes, seconds }),
      timeString: `${minutes}:${seconds}`
    };
  }

  // {min}:{sec}x
  if (value.match(/^(([0-1]{0,1}[0-9])|(2[0-3])){0,1}:[0-5][0-9][0-5]$/)) {
    const [minutes, seconds, milliseconds] = splitAndLast(value, /[.:]/);
    return {
      time: timeWithMs({ minutes, seconds, milliseconds }),
      timeString: `${value.slice(0, -1)}.${milliseconds}`
    };
  }

  // {min}:{sec}.{ms}
  if (value.match(/^([0-5]{0,1}[0-9]{0,1}:[0-5]{0,1}[0-9]{0,1}\.[0-9]{0,3})$/)) {
    const [minutes, seconds, milliseconds] = splitAndParseRegexp(value, /[.:]/);
    return { time: timeWithMs({ minutes, seconds, milliseconds }), timeString: value };
  }

  // {min}:{sec}
  if (value.match(/^[0-5]{0,1}[0-9]{0,1}:[0-5]{0,1}[0-9]{0,1}$/)) {
    const [minutes, seconds] = splitAndParse(value, ':');
    return { time: timeWithMs({ minutes, seconds }), timeString: value };
  }

  // {sec}.{ms}
  if (value.match(/^([0-5]{0,1}[0-9]{0,1}\.[0-9]{0,3})$/)) {
    const [seconds, milliseconds] = splitAndParse(value, '.');
    return { time: timeWithMs({ seconds, milliseconds }), timeString: value };
  }

  // {min}
  if (value.match(/^[0-5]{0,1}[0-9]{0,1}$/)) {
    return { time: timeWithMs({ minutes: parseVal(value) }), timeString: value };
  }

  return undefined;
};
