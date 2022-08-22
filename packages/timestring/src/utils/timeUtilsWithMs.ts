import {
  GetTimeAndTimestring,
  GetTimeAndTimestringTemp,
  Time,
  TimeType
} from '@/timi/timestring/types';
import { getStringFromTime, getZeroPaddedNum } from '@/timi/timestring/utils/timeUtils';

const timeStringWithMsRegex = new RegExp(
  /^(([0-9]{0,1}|([0-5][0-9]))(:([0-9]{0,1}|([0-5][0-9]))){0,1}(\.[0-9]{0,3}){0,1})$/
);

export const getTimeAndTimestringWithMs: GetTimeAndTimestring = (value) => {
  // If the value does not match the regex then we return undefined.
  if (!value.match(timeStringWithMsRegex)) return undefined;

  if (value.includes(':')) {
    if (value.includes('.')) {
      const [minutesString, secondsAndMs] = value.split(':');
      const minutes = parseInt(minutesString) || 0;
      const [seconds, milliseconds] = secondsAndMs.split('.').map((val) => parseInt(val) || 0);
      const time: Time = { type: TimeType.WithMs, minutes, seconds, milliseconds };
      return { time, timeString: getStringFromTime(time) };
    }
    const [minutes, seconds] = value.split(':').map((val) => parseInt(val) || 0);
    const time: Time = { type: TimeType.WithMs, minutes, seconds, milliseconds: 0 };
    return { time, timeString: getStringFromTime(time) };
  }

  // By here we know that there is no : delimeter
  if (value.includes('.')) {
    const [seconds, milliseconds] = value.split('.').map((val) => parseInt(val) || 0);
    const time: Time = { type: TimeType.WithMs, minutes: 0, seconds, milliseconds };
    return { time, timeString: getStringFromTime(time) };
  }

  const time: Time = {
    type: TimeType.WithMs,
    minutes: parseInt(value) || 0,
    seconds: 0,
    milliseconds: 0
  };
  return { time, timeString: getStringFromTime(time) };
};

export const getTimeAndTimestringTempWithMs: GetTimeAndTimestringTemp = (value) => {
  // In the case where there are three valid characters in a row we want to insert
  // a delimeter between the second and third character
  if (value.match(/^[0-5][0-9][0-5]$/)) {
    const time: Time = {
      type: TimeType.WithMs,
      minutes: parseInt(value.substring(0, 2)),
      seconds: parseInt(value.substring(2, 3)),
      milliseconds: 0
    };
    return { time, timeString: `${getZeroPaddedNum(time.minutes)}:${time.seconds}` };
  }

  // In the case where there are six valid characters in a row we want to insert
  // a delimeter between the fifth and sixth character
  if (value.match(/^(([0-1][0-9])|(2[0-3])):[0-5][0-9][0-5]$/)) {
    const time: Time = {
      type: TimeType.WithMs,
      minutes: parseInt(value.substring(0, 2)) || 0,
      seconds: parseInt(value.substring(3, 5)) || 0,
      milliseconds: parseInt(value.substring(5, -1)) || 0
    };
    return { time, timeString: `${value.substring(0, 5)}.${time.milliseconds}` };
  }

  // If the value contains the : and . delimeters we parse the values into a time object
  if (value.match(/^([0-5]{0,1}[0-9]{0,1}:[0-5]{0,1}[0-9]{0,1}\.[0-9]{0,3})$/)) {
    const [minutesString, secondsAndMs] = value.split(':');
    const minutes = parseInt(minutesString) || 0;
    const [seconds, milliseconds] = secondsAndMs.split('.').map((val) => parseInt(val) || 0);
    const time: Time = { type: TimeType.WithMs, minutes, seconds, milliseconds };
    return { time, timeString: value };
  }

  // If the value contains the : delimeter we parse the values into a time object
  if (value.match(/^[0-5]{0,1}[0-9]{0,1}:[0-5]{0,1}[0-9]{0,1}$/)) {
    const [minutes, seconds] = value.split(':').map((val) => parseInt(val) || 0);
    const time: Time = { type: TimeType.WithMs, minutes, seconds, milliseconds: 0 };
    return { time, timeString: value };
  }

  // If the value contains the . delimeter we parse the values into a time object
  if (value.match(/^([0-5]{0,1}[0-9]{0,1}\.[0-9]{0,3})$/)) {
    const [seconds, milliseconds] = value.split('.').map((val) => parseInt(val) || 0);
    const time: Time = { type: TimeType.WithMs, minutes: 0, seconds, milliseconds };
    return { time, timeString: value };
  }

  // If we have a standalone value we parse it into the minutes attribute
  if (value.match(/^[0-5]{0,1}[0-9]{0,1}$/)) {
    const time: Time = {
      type: TimeType.WithMs,
      minutes: parseInt(value) || 0,
      seconds: 0,
      milliseconds: 0
    };
    return { time, timeString: value };
  }

  return undefined;
};
