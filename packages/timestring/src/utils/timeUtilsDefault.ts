import {
  GetTimeAndTimestring,
  GetTimeAndTimestringTemp,
  Time,
  TimeType
} from '@/timi/timestring/types';
import { getStringFromTime, getZeroPaddedNum } from '@/timi/timestring/utils/timeUtils';

/**
 *  (
 *    [0-9]{0,1}                We can have no number or one in the range 0-9
 *    | (
 *        [0-5]{1}[0-9]        or we can have a number in the range 00-59
 *      )
 *  )(
 *    :                         We have : as a delimiter
 *    (
 *      [0-9]{0,1}              Then we can have no number or one in the range 0-9
 *      | (
 *          [0-5][0-9]       or we can have a number in the range 00-59
 *        )
 *    )
 *  ){0,1}                      everything after and including the delimeter can be omitted
 */
const timeStringRegex = new RegExp(
  /^([0-9]{0,1}|([0-5][0-9]))(:([0-9]{0,1}|([0-5][0-9]{1}))){0,1}$/
);

export const getTimeAndTimestringDefault: GetTimeAndTimestring = (value) => {
  // If the value does not match the regex then we return undefined.
  if (!value.match(timeStringRegex)) return undefined;

  if (value.includes(':')) {
    const [minutes, seconds] = value.split(':').map((val) => parseInt(val) || 0);
    const time: Time = { type: TimeType.Default, minutes, seconds };
    return { time, timeString: getStringFromTime(time) };
  }

  const time: Time = { type: TimeType.Default, minutes: parseInt(value) || 0, seconds: 0 };
  return { time, timeString: getStringFromTime(time) };
};

export const getTimeAndTimestringTempDefault: GetTimeAndTimestringTemp = (value) => {
  // In the case where there are three valid characters in a row we want to insert
  // a delimeter between the second and third character
  if (value.match(/^[0-5]{1}[0-9]{1}[0-5]{1}$/)) {
    const time: Time = {
      type: TimeType.Default,
      minutes: parseInt(value.substring(0, 2)),
      seconds: parseInt(value.substring(2, 3))
    };
    return { time, timeString: `${getZeroPaddedNum(time.minutes)}:${time.seconds}` };
  }

  // If the value contains the delimeter we parse the values into a time object
  if (value.match(/^[0-5]{0,1}[0-9]{0,1}:[0-5]{0,1}[0-9]{0,1}$/)) {
    const [minutes, seconds] = value.split(':');
    const time: Time = {
      type: TimeType.Default,
      minutes: parseInt(minutes) || 0,
      seconds: parseInt(seconds) || 0
    };
    return { time, timeString: value };
  }

  // If we have a standalone value we parse it into the minutes attribute
  if (value.match(/^[0-5]{0,1}[0-9]{0,1}$/)) {
    const time: Time = {
      type: TimeType.Default,
      minutes: parseInt(value),
      seconds: 0
    };
    return { time, timeString: value };
  }

  return undefined;
};
