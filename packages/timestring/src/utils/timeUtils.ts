import { Time, TimeAndTimestring, TimeType } from '@/timi/timestring/types';

/**
 *  (
 *    [0-9]{0,1}                We can have no number or one in the range 0-9
 *    | (
 *        [0-5]{1}[0-9]{1}     or we can have a number in the range 00-59
 *      )
 *  )(
 *    :                         We have : as a delimiter
 *    (
 *      [0-9]{0,1}              Then we can have no number or one in the range 0-9
 *      | (
 *          [0-5]{1}[0-9]{1}    or we can have a number in the range 00-59
 *        )
 *    )
 *  ){0,1}                      everything after and including the delimeter can be omitted
 */
const timeStringRegex = new RegExp(
  /^([0-9]{0,1}|([0-5]{1}[0-9]{1}))(:([0-9]{0,1}|([0-5]{1}[0-9]{1}))){0,1}$/
);

const getZeroPaddedNum = (num: number, start: boolean = true, maxLength: number = 2): string =>
  start ? num.toString().padStart(maxLength, '0') : num.toString().padEnd(maxLength, '0');

/**
 * Function that returns a time string representation of a duration provided
 * with the time parameter
 * @param time
 * @returns
 */
export const getStringFromTime = (time: Time): string => {
  switch (time.type) {
    case TimeType.WithHours:
      return `${getZeroPaddedNum(time.hours)}:${getZeroPaddedNum(time.minutes)}:${getZeroPaddedNum(
        time.seconds
      )}`;
    case TimeType.WithMs:
      return `${getZeroPaddedNum(time.minutes)}:${getZeroPaddedNum(
        time.seconds
      )}.${getZeroPaddedNum(time.milliseconds, false, 3)}`;
    case TimeType.WithHoursAndMs:
      return `${getZeroPaddedNum(time.hours)}:${getZeroPaddedNum(time.minutes)}:${getZeroPaddedNum(
        time.seconds
      )}.${getZeroPaddedNum(time.milliseconds, false, 3)}`;
    default:
      return `${getZeroPaddedNum(time.minutes)}:${getZeroPaddedNum(time.seconds)}`;
  }
};

export const getTimeAndTimestring = (
  type: TimeType,
  value: string
): TimeAndTimestring | undefined => {
  switch (type) {
    case TimeType.Default:
      return getTimeAndTimestringDefault(value);
    default:
      return getTimeAndTimestringDefault(value);
  }
};

export const getTimeAndTimestringTemp = (
  type: TimeType,
  value: string
): TimeAndTimestring | undefined => {
  switch (type) {
    case TimeType.Default:
      return getTimeAndTimestringTempDefault(value);
    default:
      return getTimeAndTimestringTempDefault(value);
  }
};

const getTimeAndTimestringDefault = (value: string): TimeAndTimestring | undefined => {
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

const getTimeAndTimestringTempDefault = (value: string): TimeAndTimestring | undefined => {
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
