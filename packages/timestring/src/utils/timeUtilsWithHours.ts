import {
  GetTimeAndTimestring,
  GetTimeAndTimestringTemp,
  TimeAndTimestring,
  TimeType,
  TimeWithHours
} from '../types';
import { getStringFromTime, parseVal, splitAndLast, splitAndParse } from './helpers';

const timeStringWithHoursRegex = new RegExp(
  /^([0-9]{0,1}|([0-1][0-9])|(2[0-3]))(:([0-9]{0,1}|([0-5][0-9]))){0,2}$/
);

type Props = Partial<Omit<TimeWithHours, 'type'>>;

const timeWithHours = ({ hours = 0, minutes = 0, seconds = 0 }: Props): TimeWithHours => ({
  type: TimeType.WithHours,
  hours,
  minutes,
  seconds
});

const getTimeAndTimestring = ({
  hours = 0,
  minutes = 0,
  seconds = 0
}: Props): TimeAndTimestring | undefined => {
  const time = timeWithHours({ hours, minutes, seconds });
  return { time, timeString: getStringFromTime(time) };
};

export const getTimeAndTimestringWithHours: GetTimeAndTimestring = (value) => {
  if (!value.match(timeStringWithHoursRegex)) return undefined;

  if (value.includes(':')) {
    const values = splitAndParse(value, ':');

    // {hrs}:{min}:{sec}
    if (values.length === 3) {
      return getTimeAndTimestring({ hours: values[0], minutes: values[1], seconds: values[2] });
    }

    // {hrs}:{min}
    if (values.length === 2) {
      return getTimeAndTimestring({ hours: values[0], minutes: values[1] });
    }
  }
  // {hrs}
  return getTimeAndTimestring({ hours: parseVal(value) });
};

export const getTimeAndTimestringTempWithHours: GetTimeAndTimestringTemp = (value) => {
  // {hrs}x
  if (value.match(/^(([0-1][0-9])|(2[0-3]))[0-9]$/)) {
    const [hours, minutes] = splitAndLast(value, /[:]/);
    return {
      time: timeWithHours({ hours, minutes }),
      timeString: `${value.slice(0, -1)}:${minutes}`
    };
  }

  // {hrs}:{min}x
  if (value.match(/^(([0-1]{0,1}[0-9])|(2[0-3])){0,1}:[0-5][0-9][0-9]$/)) {
    const [hours, minutes, seconds] = splitAndLast(value, /[:]/);
    return {
      time: timeWithHours({ hours, minutes, seconds }),
      timeString: `${value.slice(0, -1)}:${seconds}`
    };
  }

  if (!value.match(timeStringWithHoursRegex)) return undefined;

  if (value.match(/^([0-9]{0,1}|([0-1][0-9])|(2[0-3]))(:[0-5]{0,1}[0-9]{0,1}){1,2}$/)) {
    const values = splitAndParse(value, ':');

    // {hrs}:{min}:{sec}
    if (values.length === 3) {
      const [hours, minutes, seconds] = values;
      return { time: timeWithHours({ hours, minutes, seconds }), timeString: value };
    }

    // {hrs}:{min}
    const [hours, minutes] = values;
    return { time: timeWithHours({ hours, minutes }), timeString: value };
  }

  // {hrs}
  if (value.match(/^([0-9]{0,1}|([0-1][0-9])|(2[0-3]))$/)) {
    return { time: timeWithHours({ hours: parseVal(value) }), timeString: value };
  }

  return undefined;
};
