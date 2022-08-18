import { getTimeAndTimestringTemp } from '@/timi/timestring/utils/timeUtils';
import { TimeType } from '../types';

const validTimeStrings = ['0:00', '0:0', '59', '5', '04'];
const inValidTimeStrings = ['0000', '0-0', '597', '69', 'a', '00:00:'];

const validTimeWithHoursStrings = ['0:00', '0:0', '23', '2', '04', '::'];
const inValidTimeWithHoursStrings = [
  '0000',
  '0-0',
  '597',
  '69',
  'a',
  '00:00:00:',
  '55',
  '69:12:2',
  ':::'
];

describe('onChange default valid strings', () => {
  const testValidTempTimestring = (before: string, after: string) => {
    test(before + ' is a valid temporary string, should be ' + after, async () => {
      const result = getTimeAndTimestringTemp(TimeType.Default, before);
      expect(result?.timeString).toBe(after);
    });
  };

  validTimeStrings.forEach((timeString) => {
    testValidTempTimestring(timeString, timeString);
  });
  testValidTempTimestring('023', '02:3');
  testValidTempTimestring('123', '12:3');
  testValidTempTimestring('000', '00:0');
});

describe('onChange default invalid strings', () => {
  const testInValidTempTimestring = (before: string) => {
    test(before + ' is an invalid temporary string', async () => {
      const result = getTimeAndTimestringTemp(TimeType.Default, before);
      expect(result).toBeUndefined();
    });
  };

  inValidTimeStrings.forEach((timeString) => {
    testInValidTempTimestring(timeString);
  });
});

describe('onChange with hours valid strings', () => {
  const testValidTempTimestring = (before: string, after: string) => {
    test(before + ' is a valid temporary string, should be ' + after, async () => {
      const result = getTimeAndTimestringTemp(TimeType.WithHours, before);
      expect(result?.timeString).toBe(after);
    });
  };

  validTimeWithHoursStrings.forEach((timeString) => {
    testValidTempTimestring(timeString, timeString);
  });
  testValidTempTimestring('023', '02:3');
  testValidTempTimestring('123', '12:3');
  testValidTempTimestring('000', '00:0');
  testValidTempTimestring('12:023', '12:02:3');
  testValidTempTimestring('23:123', '23:12:3');
  testValidTempTimestring('02:000', '02:00:0');
});

describe('onChange with hours invalid strings', () => {
  const testInValidTempTimestring = (before: string) => {
    test(before + ' is an invalid temporary string', async () => {
      const result = getTimeAndTimestringTemp(TimeType.WithHours, before);
      expect(result).toBeUndefined();
    });
  };

  inValidTimeWithHoursStrings.forEach((timeString) => {
    testInValidTempTimestring(timeString);
  });
});

export {};
