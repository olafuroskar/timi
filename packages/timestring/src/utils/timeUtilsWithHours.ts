import {
  GetTimeAndTimestring,
  GetTimeAndTimestringTemp,
  TimeAndTimestring,
  TimeType,
  TimeWithHours
} from '@/timi/timestring/types';
import { getStringFromTime, parseVal, splitAndParse } from '@/timi/timestring/utils/timeUtils';

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
  // If the value does not match the regex then we return undefined.
  if (!value.match(timeStringWithHoursRegex)) return undefined;

  if (value.includes(':')) {
    const values = splitAndParse(value, ':');

    if (values.length === 3) {
      return getTimeAndTimestring({ hours: values[0], minutes: values[1], seconds: values[2] });
    }

    if (values.length === 2) {
      return getTimeAndTimestring({ hours: values[0], minutes: values[1] });
    }
  }
  return getTimeAndTimestring({ hours: parseVal(value) });
};

export const getTimeAndTimestringTempWithHours: GetTimeAndTimestringTemp = (value) => {
  // In the case where there are three valid characters in a row we want to insert
  // a delimeter between the second and third character
  if (value.match(/^(([0-1][0-9])|(2[0-3]))[0-9]$/)) {
    const time = timeWithHours({
      hours: parseVal(value.substring(0, 2)),
      minutes: parseVal(value.substring(2))
    });
    return { time, timeString: `${value.slice(0, 2)}:${time.minutes}` };
  }

  if (value.match(/^(([0-1]{0,1}[0-9])|(2[0-3])){0,1}:[0-5][0-9][0-9]$/)) {
    const values = value.split(':');
    const time = timeWithHours({
      hours: parseVal(values[0]),
      minutes: parseVal(values[1].slice(0, 2)),
      seconds: parseVal(values[1].slice(2))
    });
    return {
      time,
      timeString: `${value.slice(0, -1)}:${time.seconds}`
    };
  }

  if (!value.match(timeStringWithHoursRegex)) return undefined;

  // If the value contains the delimeter we parse the values into a time object
  if (value.match(/^([0-9]{0,1}|([0-1][0-9])|(2[0-3]))(:[0-5]{0,1}[0-9]{0,1}){1,2}$/)) {
    const values = splitAndParse(value, ':');

    if (values.length === 3) {
      const [hours, minutes, seconds] = values;
      return { time: timeWithHours({ hours, minutes, seconds }), timeString: value };
    }

    const [hours, minutes] = values;
    return { time: timeWithHours({ hours, minutes }), timeString: value };
  }

  // If we have a standalone value we parse it into the hours attribute
  if (value.match(/^([0-9]{0,1}|([0-1][0-9])|(2[0-3]))$/)) {
    return { time: timeWithHours({ hours: parseVal(value) }), timeString: value };
  }

  return undefined;
};
