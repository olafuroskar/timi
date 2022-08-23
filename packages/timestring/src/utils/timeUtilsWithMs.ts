import {
  GetTimeAndTimestring,
  GetTimeAndTimestringTemp,
  Time,
  TimeType,
  TimeWithMs
} from '@/timi/timestring/types';
import {
  getStringFromTime,
  getZeroPaddedNum,
  parseVal,
  splitAndParse,
  splitAndParseRegexp
} from '@/timi/timestring/utils/timeUtils';

const timeStringWithMsRegex = new RegExp(
  /^(([0-9]{0,1}|([0-5][0-9]))(:([0-9]{0,1}|([0-5][0-9]))){0,1}(\.[0-9]{0,3}){0,1})$/
);

export const getTimeAndTimestringWithMs: GetTimeAndTimestring = (value) => {
  // If the value does not match the regex then we return undefined.
  if (!value.match(timeStringWithMsRegex)) return undefined;

  if (value.includes(':')) {
    if (value.includes('.')) {
      const [minutes, seconds, milliseconds] = splitAndParseRegexp(value, /[.:]/);
      const time: TimeWithMs = { type: TimeType.WithMs, minutes, seconds, milliseconds };
      return { time, timeString: getStringFromTime(time) };
    }
    const [minutes, seconds] = splitAndParse(value, ':');
    const time: Time = { type: TimeType.WithMs, minutes, seconds, milliseconds: 0 };
    return { time, timeString: getStringFromTime(time) };
  }

  // By here we know that there is no : delimeter
  if (value.includes('.')) {
    const [seconds, milliseconds] = splitAndParse(value, '.');
    const time: Time = { type: TimeType.WithMs, minutes: 0, seconds, milliseconds };
    return { time, timeString: getStringFromTime(time) };
  }

  const time: Time = {
    type: TimeType.WithMs,
    minutes: parseVal(value),
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
  if (value.match(/^(([0-1]{0,1}[0-9])|(2[0-3])){0,1}:[0-5][0-9][0-5]$/)) {
    const values = value.split(':');
    const minutes = parseVal(values[0]);
    const seconds = parseVal(values[1].slice(0, -1));
    const milliseconds = parseVal(values[1].slice(2));

    const time: Time = { type: TimeType.WithMs, minutes, seconds, milliseconds };
    return { time, timeString: `${value.slice(0, -1)}.${time.milliseconds}` };
  }

  // If the value contains the : and . delimeters we parse the values into a time object
  if (value.match(/^([0-5]{0,1}[0-9]{0,1}:[0-5]{0,1}[0-9]{0,1}\.[0-9]{0,3})$/)) {
    const [minutesString, secondsAndMs] = value.split(':');
    const minutes = parseInt(minutesString) || 0;
    const [seconds, milliseconds] = splitAndParse(secondsAndMs, '.');
    const time: Time = { type: TimeType.WithMs, minutes, seconds, milliseconds };
    return { time, timeString: value };
  }

  // If the value contains the : delimeter we parse the values into a time object
  if (value.match(/^[0-5]{0,1}[0-9]{0,1}:[0-5]{0,1}[0-9]{0,1}$/)) {
    const [minutes, seconds] = splitAndParse(value, ':');
    const time: Time = { type: TimeType.WithMs, minutes, seconds, milliseconds: 0 };
    return { time, timeString: value };
  }

  // If the value contains the . delimeter we parse the values into a time object
  if (value.match(/^([0-5]{0,1}[0-9]{0,1}\.[0-9]{0,3})$/)) {
    const [seconds, milliseconds] = splitAndParse(value, '.');
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
