import { Time, TimeAndTimestring, TimeType } from '@/timi/timestring/types';
import {
  getTimeAndTimestringDefault,
  getTimeAndTimestringTempDefault
} from '@/timi/timestring/utils/timeUtilsDefault';
import {
  getTimeAndTimestringTempWithHours,
  getTimeAndTimestringWithHours
} from '@/timi/timestring/utils/timeUtilsWithHours';
import { getTimeAndTimestringTempWithMs, getTimeAndTimestringWithMs } from './timeUtilsWithMs';

/**
 * Pad the given number with zeros, with max length maxLength. If start is true then the zeros lead.
 * If it is false then the zeros come last.
 * @param num
 * @param start
 * @param maxLength
 * @returns
 */
export const getZeroPaddedNum = (
  num: number,
  start: boolean = true,
  maxLength: number = 2
): string =>
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

/**
 * Function to get the default initial TimeAndTimestring object if a given time type.
 * @param type
 * @returns
 */
export const getDefaultInitialState = (type: TimeType): TimeAndTimestring => {
  switch (type) {
    case TimeType.WithHours:
      return { time: { type, hours: 0, minutes: 0, seconds: 0 }, timeString: '00:00:00' };
    case TimeType.WithMs:
      return { time: { type, minutes: 0, seconds: 0, milliseconds: 0 }, timeString: '00:00.000' };
    case TimeType.WithHoursAndMs:
      return {
        time: { type, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 },
        timeString: '00:00:00.000'
      };
    default:
      return { time: { type: TimeType.Default, minutes: 0, seconds: 0 }, timeString: '00:00' };
  }
};

/**
 * Function to get a valid time and timestring of the given value and type, when
 * editing of a time has finished
 * @param type
 * @param value
 * @returns
 */
export const getTimeAndTimestring = (
  type: TimeType,
  value: string
): TimeAndTimestring | undefined => {
  switch (type) {
    case TimeType.WithHours:
      return getTimeAndTimestringWithHours(value);
    case TimeType.WithMs:
      return getTimeAndTimestringWithMs(value);
    default:
      return getTimeAndTimestringDefault(value);
  }
};

/**
 * Function to get the time and timestring of a given value and type, when the
 * input is still being edited.
 * @param type
 * @param value
 * @returns
 */
export const getTimeAndTimestringTemp = (
  type: TimeType,
  value: string
): TimeAndTimestring | undefined => {
  switch (type) {
    case TimeType.WithHours:
      return getTimeAndTimestringTempWithHours(value);
    case TimeType.WithMs:
      return getTimeAndTimestringTempWithMs(value);
    default:
      return getTimeAndTimestringTempDefault(value);
  }
};
