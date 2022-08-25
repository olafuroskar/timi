import { Time, TimeType } from '../types';

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
 * Function to split and a string into an array by a delimeter and parse the values into numbers
 * @param value
 * @param delim
 * @returns
 */
export const splitAndParse = (value: string, delim: string): number[] =>
  value.split(delim).map((val) => parseInt(val) || 0);

/**
 * Function to split and a string into an array by a regex delimeter and parse the values into numbers
 * @param value
 * @param delim
 * @returns
 */
export const splitAndParseRegexp = (value: string, delim?: RegExp): number[] =>
  delim ? value.split(delim).map((val) => parseInt(val) || 0) : [parseVal(value)];

/**
 * Function to split the values of the first to next last letter of the given string to an array,
 * with the last letter of the string along with it.
 * @param value
 * @param delim
 * @returns
 */
export const splitAndLast = (value: string, delim?: RegExp): number[] => {
  if (value.length <= 2) return [parseVal(value)];
  return [...splitAndParseRegexp(value.slice(0, -1), delim), parseVal(value.slice(-1))];
};

/**
 * Function that parses an array of strings into an array of numbers
 * @param values
 * @returns
 */
export const parseVals = (values: string[]): number[] => values.map((val) => parseInt(val) || 0);

/**
 * Function to parse a string to a number, but return zero in case of falsy value, e.g. NaN
 * @param value
 * @returns
 */
export const parseVal = (value: string): number => parseInt(value) || 0;
