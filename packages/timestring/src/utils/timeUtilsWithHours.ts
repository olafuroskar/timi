import {
  GetTimeAndTimestring,
  GetTimeAndTimestringTemp,
  Time,
  TimeType
} from '@/timi/timestring/types';
import { getStringFromTime, getZeroPaddedNum } from '@/timi/timestring/utils/timeUtils';

const timeStringWithHoursRegex = new RegExp(
  /^([0-9]{0,1}|([0-1][0-9])|(2[0-3]))(:([0-9]{0,1}|([0-5][0-9]))){0,2}$/
);

export const getTimeAndTimestringWithHours: GetTimeAndTimestring = (value) => {
  // If the value does not match the regex then we return undefined.
  if (!value.match(timeStringWithHoursRegex)) return undefined;

  if (value.includes(':')) {
    const values = value.split(':').map((val) => parseInt(val) || 0);

    if (values.length === 3) {
      const [hours, minutes, seconds] = values;
      const time: Time = { type: TimeType.WithHours, hours, minutes, seconds };
      return { time, timeString: getStringFromTime(time) };
    }

    if (values.length === 2) {
      const [hours, minutes] = values;
      const time: Time = { type: TimeType.WithHours, hours, minutes, seconds: 0 };
      return { time, timeString: getStringFromTime(time) };
    }
  }

  const time: Time = {
    type: TimeType.WithHours,
    hours: parseInt(value) || 0,
    minutes: 0,
    seconds: 0
  };
  return { time, timeString: getStringFromTime(time) };
};

export const getTimeAndTimestringTempWithHours: GetTimeAndTimestringTemp = (value) => {
  // In the case where there are three valid characters in a row we want to insert
  // a delimeter between the second and third character
  if (value.match(/^(([0-1][0-9])|(2[0-3]))[0-9]$/)) {
    const time: Time = {
      type: TimeType.WithHours,
      hours: parseInt(value.substring(0, 2)),
      minutes: parseInt(value.substring(2, 3)),
      seconds: 0
    };
    return { time, timeString: `${getZeroPaddedNum(time.hours)}:${time.minutes}` };
  }

  // In the case where there are six valid characters in a row we want to insert
  // a delimeter between the fifth and sixth character
  if (value.match(/^(([0-1][0-9])|(2[0-3])):[0-5][0-9][0-9]$/)) {
    const time: Time = {
      type: TimeType.WithHours,
      hours: parseInt(value.substring(0, 2)),
      minutes: parseInt(value.substring(3, 5)),
      seconds: parseInt(value.substring(5, 6))
    };
    return {
      time,
      timeString: `${getZeroPaddedNum(time.hours)}:${getZeroPaddedNum(time.minutes)}:${
        time.seconds
      }`
    };
  }

  // If the value contains the delimeter we parse the values into a time object
  if (value.match(/^([0-9]{0,1}|([0-1][0-9])|(2[0-3]))(:[0-5]{0,1}[0-9]{0,1}){1,2}$/)) {
    const values = value.split(':').map((val) => parseInt(val) || 0);

    if (values.length === 3) {
      const [hours, minutes, seconds] = values;
      const time: Time = { type: TimeType.WithHours, hours, minutes, seconds };
      return { time, timeString: value };
    }

    const [hours, minutes] = values;
    const time: Time = { type: TimeType.WithHours, hours, minutes, seconds: 0 };
    return { time, timeString: value };
  }

  // If we have a standalone value we parse it into the hours attribute
  if (value.match(/^([0-9]{0,1}|([0-1][0-9])|(2[0-3]))$/)) {
    const time: Time = {
      type: TimeType.WithHours,
      hours: parseInt(value),
      minutes: 0,
      seconds: 0
    };
    return { time, timeString: value };
  }

  return undefined;
};
