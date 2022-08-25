import { TimeAndTimestring, TimeType } from '../types';
import { getTimeAndTimestringDefault, getTimeAndTimestringTempDefault } from './timeUtilsDefault';
import {
  getTimeAndTimestringTempWithHours,
  getTimeAndTimestringWithHours
} from './timeUtilsWithHours';
import {
  getTimeAndTimestringTempWithHoursAndMs,
  getTimeAndTimestringWithHoursAndMs
} from './timeUtilsWithHoursAndMs';
import { getTimeAndTimestringTempWithMs, getTimeAndTimestringWithMs } from './timeUtilsWithMs';

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
    case TimeType.WithHoursAndMs:
      return getTimeAndTimestringWithHoursAndMs(value);
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
    case TimeType.WithHoursAndMs:
      return getTimeAndTimestringTempWithHoursAndMs(value);
    default:
      return getTimeAndTimestringTempDefault(value);
  }
};
