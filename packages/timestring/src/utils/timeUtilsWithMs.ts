import { GetTimeAndTimestring, GetTimeAndTimestringTemp } from '../types';

const timeStringWithMsRegex = new RegExp(
  /^(([0-9]{0,1}|([0-5][0-9]))(:([0-9]{0,1}|([0-5][0-9]))){0,1}(\.[0-9]{0,3}){0,1})$/
);

export const getTimeAndTimestringWithMs: GetTimeAndTimestring = (value) => {
  // If the value does not match the regex then we return undefined.
  if (!value.match(timeStringWithMsRegex)) return undefined;
};

export const getTimeAndTimestringTempWithMs: GetTimeAndTimestringTemp = (value) =>
  // TODO: Implement
  undefined;
